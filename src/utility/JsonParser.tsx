import React, { useEffect } from "react";
import axios from "axios";

const ParseMarketInfo: React.FC<ParseMarketInfoProps> = ({ marketInfo, setMarketInfo, filterCodes }) => {
    useEffect(() => {
        const fetchData = () => {
            if (document.visibilityState === "visible") {
                // console.log(`Fetching market info at ${new Date().toLocaleTimeString()}`);
                axios.get('http://localhost:5000/market')
                .then(response => {
                    const filteredData = response.data
                        .filter((item: MarketInfo) => filterCodes.includes(item.code))
                        .sort((a: MarketInfo, b: MarketInfo) => 
                            filterCodes.indexOf(a.code) - filterCodes.indexOf(b.code)
                    );
                    setMarketInfo(filteredData);
                })
                .catch(error => console.error("Error fetching market info:", error)); 
            }
        };

        fetchData(); // Fetch immediately when mounted

        const interval = setInterval(fetchData, 10000);
        
        return () => {
            clearInterval(interval);
        };
    }, []);

    if (!marketInfo || marketInfo.length === 0) {
        return <a></a>;
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
