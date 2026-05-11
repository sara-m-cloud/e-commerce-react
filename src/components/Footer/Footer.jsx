import React from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const links = {
    Company: ['About Us', 'Careers', 'Blog', 'Press'],
    Services: ['Web Design', 'Development', 'SEO', 'Marketing'],
    Support: ['Help Center', 'Contact', 'Privacy Policy', 'Terms'],
  }

  const socials = [
    { name: 'Twitter', icon: 'X', href: '#' },
    { name: 'LinkedIn', icon: 'in', href: '#' },
    { name: 'GitHub', icon: 'gh', href: '#' },
    { name: 'Instagram', icon: 'ig', href: '#' },
  ]

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #0f1117 0%, #1a1d2e 50%, #0f1117 100%)',
      color: '#e2e8f0',
      fontFamily: "'Georgia', 'Times New Roman', serif",
      padding: '0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative top border */}
      <div style={{
        height: '3px',
        background: 'linear-gradient(90deg, transparent, #10b981, #34d399, #10b981, transparent)',
      }} />

      {/* Decorative background circles */}
      <div style={{
        position: 'absolute', top: '-60px', right: '-60px',
        width: '220px', height: '220px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '40px', left: '-40px',
        width: '160px', height: '160px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(52,211,153,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '56px 32px 32px' }}>

        {/* Top section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr 1fr 1fr 1fr',
          gap: '40px',
          marginBottom: '48px',
        }}>
          {/* Brand column */}
          <div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px',
            }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '8px',
                background: 'linear-gradient(135deg, #10b981, #34d399)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '18px', fontWeight: 'bold', color: '#fff',
                fontFamily: 'monospace',
              }}>◆</div>
              <span style={{
                fontSize: '22px', fontWeight: '700', letterSpacing: '0.02em',
                color: '#fff', fontFamily: "'Georgia', serif",
              }}>Verdant</span>
            </div>
            <p style={{
              fontSize: '14px', color: '#94a3b8', lineHeight: '1.7',
              maxWidth: '240px', marginBottom: '24px',
            }}>
              Crafting digital experiences that stand the test of time. We build with intention, clarity, and care.
            </p>
            {/* Socials */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {socials.map(s => (
                <a key={s.name} href={s.href} title={s.name} style={{
                  width: '34px', height: '34px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '6px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#94a3b8', fontSize: '11px', fontWeight: '700',
                  fontFamily: 'monospace', textDecoration: 'none',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#10b981'
                    e.currentTarget.style.color = '#10b981'
                    e.currentTarget.style.background = 'rgba(16,185,129,0.08)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                    e.currentTarget.style.color = '#94a3b8'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 style={{
                fontSize: '11px', fontWeight: '700', letterSpacing: '0.12em',
                textTransform: 'uppercase', color: '#10b981',
                marginBottom: '18px', fontFamily: 'monospace',
              }}>{category}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {items.map(item => (
                  <li key={item} style={{ marginBottom: '10px' }}>
                    <a href="#" style={{
                      color: '#94a3b8', textDecoration: 'none',
                      fontSize: '14px', transition: 'color 0.2s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.color = '#e2e8f0'}
                      onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
                    >{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter strip */}
        <div style={{
          background: 'rgba(16,185,129,0.06)',
          border: '1px solid rgba(16,185,129,0.15)',
          borderRadius: '12px',
          padding: '24px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          marginBottom: '40px',
          flexWrap: 'wrap',
        }}>
          <div>
            <p style={{ color: '#fff', fontWeight: '600', margin: '0 0 4px', fontSize: '15px' }}>
              Stay in the loop
            </p>
            <p style={{ color: '#64748b', margin: 0, fontSize: '13px' }}>
              No spam. Just thoughtful updates, once a month.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '10px 16px',
                color: '#e2e8f0',
                fontSize: '13px',
                outline: 'none',
                width: '200px',
              }}
            />
            <button style={{
              background: 'linear-gradient(135deg, #10b981, #34d399)',
              border: 'none', borderRadius: '8px',
              padding: '10px 20px', color: '#fff',
              fontSize: '13px', fontWeight: '600',
              cursor: 'pointer', whiteSpace: 'nowrap',
            }}>Subscribe</button>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ color: '#475569', fontSize: '13px', margin: 0 }}>
            © {currentYear} Verdant. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy', 'Terms', 'Cookies'].map(l => (
              <a key={l} href="#" style={{
                color: '#475569', fontSize: '13px', textDecoration: 'none',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#94a3b8'}
                onMouseLeave={e => e.currentTarget.style.color = '#475569'}
              >{l}</a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
