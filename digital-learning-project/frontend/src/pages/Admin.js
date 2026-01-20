import React, { useState, useEffect } from 'react';
import ClassManager from '../components/admin/ClassManager';
import SubjectManager from '../components/admin/SubjectManager';
import { fetchStats } from '../services/api';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('classes');
  const [stats, setStats] = useState({ students: 0, teachers: 0, classes: 0, subjects: 0 });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await fetchStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow dark:bg-gray-800 border-l-4 border-blue-500">
          <div className="text-gray-500 text-sm">Total Students</div>
          <div className="text-2xl font-bold">{stats.students}</div>
        </div>
        <div className="bg-white p-4 rounded shadow dark:bg-gray-800 border-l-4 border-purple-500">
          <div className="text-gray-500 text-sm">Total Teachers</div>
          <div className="text-2xl font-bold">{stats.teachers}</div>
        </div>
        <div className="bg-white p-4 rounded shadow dark:bg-gray-800 border-l-4 border-green-500">
          <div className="text-gray-500 text-sm">Active Classes</div>
          <div className="text-2xl font-bold">{stats.classes}</div>
        </div>
        <div className="bg-white p-4 rounded shadow dark:bg-gray-800 border-l-4 border-orange-500">
          <div className="text-gray-500 text-sm">Total Subjects</div>
          <div className="text-2xl font-bold">{stats.subjects}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('classes')}
          className={`py-2 px-4 border-b-2 transition-colors ${activeTab === 'classes'
            ? 'border-blue-600 text-blue-600 font-medium'
            : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
        >
          Classes
        </button>
        <button
          onClick={() => setActiveTab('subjects')}
          className={`py-2 px-4 border-b-2 transition-colors ${activeTab === 'subjects'
            ? 'border-blue-600 text-blue-600 font-medium'
            : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
        >
          Subjects
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`py-2 px-4 border-b-2 transition-colors ${activeTab === 'users'
            ? 'border-blue-600 text-blue-600 font-medium'
            : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
        >
          Users
        </button>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === 'classes' && <ClassManager />}
        {activeTab === 'subjects' && <SubjectManager />}
        {activeTab === 'users' && (
          <div className="bg-white p-6 rounded-lg shadow dark:bg-gray-800">
            <h3 className="text-xl font-bold mb-4">User Management</h3>
            <p className="text-gray-500">Coming soon in Phase 2B...</p>
          </div>
        )}
      </div>
    </section>
  );
}
