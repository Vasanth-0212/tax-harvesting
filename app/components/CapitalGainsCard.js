import React from 'react';
import {
    Card,
    CardContent,
} from "@/components/ui/card";

const formatCurrency = (value) => `$ ${value.toLocaleString()}`;

const CapitalGainsCard = ({
    title = 'Capital Gains',
    gainsData,
    background = 'bg-gray-900 text-white',
    highlightSavings = false,
    savingsAmount = 0,
}) => {
    const stcgNet = gainsData.stcg.profits - gainsData.stcg.losses;
    const ltcgNet = gainsData.ltcg.profits - gainsData.ltcg.losses;
    const realisedGains = stcgNet + ltcgNet;

    return (
        <Card className={`w-[95%] mt-4 md:w-[50%] rounded-2xl shadow-xl lg:p-6 ${background}`}>
            <CardContent className="space-y-6">
                <h2 className="text-2xl font-semibold">{title}</h2>
                <div className="grid grid-cols-3 gap-4 text-xl">
                    <div></div>
                    <div className="font-semibold text-lg md:text-xl text-center">Short-Term</div>
                    <div className="font-semibold text-lg md:text-xl text-center">Long-Term</div>
                    <div className="font-medium text-lg md:text-xl">Profits</div>
                    <div className="text-center">{formatCurrency(gainsData.stcg.profits)}</div>
                    <div className="text-center">{formatCurrency(gainsData.ltcg.profits)}</div>
                    <div className="font-medium text-lg md:text-xl">Losses</div>
                    <div className="text-center">{formatCurrency(gainsData.stcg.losses)}</div>
                    <div className="text-center">{formatCurrency(gainsData.ltcg.losses)}</div>
                    <div className="font-medium text-lg md:text-xl">Net Capital Gains</div>
                    <div className="text-center">{formatCurrency(stcgNet)}</div>
                    <div className="text-center">{formatCurrency(ltcgNet)}</div>
                </div>
                <div className="text-xl md:text-2xl font-bold flex justify-normal space-x-4 pt-4 mt-4">
                    <span>{title === "Pre-Harvesting" ? "Realised" : "Effective"} Capital Gains :</span>
                    <span>{formatCurrency(realisedGains)}</span>
                </div>
                {title === "After Harvesting" && highlightSavings && savingsAmount > 0 && (
                    <div className="text-white mt-4 text-xl">
                        🎉 You're going to save {formatCurrency(savingsAmount)} 
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default CapitalGainsCard;
