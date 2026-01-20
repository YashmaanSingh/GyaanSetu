import React, { useState, useEffect } from 'react';
import { fetchSubjects } from '../services/api';
import TeacherSubjectView from '../components/teacher/TeacherSubjectView';
import AttendanceManager from '../components/teacher/AttendanceManager';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function Teacher() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [view, setView] = useState('subjects'); // 'subjects' or 'attendance'

  useEffect(() => {
    loadMySubjects();
  }, []);

  const loadMySubjects = async () => {
    try {
      // For now, fetching ALL subjects. Ideally, backend should filter by req.user._id
      // But since we didn't implement strict "assign teacher to subject" enforcement in list API yet,
      // we'll just fetch all and maybe filter client side or show all.
      // Let's assume we want to show all available subjects for now so the user can play around.
      const data = await fetchSubjects();
      setSubjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen pb-10">
      <h2 className="text-2xl font-bold mb-6">Teacher Dashboard</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Sidebar / Subject List */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white p-4 rounded shadow dark:bg-gray-800">
            <h3 className="font-bold mb-3">Menu</h3>
            <ul className="space-y-2">
              <li
                onClick={() => { setView('subjects'); setSelectedSubject(null); }}
                className={`p-2 rounded cursor-pointer ${view === 'subjects' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700' : 'hover:bg-gray-100'}`}
              >
                My Subjects
              </li>
              <li
                onClick={() => setView('attendance')}
                className={`p-2 rounded cursor-pointer ${view === 'attendance' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700' : 'hover:bg-gray-100'}`}
              >
                Take Attendance
              </li>
            </ul>
          </div>

          {view === 'subjects' && (
            <div className="bg-white p-4 rounded shadow dark:bg-gray-800">
              <h3 className="font-bold mb-3">Subject List</h3>
              <ul className="space-y-2">
                {subjects.map(sub => (
                  <li
                    key={sub._id}
                    onClick={() => setSelectedSubject(sub)}
                    className={`p-2 rounded cursor-pointer ${selectedSubject?._id === sub._id ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  >
                    <div className="font-medium">{sub.name}</div>
                    <div className="text-xs text-gray-500">Class: {sub.classId?.name}</div>
                  </li>
                ))}
                {subjects.length === 0 && <p className="text-sm text-gray-500">No subjects found.</p>}
              </ul>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-2">
          {view === 'attendance' && <AttendanceManager />}
          {view === 'subjects' && (
            selectedSubject ? (
              <TeacherSubjectView subject={selectedSubject} />
            ) : (
              <div className="bg-white p-6 rounded shadow dark:bg-gray-800">
                <h3 className="text-xl font-bold mb-4">Dashboard Overview</h3>
                <div className="text-gray-500 mb-6">Select a subject from the left to manage content.</div>

                <h4 className="font-semibold mb-2">Weekly Attendance Trends (Demo)</h4>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { day: 'Mon', present: 85 },
                      { day: 'Tue', present: 88 },
                      { day: 'Wed', present: 92 },
                      { day: 'Thu', present: 80 },
                      { day: 'Fri', present: 85 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="present" fill="#4F46E5" name="Presence %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
