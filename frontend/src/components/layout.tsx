import { Outlet } from 'react-router'
import NavBar from './navbar'

export default function Layout() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col min-h-screen bg-base-100">
        {/* Mobile navbar */}
        <div className="sticky top-0 z-30 flex h-16 w-full justify-center bg-base-300 shadow-sm lg:hidden">
          <div className="navbar w-full">
            <div className="flex-none">
              <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-6 w-6 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </label>
            </div>
            <div className="flex-1">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                MyApp
              </span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-auto">
          <aside>
            <p className="text-sm">© 2025 MyApp - All rights reserved</p>
          </aside>
        </footer>
      </div>

      {/* Sidebar */}
      <NavBar />
    </div>
  )
}