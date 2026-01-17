// backend/utils/mockMongoose.js
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

class MockDoc {
    constructor(data, model) {
        Object.assign(this, data);
        this._id = this._id || generateId();
        this.createdAt = this.createdAt || new Date();
        this.updatedAt = new Date();
        // Make _model non-enumerable to prevent circular JSON error
        Object.defineProperty(this, '_model', {
            value: model,
            enumerable: false,
            writable: true,
            configurable: true
        });
    }

    async save() {
        const existingIndex = this._model.data.findIndex(d => d._id === this._id);
        if (existingIndex >= 0) {
            this._model.data[existingIndex] = this;
            // console.log(`[MockDB] Updated ${this._model.name}:`, this._id);
        } else {
            this._model.data.push(this);
            // console.log(`[MockDB] Created ${this._model.name}:`, this._id);
        }
        return this;
    }
}

class MockModel {
    constructor(name) {
        this.name = name;
        this.data = [];
    }

    async find(query = {}) {
        const results = this.data.filter(item => {
            for (let key in query) {
                if (item[key] != query[key]) return false;
            }
            return true;
        }).sort((a, b) => b.createdAt - a.createdAt);
        return results;
    }

    async findOne(query = {}) {
        const res = await this.find(query);
        return res[0] || null;
    }

    async findById(id) {
        return this.data.find(d => d._id === id) || null;
    }

    async create(data) {
        const doc = new MockDoc(data, this);
        await doc.save();
        return doc;
    }

    async countDocuments(query = {}) {
        const res = await this.find(query);
        return res.length;
    }

    async findByIdAndUpdate(id, update, options) {
        const doc = await this.findById(id);
        if (!doc) return null;

        // Handle $push
        if (update.$push) {
            for (const key in update.$push) {
                if (!doc[key]) doc[key] = [];
                doc[key].push(update.$push[key]);
            }
        }
        // Handle $pull
        if (update.$pull) {
            for (const key in update.$pull) {
                if (doc[key]) {
                    doc[key] = doc[key].filter(item => item !== update.$pull[key]);
                }
            }
        }
        // Simple assign
        Object.keys(update).forEach(key => {
            if (key !== '$push' && key !== '$pull') {
                doc[key] = update[key];
            }
        });

        doc.updatedAt = new Date();
        return doc;
    }

    async findByIdAndDelete(id) {
        const idx = this.data.findIndex(d => d._id === id);
        if (idx === -1) return null;
        const deleted = this.data[idx];
        this.data.splice(idx, 1);
        return deleted;
    }

    // For compatibility
    select() { return this; }
    sort() { return this; }
}

const db = {
    User: new MockModel('User'),
    Class: new MockModel('Class'),
    Subject: new MockModel('Subject'),
    Lesson: new MockModel('Lesson'),
    Assignment: new MockModel('Assignment'),
    Attendance: new MockModel('Attendance')
};

// --- DATA SEEDING ---
const seedData = async () => {
    console.log('[MockDB] Seeding database...');

    // 1. Create Classes
    const classesList = [
        { name: 'Nursery', section: 'A', stream: 'General' },
        { name: 'LKG', section: 'A', stream: 'General' },
        { name: 'UKG', section: 'A', stream: 'General' },
        ...Array.from({ length: 10 }, (_, i) => ({ name: `Class ${i + 1}`, section: 'A', stream: 'General' })),
        { name: 'Class 11', section: 'A', stream: 'Science' },
        { name: 'Class 11', section: 'B', stream: 'Commerce' },
        { name: 'Class 11', section: 'C', stream: 'Arts' },
        { name: 'Class 12', section: 'A', stream: 'Science' },
        { name: 'Class 12', section: 'B', stream: 'Commerce' },
        { name: 'Class 12', section: 'C', stream: 'Arts' },
    ];

    for (const c of classesList) {
        const newClass = await db.Class.create({ ...c, subjects: [] });

        // 2. Create Subjects for each class
        let subjectsForClass = [];
        if (['Nursery', 'LKG', 'UKG'].includes(c.name)) {
            subjectsForClass = ['English', 'Hindi', 'Numbers', 'Rhymes', 'Drawing'];
        } else if (c.stream === 'Science') {
            subjectsForClass = ['Physics', 'Chemistry', 'Mathematics', 'English', 'Biology'];
        } else if (c.stream === 'Commerce') {
            subjectsForClass = ['Accountancy', 'Economics', 'Business Studies', 'English', 'Mathematics'];
        } else if (c.stream === 'Arts') {
            subjectsForClass = ['History', 'Political Science', 'Geography', 'English', 'Hindi'];
        } else {
            // General 1-10
            subjectsForClass = ['Mathematics', 'Science', 'Social Studies', 'English', 'Hindi', 'Punjabi'];
        }

        for (const subName of subjectsForClass) {
            const subject = await db.Subject.create({
                name: subName,
                classId: newClass._id,
                teacherId: 'placeholder_teacher'
            });
            newClass.subjects.push(subject._id);

            // 3. Create Sample Topics (Lessons) for each subject
            const topicBase = subName === 'Mathematics' ? ['Algebra Basics', 'Geometry Ops'] :
                subName === 'Science' ? ['Living vs Non-living', 'Solar System'] :
                    subName === 'English' ? ['Grammar', 'Reading Comprehension'] :
                        ['Introduction', 'Chapter 1'];

            for (const title of topicBase) {
                await db.Lesson.create({
                    title: `${title} - ${c.name}`,
                    description: `Learn about ${title} in ${subName}`,
                    subjectId: subject._id,
                    contentType: 'text',
                    contentUrl: '',
                    duration: 30
                });
            }
        }
    }
    console.log('[MockDB] Seeding complete. Total Classes:', db.Class.data.length);
};

seedData(); // Run seeding on init

module.exports = db;
