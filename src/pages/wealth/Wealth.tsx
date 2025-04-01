import './Wealth.css';
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPlus, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { filterCodesApiluna, adjustedCodesApiluna, MarketInfoMinimal} from '../market/MarketStructure.ts';
import { GetMiniMarketInfo } from '../../utility/JsonParser.tsx';
// import {  GetMiniMarketInfo } from "../../utility/JsonParser.tsx";
import { formatNumber } from "../../utility/FormatModifier.tsx";


export const Wealth = () => {
    const [marketInfo, setMarketInfo] = useState<MarketInfoMinimal[]>([]);
    const [selectedCode, setSelectedCode] = useState<string | null>(null);
    const [quantity, setQuantity] = useState("1");

    const handleDropdownSelect = (code: string) => {
        setSelectedCode(code);
    };

    const selectedItem = marketInfo.find(item => item.code === selectedCode);

    return (
        <div id="wealth-body">
            <GetMiniMarketInfo marketInfoMinimal={marketInfo} setMarketInfo={setMarketInfo} filterCodes={filterCodesApiluna} selectedCode={selectedCode}/>
            <div id="wealth-header">
                <a className="title">Varlık</a>
                <a className="title">Değer (₺)</a>
                <a className="title">Miktar</a>
                <a className="title">Toplam</a>
            </div>
            <div id="asset-records">
                <div id="asset-row">
                    <div className="field text-center"><Dropdown onSelect={handleDropdownSelect}/></div>
                    <div className="field text-right">
                        { formatNumber(Number(selectedItem?.alis ?? 0), 3) }
                        </div>
                    <a className="field text-center"><EditableNumber value={quantity} onChange={setQuantity}/></a>
                    <div className="field last-field">
                        <a className="text-right"> { formatNumber(((selectedItem?.alis ?? 0) * Number(quantity ?? 0)), 3) } </a>
                        <button className="text-right plus-icon"><FontAwesomeIcon icon={ faTrashCan} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wealth;


const Dropdown:React.FC<DropdownProps> = ({ onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Varlık Seç");
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (option: string) => {
        setSelectedOption(option);
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
                        <li key={item}>
                            <a className="dropdown-item" onClick={() => handleSelect(item)}>{item}</a>
                        </li>              
                    ))}
                </div>
            )}
        </div>
    );
};

interface DropdownProps {
    onSelect: (selectedValue: string) => void;
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