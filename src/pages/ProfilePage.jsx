import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";
import "./ProfilePage.css";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const name = user?.name || "Shopivo Customer";
  const email = user?.email || "No email available";
  const initial = name.charAt(0).toUpperCase();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>My Profile</span>
        </div>

        <div className="profile-heading">
          <div>
            <span className="profile-eyebrow">YOUR ACCOUNT</span>
            <h1>My Profile</h1>
            <p>Manage your personal information and account.</p>
          </div>

          <Link to="/myorders" className="profile-orders-button">
            My Orders <span>↗</span>
          </Link>
        </div>

        <div className="profile-layout">
          <aside className="profile-sidebar">
            <div className="profile-cover">
              <span className="profile-cover-decoration">✦</span>
              <span className="profile-cover-decoration second">✧</span>
            </div>

            <div className="profile-avatar-wrapper">
              <div className="profile-avatar">{initial}</div>
              <span className="profile-status-dot" />
            </div>

            <div className="profile-user-summary">
              <h2>{name}</h2>
              <p>{email}</p>
              <span className="profile-member-badge">✦ Shopivo Member</span>
            </div>

            <div className="profile-sidebar-divider" />

            <nav className="profile-sidebar-nav">
              <Link to="/profile" className="profile-side-link active">
                <span>▦</span> Account Overview
              </Link>

              <Link to="/orders" className="profile-side-link">
                <span>▤</span> My Orders
                <span className="profile-side-arrow">↗</span>
              </Link>

              <Link to="/store" className="profile-side-link">
                <span>⌕</span> Continue Shopping
                <span className="profile-side-arrow">↗</span>
              </Link>
            </nav>

            <button
              type="button"
              className="profile-logout-button"
              onClick={handleLogout}
            >
              <span>↗</span> Sign Out
            </button>
          </aside>

          <section className="profile-details">
            <div className="profile-details-heading">
              <div>
                <h2>Personal Information</h2>
                <p>Your registered account details.</p>
              </div>
              <span className="profile-lock">♧ Private</span>
            </div>

            <div className="profile-info-grid">
              <div className="profile-info-card">
                <span className="profile-info-icon">♙</span>
                <span className="profile-info-label">FULL NAME</span>
                <strong>{name}</strong>
              </div>

              <div className="profile-info-card">
                <span className="profile-info-icon">✉</span>
                <span className="profile-info-label">EMAIL ADDRESS</span>
                <strong className="profile-email-value">{email}</strong>
              </div>

              <div className="profile-info-card profile-id-card">
                <span className="profile-info-icon">⌘</span>
                <span className="profile-info-label">ACCOUNT ID</span>
                <strong className="profile-id-value">
                  {user?.id || "Not available"}
                </strong>
              </div>

              <div className="profile-info-card">
                <span className="profile-info-icon">✓</span>
                <span className="profile-info-label">ACCOUNT STATUS</span>
                <strong className="profile-active-status">
                  <span /> Active
                </strong>
              </div>
            </div>

            <div className="profile-help-card">
              <div className="profile-help-icon">♡</div>
              <div className="profile-help-content">
                <h3>We&apos;re here to help</h3>
                <p>
                  Have questions about an order or your account? Visit the store
                  or check your recent orders.
                </p>
                <Link to="/orders">
                  View my orders <span>→</span>
                </Link>
              </div>
              <span className="profile-help-decoration">✦</span>
            </div>

            <p className="profile-security-note">
              <span>♧</span> Your account information is displayed securely
              within your Shopivo account.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
