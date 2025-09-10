import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LangContext, AuthContext } from '../App';

export default function Navbar({ setDark, dark }) {
  const { lang, setLang } = useContext(LangContext);
  const { auth, setAuth } = useContext(AuthContext);
  const loc = useLocation();
  const nav = useNavigate();

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('auth');
    nav('/login');
  };

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className={
        'px-3 py-1 rounded hover:bg-blue-700 transition ' +
        (loc.pathname === to ? 'bg-blue-800' : '')
      }
    >
      {children}
    </Link>
  );

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="font-bold text-lg">Digital Pathshala</div>
        </div>

        <div className="flex items-center gap-3">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>

          {auth ? (
            <>
              {auth.role === 'student' && <NavLink to="/student">Student</NavLink>}
              {auth.role === 'teacher' && <NavLink to="/teacher">Teacher</NavLink>}
              {auth.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}

              <button
                onClick={logout}
                className="px-3 py-1 bg-white text-black rounded hover:bg-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}

          <select
            className="text-black rounded px-2 py-1"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            aria-label="Language"
          >
            <option value="en">EN</option>
            <option value="hi">हिन्दी</option>
            <option value="pa">ਪੰਜਾਬੀ</option>
          </select>

          <button
            onClick={() => setDark((d) => !d)}
            aria-pressed={dark}
            aria-label="Theme"
            className="bg-white text-black px-2 py-1 rounded hover:bg-gray-200"
          >
            {dark ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>
    </nav>
  );
}
