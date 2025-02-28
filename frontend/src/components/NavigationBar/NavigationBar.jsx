import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavigationBar.css';
import Logo from "../../assets/logo.png";

function NavigationBar() {
    return (
        <div className='nav-bar'>
            <div className='nav-title'>
                <div className='navBarLogo'>
                    <img src={Logo} alt='Norman Police Department Logo' />
                </div>
                <Link to="/">CommsCheck</Link>
            </div>
            <div className='nav-links'>
                <Link to="/">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/history">History</Link>
                <div className='sign-in-button'>
                    Sign In
                </div>
            </div>
        </div>
    );
}

export default NavigationBar;