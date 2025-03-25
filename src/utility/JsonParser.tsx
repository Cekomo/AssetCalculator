import React, { useEffect } from "react";
import axios from "axios";

const ParseMarketInfo: React.FC<ParseMarketInfoProps> = ({ marketInfo, setMarketInfo, filterCodes }) => {
    useEffect(() => {
        axios.get('http://localhost:5000/market')
            .then(response => {
                const filteredData = response.data.filter((item: MarketInfo) => 
                    filterCodes.includes(item.code));
                setMarketInfo(filteredData);
            })
            .catch(error => console.error("Error fetching market info:", error)); 
    }, [filterCodes, setMarketInfo]);

    if (!marketInfo || marketInfo.length === 0) {
        return <p>Loading...</p>;
    }
}

export default ParseMarketInfo;

interface ParseMarketInfoProps {
    marketInfo: MarketInfo[];
    setMarketInfo: React.Dispatch<React.SetStateAction<MarketInfo[]>>;
    filterCodes: string[];
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
