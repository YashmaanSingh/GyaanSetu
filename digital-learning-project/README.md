# GyaanSetu - Digital Learning Platform

A comprehensive digital learning platform designed to bridge the rural-urban digital divide in Nabha, Punjab. This project provides offline-capable lessons, multi-language support, and role-based access for students, teachers, and administrators.

## 🚨 Issues Found and Status

### Critical Issues
1. **Missing Environment Variables**: No `.env` file found in backend
2. **Database Connection Issues**: Backend expects MongoDB but no connection string provided
3. **Inconsistent Project Structure**: Duplicate nested directories
4. **Missing Dependencies**: Some packages may have version conflicts

### Medium Priority Issues
1. **Incomplete Backend Integration**: Frontend uses mock API instead of real backend
2. **Missing Authentication Flow**: Backend auth routes not connected to frontend
3. **Incomplete Error Handling**: Limited error handling in API calls
4. **Missing Documentation**: Limited inline documentation

### Low Priority Issues
1. **Code Formatting**: Some inconsistent formatting
2. **Missing Tests**: No test files found
3. **Missing CI/CD**: No deployment configuration

## 🏗️ Project Structure

```
digital-learning-project/
├── backend/                    # Node.js/Express backend
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT authentication
│   ├── models/                # Mongoose models
│   │   ├── User.js
│   │   ├── Lesson.js
│   │   ├── Assignment.js
│   │   ├── Attendance.js
│   │   ├── Progress.js
│   │   ├── Quiz.js
│   │   ├── Resource.js
│   │   ├── Student.js
│   │   └── Announcement.js
│   ├── routes/                # API routes
│   │   ├── auth.js
│   │   ├── lessons.js
│   │   ├── assignments.js
│   │   ├── attendance.js
│   │   ├── progress.js
│   │   ├── quizzes.js
│   │   ├── resources.js
│   │   ├── students.js
│   │   ├── users.js
│   │   └── announcements.js
│   ├── server.js              # Main server file
│   ├── .env                   # Environment variables
│   └── package.json
└── frontend/                   # React frontend
    ├── src/
    │   ├── components/         # React components
    │   │   ├── Login.js
    │   │   ├── Navbar.js
    │   │   ├── SignUp.js
    │   │   └── Splash.js
    │   ├── pages/              # Page components
    │   │   ├── Home.js
    │   │   ├── Student.js
    │   │   ├── Teacher.js
    │   │   ├── Admin.js
    │   │   ├── About.js
    │   │   ├── Announcements.js
    │   │   ├── Assignments.js
    │   │   ├── Attendance.js
    │   │   ├── Downloads.js
    │   │   └── TakeQuiz.js
    │   ├── services/
    │   │   └── api.js          # API service layer
    │   ├── utils/
    │   │   └── languageData.js # Multi-language support
    │   ├── App.js              # Main app component
    │   └── index.js            # App entry point
    ├── public/
    │   └── index.html
    ├── config-overrides.js     # Webpack configuration
    ├── tailwind.config.js      # Tailwind CSS config
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment variables:**
   The `.env` file already exists. Review and update if needed:
   ```env
   MONGO_URI=mongodb://localhost:27017/gyaansetu
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the backend server:**
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # If you encounter dependency errors, try:
   npm install --legacy-peer-deps
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🔧 Configuration

### Backend Configuration

The backend requires the following environment variables:

```env
MONGO_URI=mongodb://localhost:27017/gyaansetu
JWT_SECRET=your_secure_jwt_secret
PORT=5000
NODE_ENV=development
```

### Frontend Configuration

The frontend uses:
- React 18 with hooks
- Tailwind CSS for styling
- React Router for navigation
- Recharts for data visualization
- Webpack overrides for Node.js polyfills

## 🎯 Features

### Student Features
- **Offline Learning**: Download lessons for offline access
- **Progress Tracking**: Visual progress charts and analytics
- **Multi-language Support**: English, Hindi, and Punjabi
- **Assignment Submission**: Complete and submit assignments
- **Quiz Taking**: Interactive quizzes with immediate feedback

### Teacher Features
- **Lesson Management**: Create and upload lessons
- **Assignment Creation**: Design assignments and quizzes
- **Attendance Tracking**: Mark and track student attendance
- **Progress Monitoring**: View student progress and analytics
- **Resource Management**: Upload and manage educational resources

### Admin Features
- **User Management**: Add and manage students, teachers
- **System Administration**: Manage roles and permissions
- **Announcement System**: Create and broadcast announcements
- **Data Export**: Export student data and reports
- **System Monitoring**: Monitor platform usage and performance

## 🌐 Multi-language Support

The platform supports three languages:
- **English** (en)
- **Hindi** (हिन्दी)
- **Punjabi** (ਪੰਜਾਬੀ)

Language switching is available throughout the application interface.

## 🎨 UI/UX Features

- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Offline-First**: Optimized for low connectivity areas
- **Accessibility**: Designed for users with varying technical skills
- **Progressive Web App**: Can be installed on devices

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Different access levels for users
- **Password Hashing**: Secure password storage with bcrypt
- **CORS Protection**: Configured for secure cross-origin requests

## 📊 Technology Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing

### Frontend
- **React 18**: UI library
- **Tailwind CSS**: Styling framework
- **React Router**: Navigation
- **Recharts**: Data visualization
- **Axios**: HTTP client (implied)

## 🚨 Known Issues

1. **Environment Variables**: Backend requires `.env` file setup
2. **Database Connection**: MongoDB connection string needed
3. **API Integration**: Frontend uses mock data instead of real API
4. **Authentication Flow**: Backend auth not connected to frontend
5. **Error Handling**: Limited error handling in API calls
6. **Testing**: No test files present
7. **Documentation**: Limited inline code documentation

## 🔧 Troubleshooting

### Common Issues

1. **Dependency Installation Errors:**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **MongoDB Connection Issues:**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify database permissions

3. **Port Conflicts:**
   - Backend runs on port 5000
   - Frontend runs on port 3000
   - Change ports in configuration if needed

4. **CORS Issues:**
   - Backend CORS is configured for localhost:3000
   - Update CORS settings for production

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB database (local or cloud)
2. Configure environment variables
3. Deploy to cloud platform (Heroku, AWS, etc.)
4. Set up SSL certificates

### Frontend Deployment
1. Build the production bundle:
   ```bash
   npm run build
   ```
2. Deploy to static hosting (Netlify, Vercel, etc.)
3. Configure API endpoints for production

## 📝 Development Guidelines

### Code Style
- Use consistent indentation (2 spaces)
- Follow JavaScript/React best practices
- Add comments for complex logic
- Use meaningful variable names

### Git Workflow
- Create feature branches for new features
- Use descriptive commit messages
- Test changes before committing
- Keep commits atomic and focused

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🎯 Future Enhancements

- [ ] Real-time notifications
- [ ] Video lesson support
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Integration with school management systems
- [ ] Offline sync capabilities
- [ ] Advanced quiz features
- [ ] Parent portal access

---

**Note**: This project is designed specifically for the rural education context in Nabha, Punjab, with a focus on offline-first learning and multi-language support.
