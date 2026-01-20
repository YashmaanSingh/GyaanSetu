import React, { useState, useEffect } from 'react';
import { fetchLessons, fetchAssignments } from '../../services/api';

export default function StudentSubjectView({ subject, onBack }) {
    const [activeTab, setActiveTab] = useState('lessons');
    const [lessons, setLessons] = useState([]);
    const [assignments, setAssignments] = useState([]);

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

    const downloadMaterial = (lesson) => {
        if (lesson.contentUrl) {
            window.open(lesson.contentUrl, '_blank');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow dark:bg-gray-800">
            <div className="flex items-center mb-6">
                <button onClick={onBack} className="mr-4 text-gray-500 hover:text-gray-700 text-2xl">
                    ←
                </button>
                <h3 className="text-2xl font-bold">{subject.name}</h3>
            </div>

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

            {/* Lessons */}
            {activeTab === 'lessons' && (
                <div className="space-y-4">
                    {lessons.map(lesson => (
                        <div key={lesson._id} className="p-5 border-2 rounded-lg hover:border-blue-400 transition flex items-start gap-4 bg-gradient-to-r from-blue-50 to-white dark:from-gray-700 dark:to-gray-800">
                            <div className="text-4xl">{getContentTypeIcon(lesson.contentType)}</div>
                            <div className="flex-1">
                                <h4 className="font-bold text-xl text-blue-900 dark:text-blue-200">{lesson.title}</h4>
                                <p className="text-gray-700 dark:text-gray-300 mt-1">{lesson.description}</p>
                                <div className="flex gap-4 mt-3 text-sm">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">⏱ {lesson.duration} mins</span>
                                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full capitalize">{lesson.contentType}</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                {lesson.contentUrl && (
                                    <>
                                        <a
                                            href={lesson.contentUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center text-sm font-semibold"
                                        >
                                            📖 Open
                                        </a>
                                        <button
                                            onClick={() => downloadMaterial(lesson)}
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-center text-sm font-semibold"
                                        >
                                            ⬇ Download
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                    {lessons.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">📚</div>
                            <p className="text-gray-500 text-lg">No study materials available yet.</p>
                            <p className="text-gray-400 text-sm">Check back later!</p>
                        </div>
                    )}
                </div>
            )}

            {/* Assignments */}
            {activeTab === 'assignments' && (
                <div className="space-y-4">
                    {assignments.map(assignment => (
                        <div key={assignment._id} className="p-5 border-2 rounded-lg hover:border-purple-400 transition bg-gradient-to-r from-purple-50 to-white dark:from-gray-700 dark:to-gray-800">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h4 className="font-bold text-xl text-purple-900 dark:text-purple-200">{assignment.title}</h4>
                                    <div className="flex gap-4 mt-3">
                                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                                            📅 Due: {assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : 'No deadline'}
                                        </span>
                                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                                            🎯 {assignment.totalMarks} marks
                                        </span>
                                    </div>
                                </div>
                                <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold">
                                    Submit
                                </button>
                            </div>
                        </div>
                    ))}
                    {assignments.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">📋</div>
                            <p className="text-gray-500 text-lg">No assignments yet.</p>
                            <p className="text-gray-400 text-sm">You're all caught up!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
