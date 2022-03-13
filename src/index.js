import express from 'express';
import path from 'path';
require('dotenv').config();
import cors from 'cors';

// Initialize express
const app = express();

// Database Connection
import ConnectDB from './db/connection';

// Routes
import Login from './routes/user';
import Register from './routes/register';
import Questions from './routes/questions';
import Admin from './routes/admin';
import Moderator from './routes/moderator'
import Faculty from './routes/faculty'


// Schemas
import { UserModel } from './models/user';
import { QuestionModel } from './models/question';

// Setting Paths
const static_path = path.join(__dirname, '../public');
const templates_path = path.join(__dirname, '../templates/views');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set('view engine', 'ejs');
app.set('views', templates_path);

async function dbcall() {
  try {
    const data = await QuestionModel.find()
    // console.log(data);
    res.send(data);
  } catch (error) {

  }
}


// Home Page
app.get('/', async (req, res) => {
  res.render('home');

});




// Microservices
app.use('/login', Login);
app.use('/register', Register);
app.use('/questions',Questions);
app.use('/admin',Admin);
app.use('/moderator',Moderator);
app.use('/faculty',Faculty);


app.listen(process.env.PORT, () =>
  ConnectDB()
    .then(() => console.log('Server is up and running'))
    .catch(() =>
      console.log('Server is running , but database connection failed')
    )
);