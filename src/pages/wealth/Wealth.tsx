import './Wealth.css';
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPlus, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { adjustedCodesTruncgil} from '../Market/MarketStructure.ts';



export const Wealth = () => {
    return (
        <div id="wealth-body">
            <div id="wealth-header">
                <a className="title">Varlık</a>
                <a className="title">Değer (₺)</a>
                <a className="title">Miktar</a>
                <a className="title">Toplam</a>
            </div>
            <div id="asset-records">
                <li id="asset-row">
                    <div className="field text-center"><Dropdown /></div>
                    <a className="field text-right">3.822,48</a>
                    <a className="field text-right editable"></a>
                    <div className="field last-field">
                        <a className="text-right">1000</a>
                        <button className="text-right plus-icon"><FontAwesomeIcon icon={faTrashCan} /></button>
                    </div>
                </li>
                <li id="blank-asset-row">
                    <a className="blank-last-field"></a>
                    <a className="blank-last-field"></a>
                    <a className="blank-last-field"></a>
                    <div className="field blank-last-field">
                        <a className="text-right"></a>
                        <button className="text-right plus-icon"><FontAwesomeIcon icon={faPlus} /></button>
                    </div>
                </li>
            </div>
        </div>
    );
};

export default Wealth;



const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Varlık Seç");
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    // Handle option selection
    const handleSelect = (option: string) => {
        setSelectedOption(option); // Update button text
        setIsOpen(false); // Close dropdown
    };

    // Close dropdown if clicking outside
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
                    {adjustedCodesTruncgil.map((item) => (
                        <li key={item}>
                            <a className="dropdown-item" onClick={() => handleSelect(item)}>{item}</a>
                        </li>              
                    ))}
                </div>
            )}
        </div>
    );
};