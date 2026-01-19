import React, { useState, useEffect } from 'react';
import { fetchClasses, createClass, deleteClass } from '../../services/api';

export default function ClassManager() {
    const [classes, setClasses] = useState([]);
    const [formData, setFormData] = useState({ name: '', section: '', stream: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadClasses();
    }, []);

    const loadClasses = async () => {
        try {
            const data = await fetchClasses();
            setClasses(data);
        } catch (err) {
            console.error(err);
            alert('Failed to load classes');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name) return;
        setLoading(true);
        try {
            await createClass(formData);
            setFormData({ name: '', section: '', stream: '' });
            loadClasses();
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure? This will delete all subjects in this class too.')) return;
        try {
            await deleteClass(id);
            loadClasses();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow dark:bg-gray-800">
            <h3 className="text-xl font-bold mb-4">Manage Classes</h3>

            {/* Add Class Form */}
            <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 mb-6 items-end">
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm mb-1">Class Name</label>
                    <input
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Class 10"
                        className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:border-gray-600"
                        required
                    />
                </div>
                <div className="w-24">
                    <label className="block text-sm mb-1">Section</label>
                    <input
                        value={formData.section}
                        onChange={e => setFormData({ ...formData, section: e.target.value })}
                        placeholder="e.g. A"
                        className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:border-gray-600"
                    />
                </div>
                <div className="w-32">
                    <label className="block text-sm mb-1">Stream</label>
                    <select
                        value={formData.stream}
                        onChange={e => setFormData({ ...formData, stream: e.target.value })}
                        className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:border-gray-600"
                    >
                        <option value="">None</option>
                        <option value="Science">Science</option>
                        <option value="Commerce">Commerce</option>
                        <option value="Arts">Arts</option>
                    </select>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 h-[42px]"
                >
                    {loading ? 'Adding...' : 'Add Class'}
                </button>
            </form>

            {/* Class List */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b dark:border-gray-700">
                            <th className="py-2">Name</th>
                            <th className="py-2">Section</th>
                            <th className="py-2">Stream</th>
                            <th className="py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map(cls => (
                            <tr key={cls._id} className="border-b dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-900">
                                <td className="py-2">{cls.name}</td>
                                <td className="py-2">{cls.section || '-'}</td>
                                <td className="py-2">{cls.stream || '-'}</td>
                                <td className="py-2">
                                    <button
                                        onClick={() => handleDelete(cls._id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {classes.length === 0 && (
                            <tr>
                                <td colSpan="4" className="py-4 text-center text-gray-500">No classes found. Add one above.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
