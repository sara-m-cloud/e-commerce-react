import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTimeout(() => setMounted(true), 50)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes floatY {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50%       { transform: translateY(-18px) rotate(2deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.8); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes glitch {
          0%,100% { clip-path: inset(0 0 100% 0); }
          10%      { clip-path: inset(30% 0 50% 0); transform: translateX(-4px); }
          20%      { clip-path: inset(10% 0 70% 0); transform: translateX(4px); }
          30%      { clip-path: inset(60% 0 10% 0); transform: translateX(-2px); }
          40%      { clip-path: inset(0 0 100% 0); }
        }

        .nf-root {
          min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          background: #f9fafb;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
          position: relative;
          padding: 40px 24px;
        }

        /* Decorative blobs */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          pointer-events: none;
          z-index: 0;
        }

        .card {
          position: relative; z-index: 1;
          text-align: center;
          max-width: 520px; width: 100%;
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .card.visible {
          opacity: 1; transform: translateY(0);
        }

        .four-zero-four {
          font-family: 'Syne', sans-serif;
          font-size: clamp(96px, 18vw, 160px);
          font-weight: 800;
          line-height: 1;
          color: #111827;
          position: relative;
          display: inline-block;
          margin-bottom: 8px;
          letter-spacing: -4px;
        }
        .four-zero-four .zero {
          display: inline-block;
          color: transparent;
          -webkit-text-stroke: 3px #10b981;
          animation: floatY 3.5s ease-in-out infinite;
        }
        /* Glitch layer */
        .four-zero-four::after {
          content: '404';
          position: absolute; inset: 0;
          color: #10b981;
          opacity: 0.15;
          animation: glitch 5s infinite;
          pointer-events: none;
        }

        .spinner-ring {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          animation: spin-slow 12s linear infinite;
        }

        .pulse-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: #10b981;
          display: inline-block;
          position: relative;
          margin: 0 4px;
        }
        .pulse-dot::after {
          content: '';
          position: absolute; inset: 0;
          border-radius: 50%;
          background: #10b981;
          animation: pulse-ring 1.8s ease-out infinite;
        }

        .headline {
          font-family: 'Syne', sans-serif;
          font-size: clamp(22px, 4vw, 30px);
          font-weight: 700;
          color: #111827;
          margin: 20px 0 12px;
          animation: fadeUp 0.7s 0.15s both ease;
        }

        .subtext {
          font-size: 15px;
          color: #6b7280;
          line-height: 1.65;
          max-width: 360px;
          margin: 0 auto 32px;
          font-weight: 300;
          animation: fadeUp 0.7s 0.25s both ease;
        }

        .btn-group {
          display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;
          animation: fadeUp 0.7s 0.35s both ease;
        }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #10b981, #059669);
          color: #fff;
          padding: 12px 28px;
          border-radius: 10px;
          font-size: 14px; font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          transition: all 0.22s;
          box-shadow: 0 4px 16px rgba(16,185,129,0.3);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(16,185,129,0.4);
        }

        .btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff;
          color: #374151;
          padding: 12px 28px;
          border-radius: 10px;
          font-size: 14px; font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          border: 1px solid #e5e7eb;
          transition: all 0.22s;
        }
        .btn-secondary:hover {
          border-color: #10b981;
          color: #059669;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        }

        .crumbs {
          margin-top: 40px;
          font-size: 12px;
          color: #9ca3af;
          letter-spacing: 0.04em;
          animation: fadeUp 0.7s 0.45s both ease;
        }
        .crumbs span { color: #10b981; font-weight: 500; }
      `}</style>

      {/* Background blobs */}
      <div className="nf-root">
        <div className="blob" style={{
          width: 340, height: 340,
          background: 'rgba(16,185,129,0.12)',
          top: '-80px', right: '-80px',
        }} />
        <div className="blob" style={{
          width: 260, height: 260,
          background: 'rgba(52,211,153,0.08)',
          bottom: '-60px', left: '-60px',
        }} />
        <div className="blob" style={{
          width: 180, height: 180,
          background: 'rgba(16,185,129,0.06)',
          top: '40%', left: '10%',
        }} />

        <div className={`card ${mounted ? 'visible' : ''}`}>

          {/* SVG orbital ring around the 404 */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <svg
              className="spinner-ring"
              width="280" height="280"
              viewBox="0 0 280 280"
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
            >
              <circle
                cx="140" cy="140" r="128"
                fill="none"
                stroke="#10b981"
                strokeWidth="1.5"
                strokeDasharray="12 18"
                opacity="0.25"
              />
              <circle
                cx="140" cy="140" r="108"
                fill="none"
                stroke="#10b981"
                strokeWidth="1"
                strokeDasharray="6 24"
                opacity="0.12"
              />
              {/* Orbiting dot */}
              <circle cx="140" cy="12" r="5" fill="#10b981" opacity="0.6" />
            </svg>

            <div className="four-zero-four">
              4<span className="zero">0</span>4
            </div>
          </div>

          {/* Pulse indicator */}
          <div style={{ marginTop: '6px' }}>
            <span className="pulse-dot" />
          </div>

          <h1 className="headline">Page not found</h1>

          <p className="subtext">
            Looks like this page took a wrong turn. It might have been moved,
            deleted, or never existed in the first place.
          </p>

          <div className="btn-group">
            <Link to="/Home" className="btn-primary">
              <i className="fa-solid fa-house" style={{ fontSize: '13px' }} />
              Back to Home
            </Link>
            <button
              className="btn-secondary"
              onClick={() => window.history.back()}
            >
              <i className="fa-solid fa-arrow-left" style={{ fontSize: '12px' }} />
              Go Back
            </button>
          </div>

          <p className="crumbs">
            Error <span>404</span> &nbsp;·&nbsp; Page Not Found
          </p>
        </div>
      </div>
    </>
  )
}
