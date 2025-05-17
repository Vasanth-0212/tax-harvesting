"use client";
import { useState, useEffect, useMemo } from "react";
import CapitalGainsCard from "./components/CapitalGainsCard";
import HoldingsTable from "./components/HoldingsCard";
import DisclaimersAccordion from "./components/Disclaimer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export default function Home() {
  const [holdings, setHoldings] = useState([]);
  const [selected, setSelected] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [capitalGains, setCapitalGains] = useState(null);

  useEffect(() => {
    const fetchCapitalGains = async () => {
      const res = await fetch("/api/capital-gains");
      const data = await res.json();
      setCapitalGains(data);
    };

    fetchCapitalGains();
  }, []);

  useEffect(() => {
    const fetchHoldings = async () => {
      const res = await fetch("/api/holdings");
      const data = await res.json();
      setHoldings(data);
    };

    fetchHoldings();
  }, []);

  const handleToggleRow = (coin, isChecked) => {
    if (selectAll) {
      setSelectAll(false);
    }

    if (isChecked) {
      const newSelected = {};
      newSelected[coin] = true;
      setSelected(newSelected);
    } else {
      setSelected({});
    }
  };


  const handleToggleSelectAll = (checked) => {
    if (checked) {
      const allSelected = {};
      holdings.forEach((h) => {
        allSelected[h.coin] = true;
      });
      setSelected(allSelected);
      setSelectAll(true);
    } else {
      setSelected({});
      setSelectAll(false);
    }
  };

  const adjustedCapitalGains = useMemo(() => {
    if (!capitalGains) return null;
    let updated = JSON.parse(JSON.stringify(capitalGains));

    Object.keys(selected).forEach((coin) => {
      const holding = holdings.find((h) => h.coin === coin);

      if (holding?.stcg?.gain) {
        if (holding.stcg.gain > 0) {
          updated.stcg.profits += holding.stcg.gain;
        } else {
          updated.stcg.losses += Math.abs(holding.stcg.gain);
        }
      }

      if (holding?.ltcg?.gain) {
        if (holding.ltcg.gain > 0) {
          updated.ltcg.profits += holding.ltcg.gain;
        } else {
          updated.ltcg.losses += Math.abs(holding.ltcg.gain);
        }
      }
    });

    return updated;
  }, [capitalGains, holdings, selected]);


  const preHarvestGains = useMemo(() => {
    if (!capitalGains) return 0;
    const stcg = capitalGains.stcg.profits - capitalGains.stcg.losses;
    const ltcg = capitalGains.ltcg.profits - capitalGains.ltcg.losses;
    return stcg + ltcg;
  }, [capitalGains]);

  const postHarvestGains = useMemo(() => {
    if (!adjustedCapitalGains) return 0;
    const stcg = adjustedCapitalGains.stcg.profits - adjustedCapitalGains.stcg.losses;
    const ltcg = adjustedCapitalGains.ltcg.profits - adjustedCapitalGains.ltcg.losses;
    return stcg + ltcg;
  }, [adjustedCapitalGains]);

  const savingsAmount = preHarvestGains > postHarvestGains
    ? preHarvestGains - postHarvestGains
    : 0;


  if (!capitalGains) return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      <span className="ml-4 text-white text-lg">Loading...</span>
    </div>
  );

  return (
    <div className="bg-gray-900 h-screen w-full overflow-x-hidden overflow-y-auto">
      <div className="flex items-center justify-start space-x-2 h-auto w-full mt-4 px-4 md:px-16">
        <h1 className="text-3xl font-bold text-white">Tax Harvesting</h1>
        <div className="text-blue-500 underline"><TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="underline">How it works?</TooltipTrigger>
            <TooltipContent className="bg-white text-black p-4 pb-4 rounded-md h-24 w-64">
              <p className="pb-2">Lorem ipsum dolor sit amet consectetur. Euismod id posuere nibh semper mattis scelerisque tellus. Vel mattis diam duis morbi tellus dui consectetur. Know Morey</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        </div>
      </div>
      <div className="flex items-center justify-start md:justify-center w-[95%] mt-4 pl-4 md:pl-16">
        <DisclaimersAccordion />
      </div>
      <div className="w-screen flex flex-col pl-6 pr-3 pt-4 md:px-10 md:pt-4 md:flex-row md:gap-4">
        <CapitalGainsCard
          title="Pre-Harvesting"
          gainsData={capitalGains}
          background="bg-gray-800 text-white"
        />
        <CapitalGainsCard
          title="After Harvesting"
          gainsData={adjustedCapitalGains}
          background="bg-blue-700 text-white"
          highlightSavings={savingsAmount > 0}
          savingsAmount={savingsAmount}
        />
      </div>
      <div className="flex items-center justify-center w-full mt-4">
        <HoldingsTable
          holdings={holdings}
          selected={selected}
          selectAll={selectAll}
          onToggleSelectAll={handleToggleSelectAll}
          onToggleRow={handleToggleRow}
        />
      </div>
    </div>
  );
}
