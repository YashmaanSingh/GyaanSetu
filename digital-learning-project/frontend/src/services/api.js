const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to make API calls
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API call failed');
    }

    return data;
  } catch (error) {
    // Re-throw error for caller to handle
    throw error;
  }
}

// Authentication functions
export async function loginUser(email, password) {
  return apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function registerUser(userData) {
  return apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

// Lesson functions
export async function fetchLessons() {
  try {
    return await apiCall('/lessons');
  } catch (error) {
    // Fallback to mock data if API fails
    return [
      { id: 1, title: 'Intro to Computers', minutes: 15 },
      { id: 2, title: 'Internet Safety', minutes: 10 },
      { id: 3, title: 'Create Document', minutes: 12 },
    ];
  }
}

export async function createLesson(lessonData) {
  return apiCall('/lessons', {
    method: 'POST',
    body: JSON.stringify(lessonData),
  });
}

// Assignment functions
export async function fetchAssignments() {
  return apiCall('/assignments');
}

export async function createAssignment(assignmentData) {
  return apiCall('/assignments', {
    method: 'POST',
    body: JSON.stringify(assignmentData),
  });
}

export async function submitAssignment(assignmentId, answers, studentId) {
  return apiCall('/assignments/submit', {
    method: 'POST',
    body: JSON.stringify({ assignmentId, answers, studentId }),
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

export async function createStudent(studentData) {
  return apiCall('/students', {
    method: 'POST',
    body: JSON.stringify(studentData),
  });
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
