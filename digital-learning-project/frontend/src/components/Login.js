import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { loginUser } from '../services/api';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // email effectively
  const [showPw, setShowPw] = useState(false);
  // role is determined by backend response, not user selection during login
  const [busy, setBusy] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) return;
    setBusy(true);
    try {
      // Use real login API
      const user = await loginUser(username, password); // Note: API expects email, but variable is username. Assuming user enters email.
      setAuth(user);
      if (user.role === 'student') nav('/student');
      else if (user.role === 'teacher') nav('/teacher');
      else if (user.role === 'admin') nav('/admin');
      else nav('/');
    } catch (err) {
      alert('Login failed: ' + err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-3">Login</h2>
      <form onSubmit={submit} className="space-y-4">

        {/* 1) Email */}
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your email"
            className="w-full border dark:border-gray-700 px-3 py-2 rounded bg-white dark:bg-gray-900"
            autoComplete="email"
            required
          />
        </div>

        {/* 2) Password */}
        <div>
          <label className="block text-sm mb-1">Password</label>
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border dark:border-gray-700 px-3 py-2 pr-20 rounded bg-white dark:bg-gray-900"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm px-2 py-1 rounded bg-gray-100 dark:bg-gray-700"
              aria-label={showPw ? 'Hide password' : 'Show password'}
            >
              {showPw ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>



        {/* Submit */}
        <button
          type="submit"
          disabled={busy}
          className="w-full bg-blue-600 text-white px-3 py-2 rounded disabled:opacity-60"
        >
          {busy ? 'Signing in...' : 'Login'}
        </button>
      </form>
      <p className="text-sm text-center mt-4 text-gray-600">
        <span
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={() => nav('/forgot-password')}
        >
          Forgot Password?
        </span>
      </p>
      <p className="text-sm text-center mt-2 text-gray-600">
        Don't have an account?{' '}
        <span
          className="text-blue-600 cursor-pointer hover:underline"
          onClick={() => nav('/signup')}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
}
