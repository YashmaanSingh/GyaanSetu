import React, { useState, useEffect, useContext } from 'react';
import { fetchClasses, fetchSubjects, updateUserProfile } from '../services/api';
import StudentSubjectView from '../components/student/StudentSubjectView';
import { AuthContext } from '../App';

export default function Student() {
  const { auth, setAuth } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(auth.classId || ''); // Initialize with user's class if exists
  const [subjects, setSubjects] = useState([]);
  const [viewingSubject, setViewingSubject] = useState(null);

  useEffect(() => {
    loadClasses();
  }, []);

  useEffect(() => {
    if (selectedClassId) {
      loadSubjects(selectedClassId);
      // Persist selection if different from current
      if (selectedClassId !== auth.classId) {
        updateProfile(selectedClassId);
      }
    } else {
      setSubjects([]);
    }
  }, [selectedClassId]);

  const updateProfile = async (classId) => {
    try {
      const updatedUser = await updateUserProfile({ classId });
      setAuth(updatedUser);
      localStorage.setItem('auth', JSON.stringify(updatedUser));
    } catch (err) {
      console.error('Failed to update profile', err);
    }
  };

  const loadClasses = async () => {
    try {
      const data = await fetchClasses();
      setClasses(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadSubjects = async (classId) => {
    try {
      const data = await fetchSubjects(classId);
      setSubjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (viewingSubject) {
    return (
      <div className="min-h-screen pb-10">
        <StudentSubjectView subject={viewingSubject} onBack={() => setViewingSubject(null)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-10">
      <h2 className="text-2xl font-bold mb-6">Student Dashboard</h2>

      {/* Class Selection (since we don't have assignment yet) */}
      <div className="bg-white p-6 rounded shadow dark:bg-gray-800 mb-6">
        <label className="block text-sm mb-2 font-medium">Select Your Class</label>
        <select
          value={selectedClassId}
          onChange={(e) => setSelectedClassId(e.target.value)}
          className="w-full md:w-1/3 border px-3 py-2 rounded dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="">-- Select Class --</option>
          {classes.map(cls => (
            <option key={cls._id} value={cls._id}>
              {cls.name} {cls.section ? `(${cls.section})` : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Subject Grid */}
      {selectedClassId && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {subjects.map(sub => (
            <div
              key={sub._id}
              onClick={() => setViewingSubject(sub)}
              className="bg-white p-6 rounded shadow cursor-pointer hover:shadow-lg transition dark:bg-gray-800 border-l-4 border-blue-500"
            >
              <h3 className="font-bold text-lg mb-1">{sub.name}</h3>
              <p className="text-gray-500 text-sm">Teacher: {sub.teacherId?.name || 'N/A'}</p>
            </div>
          ))}
          {subjects.length === 0 && (
            <div className="col-span-4 text-center text-gray-500 py-10">
              No subjects found for this class.
            </div>
          )}
        </div>
      )}

      {!selectedClassId && (
        <div className="text-center text-gray-500 py-10">
          Please select a class to view subjects.
        </div>
      )}
    </div>
  );
}
