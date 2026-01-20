import React, { useState, useEffect } from 'react';
import { fetchClasses, fetchStudentsByClass, markAttendance } from '../../services/api';

export default function AttendanceManager() {
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({}); // { studentId: 'Present' | 'Absent' }
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadClasses();
    }, []);

    useEffect(() => {
        if (selectedClass) {
            loadStudents(selectedClass);
        } else {
            setStudents([]);
        }
    }, [selectedClass]);

    const loadClasses = async () => {
        try {
            const data = await fetchClasses();
            setClasses(data);
        } catch (err) {
            console.error(err);
        }
    };

    const loadStudents = async (classId) => {
        try {
            const data = await fetchStudentsByClass(classId);
            setStudents(data);
            // Initialize attendance
            const initial = {};
            data.forEach(s => initial[s._id] = 'Present');
            setAttendance(initial);
        } catch (err) {
            console.error(err);
        }
    };

    const handleStatusChange = (studentId, status) => {
        setAttendance(prev => ({ ...prev, [studentId]: status }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        const records = Object.entries(attendance).map(([studentId, status]) => ({ studentId, status }));
        try {
            await markAttendance({ date, classId: selectedClass, records });
            alert('Attendance marked successfully');
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow dark:bg-gray-800">
            <h3 className="text-xl font-bold mb-4">Attendance Manager</h3>

            <div className="flex gap-4 mb-6">
                <div className="flex-1">
                    <label className="block text-sm mb-1">Select Class</label>
                    <select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="w-full border px-3 py-2 rounded dark:bg-gray-700"
                    >
                        <option value="">-- Select --</option>
                        {classes.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                    </select>
                </div>
                <div className="flex-1">
                    <label className="block text-sm mb-1">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full border px-3 py-2 rounded dark:bg-gray-700"
                    />
                </div>
            </div>

            {selectedClass && (
                <>
                    <div className="mb-4 space-y-2">
                        {students.map(student => (
                            <div key={student._id} className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                                <span className="font-medium">{student.name}</span>
                                <div className="flex gap-4">
                                    {['Present', 'Absent', 'Late'].map(status => (
                                        <label key={status} className="flex items-center gap-1 cursor-pointer">
                                            <input
                                                type="radio"
                                                name={`att-${student._id}`}
                                                checked={attendance[student._id] === status}
                                                onChange={() => handleStatusChange(student._id, status)}
                                                className="accent-blue-600"
                                            />
                                            <span className={`text-sm ${status === 'Absent' ? 'text-red-500' :
                                                status === 'Late' ? 'text-yellow-600' : 'text-green-600'
                                                }`}>{status}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {students.length === 0 && <p className="text-gray-500">No students found in this class.</p>}
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading || students.length === 0}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save Attendance'}
                    </button>
                </>
            )}
        </div>
    );
}
