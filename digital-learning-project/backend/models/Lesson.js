const generateId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

class LessonModel {
  constructor() {
    this.data = [];
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
    const lesson = {
      _id: generateId(),
      title: data.title,
      description: data.description || '',
      subjectId: data.subjectId,
      teacherId: data.teacherId,
      contentType: data.contentType || 'text', // 'text', 'pdf', 'video', 'image', 'audio'
      contentUrl: data.contentUrl || '',
      fileSize: data.fileSize || 0,
      duration: data.duration || 0, // in minutes
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.data.push(lesson);
    return lesson;
  }

  async countDocuments(query = {}) {
    const res = await this.find(query);
    return res.length;
  }
}

module.exports = new LessonModel();
