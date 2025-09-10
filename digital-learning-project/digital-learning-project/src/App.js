import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Splash from './components/Splash';
import Login from './components/Login';
import Home from './pages/Home';
import Student from './pages/Student';
import Teacher from './pages/Teacher';
import Admin from './pages/Admin';
import About from './pages/About';
import Announcements from './pages/Announcements';
import Downloads from './pages/Downloads';
import TakeQuiz from './pages/TakeQuiz';

export const AuthContext = createContext();
export const LangContext = createContext('en');

function App() {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');
  const [dark, setDark] = useState(false);
  const [auth, setAuth] = useState(() => JSON.parse(localStorage.getItem('auth') || 'null'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => localStorage.setItem('lang', lang), [lang]);
  useEffect(() => localStorage.setItem('auth', JSON.stringify(auth)), [auth]);

  // CRITICAL: toggle Tailwind's dark mode class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  if (loading) return <Splash />;

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <AuthContext.Provider value={{ auth, setAuth }}>
        {/* Keep this wrapper only if you also use class-based dark styles inside; it's optional now */}
        <div className={dark ? 'dark' : ''}>
          {/* Page background colors (redundant if you set body/.dark body in index.css) */}
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
            <Router>
              <Navbar setDark={setDark} dark={dark} />
              <main className="p-6 max-w-6xl mx-auto">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route
                    path="/student"
                    element={auth && auth.role === 'student' ? <Student /> : <Navigate to="/login" />}
                  />
                  <Route
                    path="/teacher"
                    element={auth && auth.role === 'teacher' ? <Teacher /> : <Navigate to="/login" />}
                  />
                  <Route
                    path="/admin"
                    element={auth && auth.role === 'admin' ? <Admin /> : <Navigate to="/login" />}
                  />
                  {/* Optional extra routes if added later */}
                  {/* <Route path="/announcements" element={<Announcements />} /> */}
                  {/* <Route path="/downloads" element={<Downloads />} /> */}
                  {/* <Route path="/quiz" element={<TakeQuiz />} /> */}
                  <Route path="*" element={<Home />} />
                </Routes>
              </main>
            </Router>
          </div>
        </div>
      </AuthContext.Provider>
    </LangContext.Provider>
  );
}

export default App;
