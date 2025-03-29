import React, { useEffect } from "react";
import axios from "axios";

export const ParseArrayMarketInfo: React.FC<MarketPropsApiluna> = ({ marketInfo, setMarketInfo, filterCodes }) => {
    useEffect(() => {
        const fetchData = () => {
            if (document.visibilityState === "visible") {
                // console.log(`Fetching market info at ${new Date().toLocaleTimeString()}`);
                axios.get('http://localhost:5000/market')
                .then(response => {
                    const filteredData = response.data
                        .filter((item: MarketInfoApiluna) => filterCodes.includes(item.code))
                        .sort((a: MarketInfoApiluna, b: MarketInfoApiluna) => 
                            filterCodes.indexOf(a.code) - filterCodes.indexOf(b.code)
                    );
                    setMarketInfo(filteredData);
                })
                .catch(error => console.error("Error fetching market info:", error)); 
            }
        };

        fetchData();

        const interval = setInterval(fetchData, 10000);
        
        return () => {
            clearInterval(interval);
        };
    }, []);

    if (!marketInfo || marketInfo.length === 0) {
        return <a></a>;
    }
}

export const ParseObjectMarketInfo: React.FC<MarketPropsTruncgil> = ({ marketInfo, setMarketInfo, filterCodes }) => {
    useEffect(() => {
        const fetchData = () => {
            if (document.visibilityState === "visible") {
                console.log(`Fetching market info at ${new Date().toLocaleTimeString()}`);
                axios.get('http://localhost:5000/market')
                .then(response => {
                    const metaData = response.data.Meta_Data ?? {};
                    const rawData = response.data.Rates;
                    const transformedData = Object.entries(rawData)
                        .filter(([code]) => filterCodes.includes(code))
                        .map(([code, details]: [string, any]) => ({
                            code: code,
                            alis: details.Buying,
                            satis: details.Selling,
                            tarih: metaData.Update_Date
                        }));
                        setMarketInfo(transformedData);
                })
                .catch(error => console.error("Error fetching market info:", error)); 
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 10000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    if (!marketInfo || marketInfo.length === 0) {
        return <a></a>;
    }
}


interface MarketPropsApiluna {
    marketInfo: MarketInfoApiluna[];
    setMarketInfo: React.Dispatch<React.SetStateAction<MarketInfoApiluna[]>>;
    filterCodes: string[];
}

interface MarketPropsTruncgil {
    marketInfo: MarketInfoTruncgil[];
    setMarketInfo: React.Dispatch<React.SetStateAction<MarketInfoTruncgil[]>>;
    filterCodes: string[];
}

interface MarketInfoApiluna {
    code: string;
    alis: number;
    satis: number;
    dusuk: number;
    yuksek: number;
    kapanis: number;
    tarih: string;
}

interface MarketInfoTruncgil {
    code: string;
    alis: number;
    satis: number;
    dusuk?: number | null;
    yuksek?: number | null;
    kapanis?: number | null;
    tarih?: string | null;
}

