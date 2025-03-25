import './Market.css';
import { useState } from "react";
import ParseMarketInfo from "../utility/JsonParser";

export const Market = () => {
    // const [marketInfo, setMarketInfo] = useState([
    //     {
    //         "code": "ALTIN",
    //         "alis": "3704.730",
    //         "satis": "3729.560",
    //         "dusuk": 3750.0399999999999636202119290828704833984375,
    //         "yuksek": 3766.90999999999985448084771633148193359375,
    //         "kapanis": 3738.34000000000014551915228366851806640625,
    //         "tarih": "25-03-2025 00:09:22"
    //     },
    //     {
    //         "code": "EURTRY",
    //         "alis": "40.8990",
    //         "satis": "41.2210",
    //         "dusuk": 41.3220000000000027284841053187847137451171875,
    //         "yuksek": 41.53099999999999880628820392303168773651123046875,
    //         "kapanis": 41.14999999999999857891452847979962825775146484375,
    //         "tarih": "25-03-2025 00:09:24"
    //     }
    // ]);

    const [marketInfo, setMarketInfo] = useState<MarketInfo[]>([]);
    // const [marketInfo, setMarketInfo] = useState<any[]>([]);

    return (
        <div id="market-body">
            {/* <ParseMarketInfo marketInfo={marketInfo} setMarketInfo={setMarketInfo} /> */}
            <div id="header">
                <a className="title">Birim</a>
                <a className="title">Alış</a>
                <a className="title">Satış</a>
                <a className="title">Değişim</a>
                <a className="title">Tarih</a>
            </div>
            <div id="records">
                {marketInfo.map((item) => (
                    <li key={item.code}>
                        <a className='field'>{item.code}</a>
                        <a className='field'>{item.alis}</a>
                        <a className='field'>{item.satis}</a>
                        <a className='field'>{item.yuksek - item.dusuk}</a>
                        <a className='field'>{item.tarih}</a>
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
