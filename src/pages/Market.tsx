import './Market.css';
import { useState } from "react";
import ParseMarketInfo from "../utility/JsonParser";
import { formatDate, formatNumber } from "../utility/FormatModifier";

export const Market = () => {

    const [marketInfo, setMarketInfo] = useState<MarketInfo[]>([]);
    // relocate arrays below into another file as web service json integration
    const filterCodes = ["USDTRY", "EURTRY", "CHFTRY", "EURUSD", "ALTIN",  "ONS", 
                         "KULCEALTIN", "CEYREK_YENI", "YARIM_YENI", "TEK_YENI", "ATA_YENI",   
                         "ATA5_YENI", "GREMESE_YENI",  "AYAR22", "AYAR14", "GUMUSTRY"];
    const adjustedCodeNames = ["USD / TRY", "EUR / TRY", "CHF / TRY", "EUR / USD", "ALTIN",  "ONS", 
                               "KÜLÇE ALTIN", "ÇEYREK YENİ", "YARIM YENİ", "TAM YENİ", "ATA YENİ",   
                               "ATA YENİ 5'Lİ", "GREMESE YENİ",  "22 AYAR", "14 AYAR", "GÜMÜŞ / TRY"];

    const codeMap: Record<string, string> = Object.fromEntries(
        filterCodes.map((code, index) => [code, adjustedCodeNames[index]])
    );    

    return (
        <div id="market-body">
            <ParseMarketInfo marketInfo={marketInfo} setMarketInfo={setMarketInfo} filterCodes={filterCodes}/>
            <div id="header">
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
                        <a className="field text-left">{formatDate(item.tarih)}</a>
                    </li>
                    
                ))}
            </div>
        </div>
    );
};

export default Market;

interface MarketInfo {
    code: string;
    alis: number;
    satis: number;
    dusuk: number;
    yuksek: number;
    kapanis: number;
    tarih: string;
}
