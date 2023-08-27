const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = 5000;
// const authMiddleware = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const { authenticateJWT } = require('./middleware/authMiddleware');


// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@cluster0.sot12ey.mongodb.net/exercise-db?retryWrites=true&w=majority`;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
   //populateDatabase();
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Routes
const coursesRoute = require('./routes/courses');
const chaptersRoute = require('./routes/chapters');
const exercisesRoute = require('./routes/exercises');

app.use('/', coursesRoute);
app.use('/chapters', chaptersRoute);
app.use('/exercises', exercisesRoute);

app.use('/api/auth', authRoutes);
// app.use('/api/protected', authenticateJWT, protectedRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const populateDatabase = async () => {
    const Course = require('./models/Course'); // Adjust the path based on your project structure
  
    const demoData = [
        {
          title: 'Course 1',
          chapters: [
            {
              title: 'Chapter 1',
              exercises: [
                {
                  question: 'Question 1',
                  choices: ['Choice A', 'Choice B', 'Choice C'],
                  correctAnswerIndex: 1
                },
                {
                    question: 'Question 2',
                    choices: ['Choice A', 'Choice B', 'Choice C'],
                    correctAnswerIndex: 2
                  }
                // Add more exercises here
              ]
            },
            {
                title: 'Chapter 2',
                exercises: [
                  {
                    question: 'Question 1',
                    choices: ['Choice A', 'Choice B', 'Choice C'],
                    correctAnswerIndex: 1
                  },
                  {
                      question: 'Question 2',
                      choices: ['Choice A', 'Choice B', 'Choice C'],
                      correctAnswerIndex: 2
                  }
                  // Add more exercises here
                ]
              }
            // Add more chapters here
          ]
        },
        {
            title: 'Course 2',
            chapters: [
              {
                title: 'Chapter 1',
                exercises: [
                  {
                    question: 'Question 1',
                    choices: ['Choice A', 'Choice B', 'Choice C'],
                    correctAnswerIndex: 1
                  },
                  {
                      question: 'Question 2',
                      choices: ['Choice A', 'Choice B', 'Choice C'],
                      correctAnswerIndex: 2
                    }
                  // Add more exercises here
                ]
              },
              {
                  title: 'Chapter 2',
                  exercises: [
                    {
                      question: 'Question 1',
                      choices: ['Choice A', 'Choice B', 'Choice C'],
                      correctAnswerIndex: 1
                    },
                    {
                        question: 'Question 2',
                        choices: ['Choice A', 'Choice B', 'Choice C'],
                        correctAnswerIndex: 2
                    }
                    // Add more exercises here
                  ]
                }
              // Add more chapters here
            ]
          }
        // Add more courses here
      ];
  
    try {
      const savedCourse = await Course.create(demoData);
      console.log('Demo data inserted:', savedCourse);
    } catch (error) {
      console.error('Error inserting demo data:', error);
    } finally {
      mongoose.connection.close();
    }
};