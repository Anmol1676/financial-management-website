import React from "react";
import './nav.css';
import { Link } from 'react-router-dom';

function Nav({ isLoggedIn, username, onLogout }) {
    return (
        <nav className="navigation">
            {/* Top row for brand and auth links */}
            <div className="top-row">
                <span className="navigation-brand">WealthWise</span>
                <div className="auth-links">
                {isLoggedIn && <button className="navigation-item navigation-link auth special" onClick={onLogout}>Logout</button>}
                {!isLoggedIn && <Link to='/login' className="navigation-item navigation-link auth">Login</Link>}
                {!isLoggedIn && <Link to='/registration' className="navigation-item navigation-link auth special">Join us</Link>}
                {isLoggedIn && <span className="navigation-item navigation-link auth">Hello, {username}</span>}
                </div>
            </div>

            {/* Bottom row for navigation buttons */}
            <div className="navigation-options">
                <Link to='/' className="navigation-item navigation-link">Home</Link>
                <Link to='/mortgage' className="navigation-item navigation-link">Mortgage Payment</Link>
                <Link to='/car' className="navigation-item navigation-link">Car Payment</Link>
                <Link to='/debt' className="navigation-item navigation-link">Debt Repayment</Link>
                <Link to='/luxury' className="navigation-item navigation-link">Luxury Spending</Link>
                <Link to='/vacation' className="navigation-item navigation-link">Vacation Spending</Link>
                {isLoggedIn && <Link to='/tracker' className="navigation-item navigation-link">Spending Tracker</Link>}
            </div>
        </nav>
    );
}

export default Nav;
