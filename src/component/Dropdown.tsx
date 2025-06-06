import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { AssetInfo } from '../pages/market/MarketStructure';
import './Dropdown.css'


interface DropdownProps {
    onSelect: (selectedValue: string) => void;
    selectedOption?: string;
    filterCodes: { [key: string]: string };
    isUpward?: boolean;
    setAvailableAsset: React.Dispatch<React.SetStateAction<string[]>>
    wealthInfo?: AssetInfo[];
}

const Dropdown:React.FC<DropdownProps> = ({ onSelect, selectedOption, filterCodes, isUpward, setAvailableAsset, wealthInfo }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);


    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (key: string, value: string) => {
        setAvailableAsset(prevAssets => [...prevAssets, key]);
        onSelect(value);
        setIsOpen(false);
        console.log(wealthInfo);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
                        .filter(([_, value]) => !wealthInfo?.some(asset => asset.code === value))
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
export default Dropdown;