import React, { useContext, useState, useEffect } from 'react'
import freshlogo from '../../assets/images/freshcart-logo.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContextObj } from '../../context/AuthContext';
import { cartContext } from '../../context/CartContext';

export default function Navbar() {
  const { userToken, setuserToken } = useContext(AuthContextObj)
  const { numOfCartItems } = useContext(cartContext)
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function hundleLogout() {
    localStorage.removeItem('tkn')
    setuserToken(null)
    navigate('/Login')
  }

  const navLinkStyle = ({ isActive }) => ({
    position: 'relative',
    color: isActive ? '#fff' : 'rgba(255,255,255,0.75)',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: isActive ? '600' : '400',
    fontFamily: "'Outfit', sans-serif",
    letterSpacing: '0.03em',
    padding: '4px 0',
    transition: 'color 0.2s',
  })

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        .nav-link-wrap { position: relative; }
        .nav-link-wrap::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 2px;
          background: #fff;
          border-radius: 2px;
          transition: width 0.25s ease;
        }
        .nav-link-wrap:hover::after,
        .nav-link-wrap.active-link::after { width: 100%; }

        .social-btn {
          width: 32px; height: 32px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.7);
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
          background: transparent;
          text-decoration: none;
        }
        .social-btn:hover {
          background: rgba(255,255,255,0.15);
          color: #fff;
          border-color: rgba(255,255,255,0.4);
          transform: translateY(-1px);
        }

        .cart-btn {
          position: relative;
          display: flex; align-items: center; justify-content: center;
          width: 40px; height: 40px;
          border-radius: 10px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          text-decoration: none;
          transition: all 0.22s;
        }
        .cart-btn:hover {
          background: rgba(255,255,255,0.22);
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }

        .auth-btn {
          padding: 8px 18px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          letter-spacing: 0.03em;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
        }
        .auth-btn-outline {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.35);
          color: rgba(255,255,255,0.85);
        }
        .auth-btn-outline:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.6);
          color: #fff;
        }
        .auth-btn-solid {
          background: #fff;
          border: 1px solid #fff;
          color: #059669;
        }
        .auth-btn-solid:hover {
          background: #f0fdf4;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .logout-btn {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.25);
          color: rgba(255,255,255,0.85);
          padding: 8px 18px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
        }
        .logout-btn:hover {
          background: rgba(255,255,255,0.2);
          color: #fff;
        }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 6px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 8px;
        }
        .hamburger span {
          width: 20px; height: 2px;
          background: #fff;
          border-radius: 2px;
          transition: all 0.25s;
        }

        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .hamburger { display: flex; }
          .mobile-menu {
            position: absolute; top: 100%; left: 0; right: 0;
            background: #059669;
            padding: 16px 20px 20px;
            border-top: 1px solid rgba(255,255,255,0.15);
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          }
          .mobile-menu li { list-style: none; margin-bottom: 10px; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>

      <nav style={{
        position: 'sticky', top: 0, zIndex: 1000,
        background: scrolled
          ? 'linear-gradient(90deg, #065f46 0%, #059669 50%, #047857 100%)'
          : 'linear-gradient(90deg, #059669 0%, #10b981 50%, #059669 100%)',
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.18)' : '0 2px 8px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
        fontFamily: "'Outfit', sans-serif",
      }}>
        {/* Top accent line */}
        <div style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
        }} />

        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          padding: '0 24px',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
          position: 'relative',
        }}>

          {/* LEFT — Logo + Nav Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
            <Link to='/Home' style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <img
                src={freshlogo}
                alt="FreshCart"
                style={{
                  height: '34px',
                  filter: 'brightness(0) invert(1)',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              />
            </Link>

            {userToken && (
              <ul className="nav-links-desktop" style={{
                display: 'flex', alignItems: 'center', gap: '28px',
                listStyle: 'none', margin: 0, padding: 0,
              }}>
                {[
                  { to: '/Home', label: 'Home' },
                  { to: '/Products', label: 'Products' },
                  { to: '/Categories', label: 'Categories' },
                  { to: '/Brands', label: 'Brands' },
                ].map(({ to, label }) => (
                  <li key={to} className="nav-link-wrap">
                    <NavLink to={to} style={navLinkStyle}>{label}</NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* RIGHT — Socials + Cart + Auth */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

            {/* Social icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {[
                { icon: 'fa-facebook', label: 'Facebook' },
                { icon: 'fa-twitter', label: 'Twitter' },
                { icon: 'fa-instagram', label: 'Instagram' },
                { icon: 'fa-tiktok', label: 'TikTok' },
                { icon: 'fa-linkedin', label: 'LinkedIn' },
              ].map(({ icon, label }) => (
                <a key={icon} href="#" className="social-btn" aria-label={label}>
                  <i className={`fa-brands ${icon}`} />
                </a>
              ))}
            </div>

            {/* Divider */}
            <div style={{
              width: '1px', height: '28px',
              background: 'rgba(255,255,255,0.2)',
            }} />

            {/* Cart */}
            {userToken && (
              <Link to='/Cart' className="cart-btn" aria-label="Cart">
                <i className="fa-solid fa-cart-shopping" style={{ fontSize: '16px' }} />
                {numOfCartItems > 0 && (
                  <span style={{
                    position: 'absolute', top: '-6px', right: '-6px',
                    background: '#ef4444',
                    color: '#fff',
                    fontSize: '10px', fontWeight: '700',
                    width: '18px', height: '18px',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '2px solid #059669',
                    fontFamily: 'monospace',
                  }}>{numOfCartItems}</span>
                )}
              </Link>
            )}

            {/* Auth */}
            {userToken ? (
              <button className="logout-btn" onClick={hundleLogout}>
                Logout
              </button>
            ) : (
              <div style={{ display: 'flex', gap: '8px' }}>
                <NavLink to='/Register' className="auth-btn auth-btn-outline">
                  Register
                </NavLink>
                <NavLink to='/Login' className="auth-btn auth-btn-solid">
                  Login
                </NavLink>
              </div>
            )}

            {/* Hamburger (mobile) */}
            {userToken && (
              <button
                className="hamburger"
                onClick={() => setMenuOpen(o => !o)}
                aria-label="Toggle menu"
              >
                <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
                <span style={{ opacity: menuOpen ? 0 : 1 }} />
                <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && userToken && (
          <div className="mobile-menu">
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {[
                { to: '/Home', label: 'Home' },
                { to: '/Products', label: 'Products' },
                { to: '/Categories', label: 'Categories' },
                { to: '/Brands', label: 'Brands' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    style={({ isActive }) => ({
                      color: isActive ? '#fff' : 'rgba(255,255,255,0.75)',
                      textDecoration: 'none',
                      fontSize: '15px',
                      fontWeight: isActive ? '600' : '400',
                      display: 'block',
                      padding: '6px 0',
                    })}
                  >{label}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </>
  )
}
