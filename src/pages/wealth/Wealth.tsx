import './Wealth.css';
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPlus, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { filterCodesApiluna, MarketInfoMinimal, AssetInfo, CurrencyItem, 
    currencyCodeStructure, currencyFilterCodesApiluna, codeMap, currencyCodeMap } from '../market/MarketStructure.ts';
import { GetMiniMarketInfo, GetCurrencyInfo } from '../../utility/JsonParser.tsx';
import { formatNumber } from '../../utility/FormatModifier.tsx';
import AssetReport from '../asset-report/AssetReport';


export const Wealth = () => {
    const [marketInfo, setMarketInfo] = useState<MarketInfoMinimal[]>([]); // why is this an array do I need it?
    const [wealthInfo, setWealthInfo] = useState<AssetInfo[]>([]);
    const [currencyType, setCurrencyType] = useState('TRY');
    const [currencyData, setCurrencyData] = useState<CurrencyItem[]>(currencyCodeStructure);
    const [quantity, setQuantity] = useState(1);
    const [availableAsset, setAvailableAsset] = useState<string[]>([]);

    const calculateItemTotal = (item: AssetInfo) => {
        const asset = marketInfo.find(marketAsset => (marketAsset.code === Object.keys(codeMap).find(k => codeMap[k] === item.code)))
        return (asset?.alis ?? 0) * item.quantity;
    };

    const calculateItemValue = (item: AssetInfo) => {
        const asset = marketInfo.find(marketAsset => (marketAsset.code === Object.keys(codeMap).find(k => codeMap[k] === item.code)));
        return (asset?.alis ?? 0);
    }

    const updateAssetElement = (
        index: number,
        attribute: keyof AssetInfo,
        value: number | string
    ) => {
        setWealthInfo(prev =>
            prev.map((item, i) => {
            if (i !== index) return item;
            const updatedItem = {
                ...item,
                [attribute]: value,
            };
            
            if (attribute === 'code') {
                updatedItem.value = calculateItemValue(updatedItem);
            }

            const shouldRecalculateTotal = (['quantity', 'value', 'code']).includes(attribute);
            return shouldRecalculateTotal
                ? {
                    ...updatedItem,
                    total: calculateItemTotal(updatedItem),
                }
                : updatedItem;
            })
        );
    };

    return (
        <div id="wealth-body">
            <GetMiniMarketInfo marketInfoMinimal={marketInfo} setMarketInfo={setMarketInfo} filterCodes={filterCodesApiluna} />
            <GetCurrencyInfo currencyInfo={currencyData} setCurrencyInfo={setCurrencyData} filterCurrencyCodes={currencyFilterCodesApiluna}/>
            {/* <ParseObjectMarketInfo marketInfo={marketArrayInfo} setMarketInfo={setMarketArrayInfo} filterCodes={filterCodesApiluna}/> */}
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
                                        updateAssetElement(index, 'code', code);
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
                                        updateAssetElement(index, 'quantity', newValue);
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

function AddAssetRow(wealthInfo: AssetInfo[], setWealthInfo: React.Dispatch<React.SetStateAction<AssetInfo[]>>) {
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

const deleteAssetRow = ({
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

const Dropdown:React.FC<DropdownProps> = ({ onSelect, selectedOption, filterCodes, isUpward, setAvailableAsset, availableAssets }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);


    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (key: string, value: string) => {
        setAvailableAsset(prevAssets => [...prevAssets, key]);
        onSelect(value);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="dropdown-button">
                <span className="dropdown-text">{selectedOption}</span>
                <span className={`dropdown-icon ${isUpward ? 'caret-upward' : ''}`}>
                    <FontAwesomeIcon icon={faCaretDown} />
                </span>
            </button>
            {isOpen && (
                <div className={`dropdown-menu ${isUpward ? 'dropdown-upward' : 'dropdown-downward'}`}>
                    {Object.entries(filterCodes)
                        .filter(([key]) => !availableAssets?.includes(key))
                        .map(([key, value]) => (
                            <div key={key}>
                                <a className="dropdown-item" onClick={() => handleSelect(key, value)}>{value}</a>
                            </div>              
                    ))}
                </div>
            )}
        </div>
    );
};

interface DropdownProps {
    onSelect: (selectedValue: string) => void;
    selectedOption?: string;
    filterCodes: { [key: string]: string };
    isUpward?: boolean;
    setAvailableAsset: React.Dispatch<React.SetStateAction<string[]>>
    availableAssets?: string[];
}



const EditableNumber = ({ value, onChange}: {value: string | number; onChange: (newValue: string) => void}) => {
    const [number, setNumber] = useState(value);
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setNumber(value);
    }, [value]); 

    const handleFocus = () => {
      setIsEditing(true);
      setTimeout(() => inputRef.current?.select(), 0);
    };
  
    const handleBlur = () => setIsEditing(false);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setNumber(newValue);
        onChange(newValue);
    };

    return (
      <div className="editable-container">
        <input
          ref={inputRef}
          type="number"
          value={number}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`editable-input ${isEditing ? "active" : ""}`}
          inputMode="numeric"
        />
      </div>
    );
};