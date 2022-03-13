import express from "express";
import { QuestionModel } from "../models/question";
import isAuth from "../isauth";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const Router = express.Router();
Router.use(cookieParser())
// Route: /questions
// Description : Rendering questions page
// params: none
// Access: Public
// Method : GET
Router.get('/',(req, res)=>{
  res.render('questions',{ questionData:{}}); 
})

// Route: /questions
// Description : Questions Input
// params: none
// Access: Public
// Method : POST

Router.get('/update:qid',async(req, res)=>{
  const {qid} = req.params;
  const questionData=await QuestionModel.findById(qid)

  console.log(questionData)

  res.render('questions',{questionData:questionData}); 
})





Router.post('/',isAuth, async(req, res)=>{
  try {
     const {subject,chapter,diff,question,option1,option2,option3,option4,correct} = req.body;
     const questions = new QuestionModel({
      question:question,
      options:[option1,option2,option3,option4],
      correct_options:[correct],
      difficulty:diff,
      subject:subject,
      chapter:chapter,
      university:"Mumbai",
      branch:"INFT",
     })
    //  console.log(questions)
     await questions.save();
     res.json({message:"Data added to the database"})
    }
    catch (error) {
     console.log(`you got a error ${error.message}`);
     res.json({"error":error.message});
  }
})



export default Router;