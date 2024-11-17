import React, { useEffect } from 'react';
import Bmenu from './Bmenu.jsx';
// import './styles/lib.css';

function Layout({ children }) {

    return (
        <div>
            {/* You can add a header or other common elements here */}
            {children}
            <Bmenu />
        </div>
    );
}

export default Layout;
