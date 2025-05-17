'use client';
import React, { useEffect, useState, useMemo } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowUp, ArrowDown } from 'lucide-react';

const HoldingsTable = ({
    holdings = [],
    selected = {},
    selectAll = false,
    onToggleSelectAll,
    onToggleRow,
}) => {
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [showAll, setShowAll] = useState(false);

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    const sortedHoldings = useMemo(() => {
        const sorted = [...holdings];
        if (sortKey === 'shortTerm') {
            sorted.sort((a, b) => {
                const aVal = a.stcg.gain;
                const bVal = b.stcg.gain;
                return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
            });
        }
        return sorted;
    }, [holdings, sortKey, sortOrder]);

    const visibleHoldings = showAll ? sortedHoldings : sortedHoldings.slice(0, 4);

    return (
        <Card className="p-4 w-[95%] bg-gray-800 mb-4 text-white">
            <h2 className="text-lg font-semibold mb-4">Holdings</h2>
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-900 text-white text-xl p-2">
                        <TableHead>
                            <Checkbox
                                checked={selectAll}
                                onCheckedChange={(checked) => onToggleSelectAll(checked === true)}
                            />
                        </TableHead>
                        <TableHead className="text-white">Asset</TableHead>
                        <TableHead className="text-white">Holdings</TableHead>
                        <TableHead className="text-white">Current Price</TableHead>
                        <TableHead
                            className="text-white cursor-pointer flex items-center gap-1"
                            onClick={() => handleSort('shortTerm')}
                        >
                            {sortKey === 'shortTerm' && sortOrder === 'asc' && (
                                <ArrowUp className="w-4 h-4" />
                            )}
                            {sortKey === 'shortTerm' && sortOrder === 'desc' && (
                                <ArrowDown className="w-4 h-4" />
                            )}
                            Short-term
                        </TableHead>
                        <TableHead className="text-white">Long-Term</TableHead>
                        <TableHead className="text-white">Amount to Sell</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {visibleHoldings.map((h, idx) => (
                        <TableRow key={idx} className={`hover:bg-gray-700`}>
                            <TableCell>
                                <Checkbox
                                    checked={!!selected[h.coin]}
                                    onCheckedChange={(checked) => onToggleRow(h.coin, checked === true)}
                                />
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <img src={h.logo} alt={h.coinName} className="w-6 h-6" />
                                    <div>
                                        <div className="font-semibold">{h.coinName}</div>
                                        <div className="text-xs text-muted-foreground">{h.coin}</div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{h.totalHoldings} {h.coin}</div>
                                <div className="text-xs text-muted-foreground">$ {h.averageBuyPrice.toLocaleString()}</div>
                            </TableCell>
                            <TableCell>
                                $ {h.currentPrice.toLocaleString()}
                            </TableCell>
                            <TableCell>
                                <span className={h.stcg.gain >= 0 ? 'text-green-500' : 'text-red-500'}>
                                    $ {h.stcg.gain.toLocaleString()}
                                </span>
                                <div className="text-xs text-muted-foreground">{h.stcg.balance} {h.coin}</div>
                            </TableCell>
                            <TableCell>
                                <span className={h.ltcg.gain >= 0 ? 'text-green-500' : 'text-red-500'}>
                                    $ {h.ltcg.gain.toLocaleString()}
                                </span>
                                <div className="text-xs text-muted-foreground">{h.ltcg.balance} {h.coin}</div>
                            </TableCell>
                            <TableCell>
                                {selected[h.coin] ? `${h.totalHoldings} ${h.coin}` : '-'}
                            </TableCell>
                        </TableRow>
                    ))}

                    {/* View More row */}
                    {holdings.length > 4 && (
                        <TableRow
                            className="cursor-pointer hover:bg-gray-700"
                            onClick={() => setShowAll(!showAll)}
                        >
                            <TableCell colSpan={7} className="text-start md:text-center text-blue-400 font-semibold">
                                {showAll ? 'View Less' : 'View More'}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Card>
    );
};

export default HoldingsTable;
