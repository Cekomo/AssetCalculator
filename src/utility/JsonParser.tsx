import React, { useEffect } from "react";
import axios from "axios";

const ParseMarketInfo: React.FC<ParseMarketInfoProps> = ({ marketInfo, setMarketInfo }) => {
    useEffect(() => {
        axios.get('http://localhost:5000/market')
            .then(response => setMarketInfo(response.data))
            .catch(error => console.error("Error fetching market info:", error)); 
    }, [setMarketInfo]);

    if (!marketInfo || marketInfo.length === 0) {
        return <p>Loading...</p>;
    }

    return <pre>{JSON.stringify(marketInfo, null, 2)}</pre>;
}

export default ParseMarketInfo;

interface ParseMarketInfoProps {
    marketInfo: MarketInfo[];
    setMarketInfo: React.Dispatch<React.SetStateAction<MarketInfo[]>>;
}

interface MarketInfo {
    code: string;
    alis: number;
    satis: number;
    dusuk: number;
    yuksek: number;
    kapanis: number;
    tarih: string;
}
