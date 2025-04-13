import { AssetInfo, MarketInfoMinimal, CurrencyItem } from "../pages/market/MarketStructure";



const calculateItemTotal = (
    item: AssetInfo, 
    marketInfo: MarketInfoMinimal[], 
    codeMap: Record<string, string>
) => {
    const asset = marketInfo.find(marketAsset => (marketAsset.code === Object.keys(codeMap).find(k => codeMap[k] === item.code)))
    return (asset?.alis ?? 0) * item.quantity;
};

const calculateItemValue = (
    item: AssetInfo, 
    marketInfo: MarketInfoMinimal[], 
    codeMap: Record<string, string>
) => {
    const asset = marketInfo.find(marketAsset => (marketAsset.code === Object.keys(codeMap).find(k => codeMap[k] === item.code)));
    return (asset?.alis ?? 0);
}

export const updateAssetElement = (
    index: number,
    attribute: keyof AssetInfo,
    value: number | string, 
    setWealthInfo: React.Dispatch<React.SetStateAction<AssetInfo[]>>,
    marketInfo: MarketInfoMinimal[], 
    codeMap: Record<string, string>
) => {
    setWealthInfo(prev =>
        prev.map((item, i) => {
        if (i !== index) return item;
        const updatedItem = {
            ...item,
            [attribute]: value,
        };
        
        if (attribute === 'code') {
            updatedItem.value = calculateItemValue(updatedItem, marketInfo, codeMap);
        }

        const shouldRecalculateTotal = (['quantity', 'value', 'code']).includes(attribute);
        return shouldRecalculateTotal
            ? {
                ...updatedItem,
                total: calculateItemTotal(updatedItem, marketInfo, codeMap),
            }
            : updatedItem;
        })
    );
};

export function GetCurrencyRatio(currencyType: string, currencyCodeStructure: CurrencyItem[]) {
    const currencyRatio = currencyCodeStructure.find(currencyItem => currencyItem.code === currencyType)?.value;
    return currencyRatio || NaN;
}