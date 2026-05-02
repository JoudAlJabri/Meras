import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

function AdminLayout({ children }) {
  const location = useLocation()
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredPath, setHoveredPath] = useState('')

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)

      if (!mobile) {
        setMenuOpen(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (menuOpen && isMobile) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [menuOpen, isMobile])

  const navItems = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Users', path: '/admin/users' },
    { label: 'Verify', path: '/admin/pending-verifications' },
    { label: 'Content', path: '/admin/content-moderation' },
    { label: 'Announcements', path: '/admin/announcements' },
    { label: 'Taxonomy', path: '/admin/taxonomy' },
    { label: 'Earnings', path: '/admin/earnings' },
    { label: 'Office Hours', path: '/admin/office-hours' },
  ]

  const getLinkStyle = (itemPath, isActive) => {
    const isHovered = hoveredPath === itemPath

    return {
      textDecoration: 'none',
      color: 'white',
      padding: '14px 16px',
      borderRadius: '12px',
      backgroundColor: isActive || isHovered ? 'rgba(0, 0, 0, 0.12)' : 'transparent',
      fontWeight: isActive ? '600' : '500',
      transition: 'all 0.2s ease',
      display: 'block',
      letterSpacing: '0.2px',
      boxShadow: isActive ? 'inset 3px 0 0 #36b26b' : 'none',
    }
  }

  const navLinks = (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path

        return (
          <Link
            key={item.path}
            to={item.path}
            style={getLinkStyle(item.path, isActive)}
            onMouseEnter={() => setHoveredPath(item.path)}
            onMouseLeave={() => setHoveredPath('')}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )

  const sidebarContent = (
    <>
      <div style={{ marginBottom: '18px' }}>
        <div
          style={{
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            opacity: 0.6,
            marginBottom: '10px',
            fontWeight: '600',
          }}
        >
          Admin Navigation
        </div>

        <div
          style={{
            height: '1px',
            background: 'rgba(255,255,255,0.12)',
          }}
        />
      </div>

      {navLinks}
    </>
  )

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#2e5c4e',
      }}
    >
      <header
        style={{
          height: '72px',
          background: 'linear-gradient(90deg, #2e5c4e 0%, #335f51 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '0 16px' : '0 24px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          position: 'sticky',
          top: 0,
          zIndex: 1200,
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            minWidth: 0,
          }}
        >
          {isMobile && (
            <button
              onClick={() => setMenuOpen(true)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '28px',
                cursor: 'pointer',
                padding: 0,
                lineHeight: 1,
              }}
            >
              ☰
            </button>
          )}

          <h2
            style={{
              margin: 0,
              fontSize: isMobile ? '18px' : '22px',
              fontWeight: '700',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <span style={{ color: '#36b26b' }}>Meras</span> Admin Portal
          </h2>
        </div>

      <button
        onClick={() => {
          localStorage.removeItem('meras_token')
          window.location.href = '/'
        }}
        style={{
          backgroundColor: 'rgba(255,255,255,0.12)',
          color: 'white',
          padding: isMobile ? '6px 10px' : '7px 14px',
          borderRadius: '999px',
          fontSize: isMobile ? '12px' : '14px',
          fontWeight: '600',
          flexShrink: 0,
          border: '1px solid rgba(255,255,255,0.08)',
          cursor: 'pointer',
        }}
      >
        Admin · Logout
      </button>
      </header>

      <div
        style={{
          display: 'flex',
          flex: 1,
          minHeight: 'calc(100vh - 72px)',
        }}
      >
        {!isMobile && (
          <aside
            style={{
              width: '250px',
              background: 'linear-gradient(180deg, #3d7a66 0%, #2f6655 100%)',
              color: 'white',
              padding: '24px 18px',
              boxSizing: 'border-box',
              borderRight: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {sidebarContent}
          </aside>
        )}

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
          }}
        >
          <main
            style={{
              flex: 1,
              padding: isMobile ? '20px 16px' : '30px',
              backgroundColor: '#f8faf9',
              boxSizing: 'border-box',
              overflowX: 'hidden',
              minWidth: 0,
            }}
          >
            {children}
          </main>

          <footer
            style={{
              backgroundColor: '#ffffff',
              borderTop: '1px solid #e5e7eb',
              padding: isMobile ? '14px 16px' : '18px 24px',
              textAlign: 'center',
              fontSize: isMobile ? '14px' : '15px',
              color: '#94a3b8',
              fontWeight: '500',
            }}
          >
            <span style={{ color: '#36b26b', fontWeight: '700' }}>Meras</span> © 2025 · Experience the Major
          </footer>
        </div>
      </div>

      {isMobile && menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed',
            top: '72px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.42)',
            zIndex: 1100,
          }}
        />
      )}

      {isMobile && (
        <aside
          style={{
            position: 'fixed',
            top: '72px',
            left: menuOpen ? 0 : '-265px',
            width: '260px',
            height: 'calc(100vh - 72px)',
            background: 'linear-gradient(180deg, #3d7a66 0%, #2f6655 100%)',
            color: 'white',
            padding: '22px 16px',
            boxSizing: 'border-box',
            transition: 'left 0.25s ease',
            zIndex: 1150,
            boxShadow: menuOpen ? '4px 0 16px rgba(0,0,0,0.2)' : 'none',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
            }}
          >
            <div
              style={{
                fontSize: '18px',
                fontWeight: '700',
              }}
            >
              <span style={{ color: '#36b26b' }}>Meras</span> Admin
            </div>

            <button
              onClick={() => setMenuOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '26px',
                cursor: 'pointer',
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>

          {sidebarContent}
        </aside>
      )}
    </div>
  )
}

export default AdminLayout