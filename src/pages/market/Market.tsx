import './Market.css';
import { useState } from "react";
import { ParseArrayMarketInfo } from "../../utility/JsonParser.tsx";
import { formatDate, formatNumber } from "../../utility/FormatModifier.tsx";
import { MarketInfoApiluna, filterCodesApiluna, adjustedCodesApiluna} from './MarketStructure.ts';


export const Market = () => {

    const [marketInfo, setMarketInfo] = useState<MarketInfoApiluna[]>([]);
    // const [marketInfo, setMarketInfo] = useState<MarketInfoTruncgil[]>([]);

    const codeMap: Record<string, string> = Object.fromEntries(
        filterCodesApiluna.map((code, index) => [code, adjustedCodesApiluna[index]])
    );    

    return (
        <div id="market-body">
            <ParseArrayMarketInfo marketInfo={marketInfo} setMarketInfo={setMarketInfo} filterCodes={filterCodesApiluna}/>
            {/* <ParseObjectMarketInfo marketInfo={marketInfo} setMarketInfo={setMarketInfo} filterCodes={filterCodes}/> */}
            <div id="market-header">
                <a className="title">Birim</a>
                <a className="title">Alış</a>
                <a className="title">Satış</a>
                <a className="title">Fark</a>
                <a className="title">Tarih</a>
            </div>
            <div id="records">
                {marketInfo.map((item) => (
                    <li key={item.code}>
                        <a className="field text-left">{codeMap[item.code] || item.code}</a>
                        <a className="field text-right">{formatNumber(item.alis, 2)}</a>
                        <a className="field text-right">{formatNumber(item.satis, 2)}</a>
                        <a className="field text-right">{formatNumber((item.satis - item.alis), 4)}</a>
                        <a className="field text-left">{item.tarih ?  formatDate(item.tarih) : ""}</a>
                        {/* <a className="field text-left">{item.tarih ? item.tarih : ""}</a> */}
                    </li>
                    
                ))}
            </div>
        </div>
    );
};

export default Market;