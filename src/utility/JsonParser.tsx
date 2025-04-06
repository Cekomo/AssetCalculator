import React, { useEffect } from "react";
import axios from "axios";
import { MarketInfoApiluna, MarketInfoTruncgil, MarketInfoMinimal, CurrencyItem } from '../pages/market/MarketStructure.ts';

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


export const GetMiniMarketInfo: React.FC<MarketPropsMinimal> = ({ marketInfoMinimal, setMarketInfo, filterCodes }) => {
    useEffect(() => {
        const fetchData = () => {
            if (document.visibilityState === "visible") {
                // console.log(`Fetching market info at ${new Date().toLocaleTimeString()}`);
                axios.get('http://localhost:5000/market')
                .then(response => {
                    const filteredData = response.data
                        .filter((item: MarketInfoMinimal) => filterCodes.includes(item.code))
                        .sort((a: MarketInfoMinimal, b: MarketInfoMinimal) => 
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

    if (!marketInfoMinimal || marketInfoMinimal.length === 0) {
        return <a></a>;
    }
}


export const GetCurrencyInfo: React.FC<CurrencyProps> = ({ currencyInfo, setCurrencyInfo, filterCurrencyCodes } ) => {
    useEffect(() => {
        const fetchData = () => {
            if (document.visibilityState === "visible") {
                axios.get('http://localhost:5000/market')
                    .then(response => {
                        const updatedCurrencyInfo = (currencyInfo).map(currency => {
                            const apiItem = response.data.find(
                                (item: CurrencyItem) => filterCurrencyCodes.includes(item.code) &&
                                item.code === currency.apiCode
                            );
                            return {
                                ...currency,
                                value: apiItem?.alis ?? currency.value
                            };
                        });
                        setCurrencyInfo(updatedCurrencyInfo);
                    })
                .catch(error => console.error("Currency fetch error:", error));
            }   
        };
        
        fetchData();
        const interval = setInterval(fetchData, 10000);
        
        return () => {
            clearInterval(interval);
        };
    }, []);

    if (!currencyInfo || currencyInfo.length === 0) {
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

interface MarketPropsMinimal {
    marketInfoMinimal: MarketInfoMinimal[];
    setMarketInfo: React.Dispatch<React.SetStateAction<MarketInfoMinimal[]>>;
    filterCodes: string[];
}

interface CurrencyProps {
    currencyInfo: CurrencyItem[];
    setCurrencyInfo: React.Dispatch<React.SetStateAction<CurrencyItem[]>>;
    filterCurrencyCodes: string[];
}