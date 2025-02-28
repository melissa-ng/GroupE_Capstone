import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavigationBar.css";
import Logo from "../../assets/logo.png";

function NavigationBar() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Mock authentication (Replace with real authentication logic)
    const isAuthenticated = localStorage.getItem("userToken"); 

    const handleAuth = () => {
        if (isAuthenticated) {
            localStorage.removeItem("userToken"); // Log out user
            navigate("/signin");
        } else {
            navigate("/signin");
        }
    };

    return (
        <div className="nav-bar">
            {/* Logo and Title */}
            <div className="nav-title">
                <div className="navBarLogo">
                    <img src={Logo} alt="Norman Police Department Logo" />
                </div>
                <Link to="/">CommsCheck</Link>
            </div>

            {/* Navigation Links */}
            <div className="nav-links">
                <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
                <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>Dashboard</Link>
                <Link to="/history" className={location.pathname === "/history" ? "active" : ""}>History</Link>

                {/* Sign In / Sign Out Button */}
                <div className="sign-in-button" onClick={handleAuth}>
                    {isAuthenticated ? "Sign Out" : "Sign In"}
                </div>
            </div>
        </div>
    );
}

export default NavigationBar;
