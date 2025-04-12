import { AssetInfo } from "../pages/market/MarketStructure";

export function AddAssetRow(wealthInfo: AssetInfo[], setWealthInfo: React.Dispatch<React.SetStateAction<AssetInfo[]>>) {
    const indices = wealthInfo.map(asset => asset.index);
    const newAsset: AssetInfo = {
        index: wealthInfo.length > 0 ? Math.max(...indices) + 1 : 1,
        code: '',
        value: 0,
        quantity: 1,
        total: 0,
    };

    setWealthInfo(prevWealthInfo => [...prevWealthInfo, newAsset]);
}

export const deleteAssetRow = ({
    index,
    setWealthInfo,
    setAvailableAsset
}: DeletionRowProps) => {
    setWealthInfo(prev => prev.filter((_, i) => i !== index));
    setAvailableAsset(prevAssets => 
        prevAssets.filter((_, i) => i !== index));
};

interface DeletionRowProps {
    index: number;
    setWealthInfo: React.Dispatch<React.SetStateAction<AssetInfo[]>>;
    setAvailableAsset: React.Dispatch<React.SetStateAction<string[]>>;
}