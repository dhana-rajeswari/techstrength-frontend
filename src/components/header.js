import React from "react";

function Header() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand"><span>◈</span> TechStrength</div>
        <div className="navbar-right">
          <span className="navbar-bell">🔔</span>
          <div className="navbar-user">
            <div className="navbar-avatar">👤</div>
            <div className="navbar-user-info">
              <div className="label">Logged in as</div>
              <div className="name">Admin</div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;