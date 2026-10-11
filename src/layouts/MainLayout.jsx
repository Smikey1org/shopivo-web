import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";
import "./MainLayout.css";

export default function MainLayout() {
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    closeMenu();
    logout();
  };

  return (
    <div className="shopivo-layout">
      <div className="layout-announcement">
        <span>✦</span> Discover something wonderful today.
        <Link to="/store">Shop now ↗</Link>
      </div>

      <header className="layout-header">
        <div className="layout-header-inner">
          <Link to="/" className="layout-brand" onClick={closeMenu}>
            shopivo<span>.</span>
          </Link>

          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="shopivo-navigation"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          <nav
            id="shopivo-navigation"
            className={`layout-nav ${menuOpen ? "is-open" : ""}`}
          >
            <NavLink
              to="/"
              end
              onClick={closeMenu}
              className={({ isActive }) =>
                `layout-nav-link ${isActive ? "active" : ""}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/store"
              onClick={closeMenu}
              className={({ isActive }) =>
                `layout-nav-link ${isActive ? "active" : ""}`
              }
            >
              Store
            </NavLink>

            {isAuthenticated ? (
              <>
                <NavLink
                  to="/myorders"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `layout-nav-link ${isActive ? "active" : ""}`
                  }
                >
                  My Orders
                </NavLink>

                <NavLink
                  to="/profile"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `layout-nav-link ${isActive ? "active" : ""}`
                  }
                >
                  Profile
                </NavLink>

                <div className="layout-mobile-account">
                  <span className="layout-avatar">
                    {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
                  </span>
                  <span className="layout-user-name">
                    {user?.name || user?.email || "My Account"}
                  </span>
                </div>
              </>
            ) : (
              <div className="layout-auth-links">
                <Link to="/login" className="layout-login" onClick={closeMenu}>
                  Log in
                </Link>

                <Link
                  to="/register"
                  className="layout-register"
                  onClick={closeMenu}
                >
                  Get Started <span>↗</span>
                </Link>
              </div>
            )}
          </nav>

          {isAuthenticated && (
            <div className="layout-desktop-account">
              <span className="layout-avatar">
                {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
              </span>
              <span className="layout-user-name">
                {user?.name || user?.email || "My Account"}
              </span>
              <button
                type="button"
                className="layout-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="layout-main">
        <Outlet />
      </main>

      <footer className="layout-footer">
        <div className="layout-footer-inner">
          <Link to="/" className="layout-brand">
            shopivo<span>.</span>
          </Link>
          <p>Good things for your everyday. Made with ♡</p>
          <Link to="/store">Explore the store ↗</Link>
        </div>
      </footer>
    </div>
  );
}
