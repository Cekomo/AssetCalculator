import './Wealth.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';

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
                    <a className="field text-center">Gram Altin</a>
                    <a className="field text-right">3.822,48</a>
                    <a className="field text-right">6</a>
                    <div className="field last-field">
                        <a className="text-right">1000</a>
                        <a className="text-right plus-icon"><FontAwesomeIcon icon={faTrashCan} /></a>
                    </div>
                </li>
                <li id="blank-asset-row">
                    <a className="blank-last-field"></a>
                    <a className="blank-last-field"></a>
                    <a className="blank-last-field"></a>
                    <div className="field blank-last-field">
                        <a className="text-right"></a>
                        <a className="text-right plus-icon"><FontAwesomeIcon icon={faPlus} /></a>
                    </div>
                </li>
            </div>
        </div>
    );
};

export default Wealth;