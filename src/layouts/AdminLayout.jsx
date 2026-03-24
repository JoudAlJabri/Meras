import { Link, useLocation } from 'react-router-dom'

function AdminLayout({ children }) {
  const location = useLocation()

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Users', path: '/admin/users' },
    { label: 'Verify', path: '/admin/pending-verifications' },
    { label: 'Content', path: '/admin/content-moderation' },
    { label: 'Announcements', path: '/admin/announcements' },
    { label: 'Taxonomy', path: '/admin/taxonomy' },
    { label: 'Earnings', path: '/admin/earnings' },
    { label: 'Office Hours', path: '/admin/office-hours' },
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#2e5c4e' }}>
      {/* Top Navbar */}
      <header
        style={{
          height: '70px',
          backgroundColor: '#2e5c4e',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          borderBottom: '1px solid #1f2937',
        }}
      >
        <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '700' }}>
          Admin Portal
        </h2>

        <span
          style={{
            backgroundColor: '#367361',
            color: 'white',
            padding: '6px 14px',
            borderRadius: '999px',
            fontSize: '14px',
            fontWeight: '600',
          }}
        >
          Admin
        </span>
      </header>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 70px)' }}>
        {/* Sidebar */}
        <aside
          style={{
            width: '240px',
            backgroundColor: '#367361',
            color: 'white',
            padding: '24px 16px',
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    textDecoration: 'none',
                    color: 'white',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    backgroundColor: isActive ? '#2e5c4e' : 'transparent',
                    fontWeight: isActive ? '600' : '500',
                    transition: '0.2s',
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main
          style={{
            flex: 1,
            padding: '30px',
            backgroundColor: '#f9fafb',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout