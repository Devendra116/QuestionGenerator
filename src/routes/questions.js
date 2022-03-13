import express from "express";
import { QuestionModel } from "../models/question";
import isAuth from "../isauth";
import jwt from "jsonwebtoken";
import jwt_decode from 'jwt-decode';
import cookieParser from "cookie-parser";

const Router = express.Router();
Router.use(cookieParser())
// Route: /questions
// Description : Rendering questions page
// params: none
// Access: Public
// Method : GET
Router.get('/',(req, res)=>{
  const encrypteduserdata= req.cookies.jwt;
  const userdata=jwt_decode(encrypteduserdata)
console.log(userdata.user)

  res.render('questions'); 
})

// Route: /questions
// Description : Questions Input
// params: none
// Access: Public
// Method : POST

Router.get('/update:qid',async(req, res)=>{
  const {qid} = req.params;
  const questionData=await QuestionModel.findById(qid)


  res.render('questionUpdate',{questionData:questionData,qid:qid}); 
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


// Route: /question/update:qid
// Description : Update Questions
// params: qid
// Access: Public
// Method : POST

Router.post('/update:qid',isAuth, async(req, res)=>{
  try {
     const qid = req.params.qid;
     const {subject,chapter,diff,question,option1,option2,option3,option4,correct} = req.body;
     const questions = await QuestionModel.findByIdAndUpdate(qid,{
      $set:{
      question:question,
      options:[option1,option2,option3,option4],
      correct_options:[correct],
      difficulty:diff,
      subject:subject,
      chapter:chapter,
      university:"Mumbai",
      branch:"INFT",
     }})
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