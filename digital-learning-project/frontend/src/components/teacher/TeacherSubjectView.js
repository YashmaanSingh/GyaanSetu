import React, { useState, useEffect } from 'react';
import { fetchLessons, createLesson, fetchAssignments, createAssignment } from '../../services/api';

export default function TeacherSubjectView({ subject }) {
    const [activeTab, setActiveTab] = useState('lessons');
    const [lessons, setLessons] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [showLessonForm, setShowLessonForm] = useState(false);
    const [showAssignmentForm, setShowAssignmentForm] = useState(false);

    const [lessonForm, setLessonForm] = useState({
        title: '',
        description: '',
        contentType: 'text',
        contentUrl: '',
        duration: 0
    });

    const [assignmentForm, setAssignmentForm] = useState({
        title: '',
        dueDate: '',
        totalMarks: 100
    });

    useEffect(() => {
        if (activeTab === 'lessons') loadLessons();
        if (activeTab === 'assignments') loadAssignments();
    }, [activeTab, subject._id]);

    const loadLessons = async () => {
        try {
            const data = await fetchLessons(subject._id);
            setLessons(data);
        } catch (err) {
            console.error(err);
        }
    };

    const loadAssignments = async () => {
        try {
            const data = await fetchAssignments(subject._id);
            setAssignments(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreateLesson = async (e) => {
        e.preventDefault();
        try {
            await createLesson({
                ...lessonForm,
                subjectId: subject._id,
                teacherId: JSON.parse(localStorage.getItem('auth')).id
            });
            setLessonForm({ title: '', description: '', contentType: 'text', contentUrl: '', duration: 0 });
            setShowLessonForm(false);
            loadLessons();
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    const handleCreateAssignment = async (e) => {
        e.preventDefault();
        try {
            await createAssignment({
                ...assignmentForm,
                subjectId: subject._id,
                teacherId: JSON.parse(localStorage.getItem('auth')).id
            });
            setAssignmentForm({ title: '', dueDate: '', totalMarks: 100 });
            setShowAssignmentForm(false);
            loadAssignments();
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    const getContentTypeIcon = (type) => {
        const icons = {
            text: '📝',
            pdf: '📄',
            video: '🎥',
            image: '🖼️',
            audio: '🎧'
        };
        return icons[type] || '📚';
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow dark:bg-gray-800">
            <h3 className="text-2xl font-bold mb-6">{subject.name}</h3>

            {/* Tabs */}
            <div className="flex border-b mb-6 dark:border-gray-700">
                <button
                    onClick={() => setActiveTab('lessons')}
                    className={`px-6 py-3 font-semibold border-b-2 ${activeTab === 'lessons' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
                >
                    📚 Study Materials
                </button>
                <button
                    onClick={() => setActiveTab('assignments')}
                    className={`px-6 py-3 font-semibold border-b-2 ${activeTab === 'assignments' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500'}`}
                >
                    📋 Assignments
                </button>
            </div>

            {/* Lessons Tab */}
            {activeTab === 'lessons' && (
                <div>
                    <button
                        onClick={() => setShowLessonForm(!showLessonForm)}
                        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        {showLessonForm ? '✕ Cancel' : '+ Add Study Material'}
                    </button>

                    {showLessonForm && (
                        <form onSubmit={handleCreateLesson} className="mb-6 p-4 border rounded bg-gray-50 dark:bg-gray-700 space-y-4">
                            <input
                                type="text"
                                placeholder="Material Title"
                                value={lessonForm.title}
                                onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                                className="w-full px-4 py-2 border rounded dark:bg-gray-600"
                                required
                            />
                            <textarea
                                placeholder="Description"
                                value={lessonForm.description}
                                onChange={(e) => setLessonForm({ ...lessonForm, description: e.target.value })}
                                className="w-full px-4 py-2 border rounded dark:bg-gray-600"
                                rows="3"
                            />
                            <select
                                value={lessonForm.contentType}
                                onChange={(e) => setLessonForm({ ...lessonForm, contentType: e.target.value })}
                                className="w-full px-4 py-2 border rounded dark:bg-gray-600"
                            >
                                <option value="text">📝 Text / Notes</option>
                                <option value="pdf">📄 PDF Document</option>
                                <option value="video">🎥 Video (YouTube Link)</option>
                                <option value="image">🖼️ Image / Diagram</option>
                                <option value="audio">🎧 Audio Lesson</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Content URL (Google Drive, YouTube, etc.)"
                                value={lessonForm.contentUrl}
                                onChange={(e) => setLessonForm({ ...lessonForm, contentUrl: e.target.value })}
                                className="w-full px-4 py-2 border rounded dark:bg-gray-600"
                            />
                            <input
                                type="number"
                                placeholder="Duration (minutes)"
                                value={lessonForm.duration}
                                onChange={(e) => setLessonForm({ ...lessonForm, duration: parseInt(e.target.value) })}
                                className="w-full px-4 py-2 border rounded dark:bg-gray-600"
                            />
                            <button type="submit" className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                                Create Material
                            </button>
                        </form>
                    )}

                    <div className="space-y-3">
                        {lessons.map(lesson => (
                            <div key={lesson._id} className="p-4 border rounded hover:bg-gray-50 dark:hover:bg-gray-700 flex items-start gap-3">
                                <div className="text-3xl">{getContentTypeIcon(lesson.contentType)}</div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-lg">{lesson.title}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{lesson.description}</p>
                                    <div className="flex gap-4 mt-2 text-xs text-gray-500">
                                        <span>⏱ {lesson.duration} mins</span>
                                        <span className="capitalize">{lesson.contentType}</span>
                                    </div>
                                </div>
                                {lesson.contentUrl && (
                                    <a
                                        href={lesson.contentUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                                    >
                                        Open
                                    </a>
                                )}
                            </div>
                        ))}
                        {lessons.length === 0 && <p className="text-gray-500 text-center py-8">No materials yet. Add your first one!</p>}
                    </div>
                </div>
            )}

            {/* Assignments Tab */}
            {activeTab === 'assignments' && (
                <div>
                    <button
                        onClick={() => setShowAssignmentForm(!showAssignmentForm)}
                        className="mb-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                        {showAssignmentForm ? '✕ Cancel' : '+ Create Assignment'}
                    </button>

                    {showAssignmentForm && (
                        <form onSubmit={handleCreateAssignment} className="mb-6 p-4 border rounded bg-gray-50 dark:bg-gray-700 space-y-4">
                            <input
                                type="text"
                                placeholder="Assignment Title"
                                value={assignmentForm.title}
                                onChange={(e) => setAssignmentForm({ ...assignmentForm, title: e.target.value })}
                                className="w-full px-4 py-2 border rounded dark:bg-gray-600"
                                required
                            />
                            <input
                                type="date"
                                value={assignmentForm.dueDate}
                                onChange={(e) => setAssignmentForm({ ...assignmentForm, dueDate: e.target.value })}
                                className="w-full px-4 py-2 border rounded dark:bg-gray-600"
                            />
                            <input
                                type="number"
                                placeholder="Total Marks"
                                value={assignmentForm.totalMarks}
                                onChange={(e) => setAssignmentForm({ ...assignmentForm, totalMarks: parseInt(e.target.value) })}
                                className="w-full px-4 py-2 border rounded dark:bg-gray-600"
                            />
                            <button type="submit" className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                                Create Assignment
                            </button>
                        </form>
                    )}

                    <div className="space-y-3">
                        {assignments.map(assignment => (
                            <div key={assignment._id} className="p-4 border rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                                <h4 className="font-bold text-lg">{assignment.title}</h4>
                                <div className="flex gap-4 mt-2 text-sm text-gray-600">
                                    <span>📅 Due: {assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : 'No deadline'}</span>
                                    <span>🎯 {assignment.totalMarks} marks</span>
                                </div>
                            </div>
                        ))}
                        {assignments.length === 0 && <p className="text-gray-500 text-center py-8">No assignments yet. Create one!</p>}
                    </div>
                </div>
            )}
        </div>
    );
}
