import { Link, useNavigate } from 'react-router-dom'


function ExplorerDashboard() {
  return <div className="p-4">
    <h1>Explorer Dashboard - Coming Soon</h1>
    <ul className="navbar-nav ms-auto align-items-center gap-2">
              <li className="nav-item">
                <Link to= "/explorer/challengeCatalog" >
                {/* temporary jus to reach the other pages */}
                  Challenge Catalog
                </Link>
              </li>
            </ul>
    </div>
}
export default ExplorerDashboard