import React, { useState, useEffect } from 'react';
import { fetchClasses, fetchSubjects, createSubject, deleteSubject } from '../../services/api';

export default function SubjectManager() {
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadClasses();
    }, []);

    useEffect(() => {
        if (selectedClass) {
            loadSubjects(selectedClass);
        } else {
            setSubjects([]);
        }
    }, [selectedClass]);

    const loadClasses = async () => {
        try {
            const data = await fetchClasses();
            setClasses(data);
            if (data.length > 0) setSelectedClass(data[0]._id);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !selectedClass) return;
        setLoading(true);
        try {
            await createSubject({ name, classId: selectedClass });
            setName('');
            loadSubjects(selectedClass);
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this subject?')) return;
        try {
            await deleteSubject(id);
            loadSubjects(selectedClass);
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow dark:bg-gray-800">
            <h3 className="text-xl font-bold mb-4">Manage Subjects</h3>

            <div className="mb-6">
                <label className="block text-sm mb-1 font-medium">Select Class First</label>
                <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full md:w-1/2 border px-3 py-2 rounded dark:bg-gray-700 dark:border-gray-600"
                >
                    <option value="">-- Select Class --</option>
                    {classes.map(cls => (
                        <option key={cls._id} value={cls._id}>
                            {cls.name} {cls.section ? `(${cls.section})` : ''} {cls.stream ? `[${cls.stream}]` : ''}
                        </option>
                    ))}
                </select>
            </div>

            {selectedClass && (
                <>
                    <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="New Subject Name (e.g. Mathematics)"
                            className="flex-1 border px-3 py-2 rounded dark:bg-gray-700 dark:border-gray-600"
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                        >
                            {loading ? 'Adding...' : 'Add Subject'}
                        </button>
                    </form>

                    <ul className="space-y-2">
                        {subjects.map(sub => (
                            <li key={sub._id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                                <span>{sub.name}</span>
                                <div className="flex gap-3">
                                    <span className="text-sm text-gray-500">{sub.teacherId?.name || 'No Teacher'}</span>
                                    <button
                                        onClick={() => handleDelete(sub._id)}
                                        className="text-red-500 hover:text-red-700 text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                        {subjects.length === 0 && (
                            <p className="text-gray-500 text-center py-4">No subjects in this class yet.</p>
                        )}
                    </ul>
                </>
            )}
        </div>
    );
}
