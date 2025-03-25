import './Market.css';
import { useState } from "react";
import ParseMarketInfo from "../utility/JsonParser";
import { formatDate } from "../utility/FormatModifier";

export const Market = () => {

    const [marketInfo, setMarketInfo] = useState<MarketInfo[]>([]);
    const filterCodes = ["USDTRY", "EURTRY", "ALTIN", "ONS", "EURUSD", "AYAR22", "KULCEALTIN", "ATA_YENI", "CEYREK_YENI", "YARIM_YENI", "TEK_YENI", "ATA5_YENI", "GREMESE_YENI", "CHFTRY", "GUMUSTRY", "AYAR14"];

    return (
        <div id="market-body">
            <div id="header">
                <a className="title">Birim</a>
                <a className="title">Alış</a>
                <a className="title">Satış</a>
                <a className="title">Değişim</a>
                <a className="title">Tarih</a>
            </div>
            <div id="records">
                <ParseMarketInfo marketInfo={marketInfo} setMarketInfo={setMarketInfo} filterCodes={filterCodes}/>
                {marketInfo.map((item) => (
                    <li key={item.code}>
                        <a className='field'>{item.code}</a>
                        <a className='field'>{Math.trunc(item.alis*1000)/1000}</a>
                        <a className='field'>{Math.trunc(item.satis*1000)/1000}</a>
                        <a className='field'>{Math.trunc((item.yuksek-item.dusuk)*10000)/10000}</a>
                        <a className='field'>{formatDate(item.tarih)}</a>
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
