const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to make API calls
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {}),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.msg || 'API call failed');
    }

    return data;
  } catch (error) {
    // Re-throw error for caller to handle
    throw error;
  }
}

// Authentication functions
export async function loginUser(email, password) {
  const data = await apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  // Backend returns { token, user: { id, name, role } }
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  return data.user;
}

export async function registerUser(userData) {
  const data = await apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  return data.user;
}

export async function resetPassword(email, newPassword) {
  const data = await apiCall('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ email, newPassword }),
  });
  return data;
}

// Class functions
export async function fetchClasses() {
  return apiCall('/classes');
}

export async function createClass(classData) {
  return apiCall('/classes', {
    method: 'POST',
    body: JSON.stringify(classData),
  });
}

export async function deleteClass(id) {
  return apiCall(`/classes/${id}`, {
    method: 'DELETE',
  });
}

// Subject functions
export async function fetchSubjects(classId) {
  const query = classId ? `?classId=${classId}` : '';
  return apiCall(`/subjects${query}`);
}

export async function createSubject(subjectData) {
  return apiCall('/subjects', {
    method: 'POST',
    body: JSON.stringify(subjectData),
  });
}

export async function deleteSubject(id) {
  return apiCall(`/subjects/${id}`, {
    method: 'DELETE',
  });
}

// Lesson functions
export async function fetchLessons(subjectId) {
  const query = subjectId ? `?subjectId=${subjectId}` : '';
  return apiCall(`/lessons${query}`);
}

export async function createLesson(lessonData) {
  return apiCall('/lessons', {
    method: 'POST',
    body: JSON.stringify(lessonData),
  });
}

// Assignment functions
export async function fetchAssignments(subjectId) {
  const query = subjectId ? `?subjectId=${subjectId}` : '';
  return apiCall(`/assignments${query}`);
}

export async function createAssignment(assignmentData) {
  return apiCall('/assignments', {
    method: 'POST',
    body: JSON.stringify(assignmentData),
  });
}

export async function submitAssignment(assignmentId, answers, studentId) {
  return apiCall(`/assignments/${assignmentId}/submit`, {
    method: 'POST',
    body: JSON.stringify({ content: answers, studentId }),
  });
}

export async function getMySubmission(assignmentId) {
  return apiCall(`/assignments/${assignmentId}/submission`);
}

export async function getAssignmentSubmissions(assignmentId) {
  return apiCall(`/assignments/${assignmentId}/submissions`);
}

export async function gradeSubmission(submissionId, grade, feedback) {
  return apiCall(`/assignments/submissions/${submissionId}/grade`, {
    method: 'PUT',
    body: JSON.stringify({ grade, feedback }),
  });
}

// Progress functions
export async function fetchProgress(studentId) {
  return apiCall(`/progress/${studentId}`);
}

export async function updateLessonProgress(studentId, lessonId) {
  return apiCall('/progress/lesson', {
    method: 'POST',
    body: JSON.stringify({ studentId, lessonId }),
  });
}

// Student functions
export async function fetchStudents() {
  return apiCall('/students');
}

export async function fetchStudentsByClass(classId) {
  return apiCall(`/users/students/${classId}`);
}

export async function createStudent(studentData) {
  return apiCall('/students', {
    method: 'POST',
    body: JSON.stringify(studentData),
  });
}

export async function fetchStats() {
  return apiCall('/users/stats');
}

export async function updateUserProfile(data) {
  const res = await apiCall('/users/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return res.user;
}

// Resource functions
export async function fetchResources() {
  return apiCall('/resources');
}

export async function uploadResource(resourceData) {
  return apiCall('/resources', {
    method: 'POST',
    body: JSON.stringify(resourceData),
  });
}

// Announcement functions
export async function fetchAnnouncements() {
  return apiCall('/announcements');
}

export async function createAnnouncement(announcementData) {
  return apiCall('/announcements', {
    method: 'POST',
    body: JSON.stringify(announcementData),
  });
}

// Attendance functions
export async function fetchAttendance() {
  return apiCall('/attendance');
}

export async function markAttendance(attendanceData) {
  return apiCall('/attendance', {
    method: 'POST',
    body: JSON.stringify(attendanceData),
  });
}

// Legacy mock functions for backward compatibility
export async function mockAuth({ name, role }) {
  // simulate network delay
  await new Promise(r => setTimeout(r, 500));
  return { id: Date.now(), name: name || ('User' + Math.floor(Math.random() * 1000)), role };
}
