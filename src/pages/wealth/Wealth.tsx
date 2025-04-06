import './Wealth.css';
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPlus, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { filterCodesApiluna, MarketInfoMinimal, AssetInfo } from '../market/MarketStructure.ts';
import { GetMiniMarketInfo } from '../../utility/JsonParser.tsx';
import { formatNumber } from '../../utility/FormatModifier.tsx';
// import {  GetMiniMarketInfo } from "../../utility/JsonParser.tsx";
// import { formatNumber } from "../../utility/FormatModifier.tsx";


export const Wealth = () => {
    const [marketInfo, setMarketInfo] = useState<MarketInfoMinimal[]>([]); // why is this an array do I need it?
    const [wealthInfo, setWealthInfo] = useState<AssetInfo[]>([]);
    // const [marketArrayInfo, setMarketArrayInfo] = useState<MarketInfoApiluna[]>([]);
    // const [selectedCodes, setSelectedCodes] = useState<(string[])>([]);
    const [quantity, setQuantity] = useState("1");

    const handleDropdownSelect = (index: number, code: string) => {
        setWealthInfo(prevWealthInfo => {
            const updatedWealthInfo = [...prevWealthInfo];
            updatedWealthInfo[index].code = code;  // Update the 'code' field
            return updatedWealthInfo;
        });
    };

    const handleEditableField = (index: number, quantity: number) => {
        setWealthInfo(prevWealthInfo => {
            const updatedWealthInfo = [...prevWealthInfo];
            updatedWealthInfo[index].quantity = quantity;
            return updatedWealthInfo;
        });
    };

        attribute: keyof AssetInfo,
        value: number | string
    return (
        <div id="wealth-body">
            <GetMiniMarketInfo marketInfoMinimal={marketInfo} setMarketInfo={setMarketInfo} filterCodes={filterCodesApiluna} />
            {/* <ParseObjectMarketInfo marketInfo={marketArrayInfo} setMarketInfo={setMarketArrayInfo} filterCodes={filterCodesApiluna}/> */}
            <div id="wealth-header">
                <a className="title">Varlık</a>
                <a className="title">Değer (₺)</a>
                <a className="title">Miktar</a>
                <a className="title">Toplam</a>
            </div>
            <div id="asset-records">
                {wealthInfo.map((item, index) => (
                    <li key={item.index}>
                        <div id="asset-row">
                            {/* <div className="field text-center"><Dropdown onSelect={handleDropdownSelect}/></div> */}
                            <div className="field text-center">
                                <Dropdown 
                                    key={index} 
                                    selectedOption={item.code || 'Varlık Seç'}
                                    onSelect={(code) => handleDropdownSelect(index, code)}
                                />
                            </div>
                            <div className="field text-right">
                                { marketInfo.find(market => market.code === item.code)?.alis ?? null }
                                </div>
                            <a className="field text-center">
                                <EditableNumber 
                                    key={index}
                                    value={quantity} 
                                    onChange={(newValue) => handleEditableField(index, Number(newValue))}
                                />
                            </a>
                            <div className="field last-field">
                                <a className="text-right">
                                { formatNumber(((marketInfo.find(market => market.code === item.code)?.alis ?? 0) * item.quantity), 3) }
                                </a>
                                <button className="text-right plus-icon"><FontAwesomeIcon icon={ faTrashCan } onClick={() => DeleteAssetRow(item.index, setWealthInfo)} /></button>
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
                <div></div>
                <div></div>
                <div className="text-right"></div>
                <div className="text-right" id='total-field'>
                    { formatNumber(wealthInfo.reduce((sum, item) => sum + item.value, 0), 3) }
                </div>
            </div>
        </div>
    );
};

export default Wealth;

function AddAssetRow(wealthInfo: AssetInfo[], setWealthInfo: React.Dispatch<React.SetStateAction<AssetInfo[]>>) {
    const indices = wealthInfo.map(asset => asset.index);
    const newAsset: AssetInfo = {
        index: wealthInfo.length > 0 ? Math.max(...indices) + 1 : 1,
        code: '',
        value: 0,
        quantity: 0,
        total: 0,
    };

    setWealthInfo(prevWealthInfo => [...prevWealthInfo, newAsset]);
}


function DeleteAssetRow(index: number, setWealthInfo: React.Dispatch<React.SetStateAction<AssetInfo[]>>) {
    setWealthInfo(prevWealthInfo => 
        prevWealthInfo.filter(item => item.index !== index)
    );
}

const Dropdown:React.FC<DropdownProps> = ({ onSelect, selectedOption }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (option: string) => {
        onSelect(option);
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
                <span className='dropdown-icon'><FontAwesomeIcon icon={faCaretDown} /></span>
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    {filterCodesApiluna.map((item) => (
                        <div key={item}>
                            <a className="dropdown-item" onClick={() => handleSelect(item)}>{item}</a>
                        </div>              
                    ))}
                </div>
            )}
        </div>
    );
};

interface DropdownProps {
    onSelect: (selectedValue: string) => void;
    selectedOption: string;
}



const EditableNumber = ({ value, onChange}: {value: string; onChange: (newValue: string) => void}) => {
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