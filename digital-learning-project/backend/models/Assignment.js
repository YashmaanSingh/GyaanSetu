const generateId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

class AssignmentModel {
  constructor() {
    this.data = [];
    this.submissions = []; // Store student submissions
  }

  async find(query = {}) {
    return this.data.filter(item => {
      for (let key in query) {
        if (item[key] != query[key]) return false;
      }
      return true;
    }).sort((a, b) => b.createdAt - a.createdAt);
  }

  async findOne(query = {}) {
    const res = await this.find(query);
    return res[0] || null;
  }

  async findById(id) {
    return this.data.find(d => d._id === id) || null;
  }

  async create(data) {
    const assignment = {
      _id: generateId(),
      title: data.title,
      description: data.description || '',
      subjectId: data.subjectId,
      teacherId: data.teacherId,
      dueDate: data.dueDate,
      totalMarks: data.totalMarks || 100,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.data.push(assignment);
    return assignment;
  }

  async submit(assignmentId, studentId, submission) {
    const existing = this.submissions.find(
      s => s.assignmentId === assignmentId && s.studentId === studentId
    );

    if (existing) {
      existing.content = submission.content;
      existing.fileUrl = submission.fileUrl;
      existing.submittedAt = new Date();
      return existing;
    }

    const newSubmission = {
      _id: generateId(),
      assignmentId,
      studentId,
      content: submission.content || '',
      fileUrl: submission.fileUrl || '',
      grade: null,
      feedback: '',
      submittedAt: new Date()
    };

    this.submissions.push(newSubmission);
    return newSubmission;
  }

  async getSubmissions(assignmentId) {
    return this.submissions.filter(s => s.assignmentId === assignmentId);
  }

  async getStudentSubmission(assignmentId, studentId) {
    return this.submissions.find(
      s => s.assignmentId === assignmentId && s.studentId === studentId
    ) || null;
  }

  async gradeSubmission(submissionId, grade, feedback) {
    const submission = this.submissions.find(s => s._id === submissionId);
    if (submission) {
      submission.grade = grade;
      submission.feedback = feedback;
      submission.gradedAt = new Date();
    }
    return submission;
  }

  async countDocuments(query = {}) {
    const res = await this.find(query);
    return res.length;
  }
}

module.exports = new AssignmentModel();
