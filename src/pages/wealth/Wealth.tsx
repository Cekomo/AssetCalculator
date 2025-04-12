import './Wealth.css';
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import { filterCodesApiluna, MarketInfoMinimal, AssetInfo, CurrencyItem, 
    currencyCodeStructure, currencyFilterCodesApiluna, codeMap, currencyCodeMap } from '../market/MarketStructure.ts';
import { GetMiniMarketInfo, GetCurrencyInfo } from '../../utility/JsonParser.tsx';
import { formatNumber } from '../../utility/FormatModifier.ts';
import AssetReport from '../asset-report/AssetReport';
import Dropdown from '../../component/Dropdown.tsx';
import EditableNumber from '../../component/Field.tsx';
import { AddAssetRow, deleteAssetRow } from '../../row-operation/RowOperation.tsx';
import { updateAssetElement } from '../../utility/WealthUtils.ts';


export const Wealth = () => {
    const [marketInfo, setMarketInfo] = useState<MarketInfoMinimal[]>([]); // why is this an array do I need it?
    const [wealthInfo, setWealthInfo] = useState<AssetInfo[]>([]);
    const [currencyType, setCurrencyType] = useState('TRY');
    const [currencyData, setCurrencyData] = useState<CurrencyItem[]>(currencyCodeStructure);
    const [quantity] = useState(1);
    const [availableAsset, setAvailableAsset] = useState<string[]>([]);
    

    return (
        <div id="wealth-body">
            <GetMiniMarketInfo marketInfoMinimal={marketInfo} setMarketInfo={setMarketInfo} filterCodes={filterCodesApiluna} />
            <GetCurrencyInfo currencyInfo={currencyData} setCurrencyInfo={setCurrencyData} filterCurrencyCodes={currencyFilterCodesApiluna}/>

            <div id="wealth-header">
                <a className="title">Varlık</a>
                <a className="title">Değer</a>
                <a className="title">Miktar</a>
                <a className="title">Toplam</a>
            </div>
            <div id="asset-records">
                {wealthInfo.map((item, index) => (
                    <li key={item.index}>
                        <div id="asset-row">
                            <div className="field text-center">
                                <Dropdown 
                                    key={index} 
                                    selectedOption={item.code || 'Varlık Seç'}
                                    onSelect={(code) => {
                                        updateAssetElement(index, 'code', code, setWealthInfo, marketInfo, codeMap);
                                    }}
                                    filterCodes={codeMap}
                                    setAvailableAsset={setAvailableAsset}
                                    availableAssets={availableAsset}
                                />
                            </div>
                            <div className="field text-right">
                                { formatNumber(((marketInfo.find(market => 
                                    market.code === Object.keys(codeMap).find(k => codeMap[k] === item.code))?.alis ?? 0) 
                                    / GetCurrencyRatio(currencyType, currencyData)), 3) }
                             </div>
                            <a className="field text-center">
                                <EditableNumber 
                                    key={index}
                                    value={quantity} 
                                    onChange={(newValue) => {
                                        updateAssetElement(index, 'quantity', newValue, setWealthInfo, marketInfo, codeMap);
                                    }}
                                />
                            </a>
                            <div className="field last-field">
                                <a className="text-right">
                                { formatNumber(((wealthInfo.find(market => 
                                    market.code === item.code)?.total ?? 0) 
                                    / GetCurrencyRatio(currencyType, currencyData)), 3) }
                                </a>
                                <button className="text-right plus-icon"><FontAwesomeIcon icon={ faTrashCan } onClick={() => deleteAssetRow({index, setWealthInfo, setAvailableAsset})} /></button>
                            </div>
                        </div>
                    </li>
                ))}
                <li>
                    <div id="asset-row">
                        <div className="field text-center"></div>
                        <div className="field text-right"></div>
                        <div className="field text-right"></div>
                        <div className="field last-field">
                            <a className="text-right"> </a>
                            <button className="text-right plus-icon"><FontAwesomeIcon icon={ faPlus } onClick={() => AddAssetRow(wealthInfo, setWealthInfo)} /></button>
                        </div>
                    </div>
                </li>
            </div>
            
            <div id='bottom-container'>
                <div className="text-left">
                    <AssetReport
                        title="Asset Summary"
                        date={new Date().toLocaleDateString()}
                        assets={wealthInfo}
                        overallTotal={wealthInfo.reduce((sum, item) => sum + Number(item?.total || 0), 0) / GetCurrencyRatio(currencyType, currencyData)}
                        currencyType={currencyType}
                    />
                </div>
                <div></div>
                <div className="text-right" id='currency-dropdown'>
                    <Dropdown 
                        onSelect={(currency) => setCurrencyType(currency)}
                        selectedOption={currencyType}
                        filterCodes={currencyCodeMap}
                        isUpward={true}
                        setAvailableAsset={setAvailableAsset}
                    />  
                </div>
                <div className="text-right" id='total-field'>
                    <div className='field-input'>
                        { formatNumber(wealthInfo.reduce((sum, item) => sum + Number(item?.total || 0), 0) / GetCurrencyRatio(currencyType, currencyData), 3) }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wealth;

function GetCurrencyRatio(currencyType: string, currencyCodeStructure: CurrencyItem[]) {
    const currencyRatio = currencyCodeStructure.find(currencyItem => currencyItem.code === currencyType)?.value;
    return currencyRatio || NaN;
}