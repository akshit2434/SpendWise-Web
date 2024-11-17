import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { Plus, Wallet, House, History } from 'lucide-react';
import $ from 'jquery';

const Bmenu = () => {
    const navigate = useNavigate();
    const location = useLocation();

    function handleButtonClick(url) {
        navigate(url);
    }
    return (
        <div className="b-menu poppins">
            {/* {location.pathname} */}
            {(location.pathname == '/history') ? (<div onClick={() => handleButtonClick('/')} className="home btn-1">
                <House />
            </div>) :
                (<div onClick={() => handleButtonClick('/history')} className="history btn-1">
                    <History />
                </div>)}
            <div className="add-trans">
                <Plus />
            </div>
            {(location.pathname == '/dues') ? (<div onClick={() => handleButtonClick('/')} className="home btn-1">
                <House />
            </div>) :
                (<div onClick={() => handleButtonClick('/dues')} className="dues btn-1">
                    <Wallet />
                </div>)}

        </div>

    );
};

export default Bmenu;
