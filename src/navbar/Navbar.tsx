import './Navbar.css';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins, faHouse, faMoneyBillTrendUp} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    return (
        <nav id='nav-container'>
            <div id="navbar">
                <div className='nav-elements'>
                    <li id='nav-icon'>
                        <img src="./cs.ico" alt="Icon" />
                    </li>
                    <li className='nav-line'></li>
                    <li className='nav-item'> 
                        <NavLink to="/">
                            <FontAwesomeIcon icon={faHouse} />
                        </NavLink> 
                    </li>
                    <li className='nav-item'> 
                        <NavLink to="/wealth">
                            <FontAwesomeIcon icon={faCoins} />
                        </NavLink> 
                    </li>
                    <li className='nav-item'> 
                        <NavLink to="/market">
                            <FontAwesomeIcon icon={faMoneyBillTrendUp} />
                        </NavLink>
                    </li>
                    {/* <li className='nav-item'> 
                        <NavLink to="/weather">
                            <FontAwesomeIcon icon={faCloudBolt} />
                        </NavLink> 
                    </li>
                    <li className='nav-item'> 
                        <NavLink to="/about">
                            <FontAwesomeIcon icon={faUserTie} />
                        </NavLink>
                    </li> */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
