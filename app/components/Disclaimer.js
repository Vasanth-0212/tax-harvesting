import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Info } from "lucide-react";

const DisclaimersAccordion = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="bg-[#0F172A] text-white px-4 py-2 rounded-md border border-gray-600">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-400" />
            Important Notes & Disclaimers
          </div>
        </AccordionTrigger>
        <AccordionContent className="bg-[#0F172A] text-gray-300 px-6 pb-4 pt-2 text-sm leading-relaxed border border-t-0 border-gray-600 rounded-b-md">
          <ul className="list-disc ml-5 space-y-2">
            <li>
              Tax-loss harvesting is currently not allowed under Indian tax
              regulations. Please consult your tax advisor before making any
              decisions.
            </li>
            <li>
              Tax harvesting does not apply to derivatives or futures. These are
              handled separately as business income under tax rules.
            </li>
            <li>
              Price and market value data is fetched from Coingecko, not from
              individual exchanges. As a result, values may slightly differ from
              the ones on your exchange.
            </li>
            <li>
              Some countries do not have a short-term / long-term bifurcation.
              For now, we are calculating everything as long-term.
            </li>
            <li className="text-red-400 font-medium">
              Only realized losses are considered for harvesting. Unrealized
              losses in held assets are not counted.
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DisclaimersAccordion;
