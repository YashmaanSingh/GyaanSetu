import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { mockAuth } from '../services/api';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [role, setRole] = useState('student');
  const [busy, setBusy] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) return;
    setBusy(true);
    const user = await mockAuth({ name: username, role });
    setBusy(false);
    setAuth(user);
    localStorage.setItem('auth', JSON.stringify(user));
    if (role === 'student') nav('/student');
    else if (role === 'teacher') nav('/teacher');
    else nav('/admin');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-3">Login</h2>
      <form onSubmit={submit} className="space-y-4">

        {/* 1) Username */}
        <div>
          <label className="block text-sm mb-1">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full border dark:border-gray-700 px-3 py-2 rounded bg-white dark:bg-gray-900"
            autoComplete="username"
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

        {/* 3) Role */}
        <div>
          <label className="block text-sm mb-1">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border dark:border-gray-700 px-3 py-2 rounded bg-white dark:bg-gray-900"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={busy}
          className="w-full bg-blue-600 text-white px-3 py-2 rounded disabled:opacity-60"
        >
          {busy ? 'Signing in...' : `Login as ${role}`}
        </button>
      </form>
    </div>
  );
}
