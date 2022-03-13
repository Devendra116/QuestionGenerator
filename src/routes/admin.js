//Library
import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

// models
import { AdminModel } from "../models/admin";
import { QuestionModel } from "../models/question";
import { CollegeModel} from '../models/college'
import { UserModel} from '../models/user'
import { SubjectModel} from '../models/subject'

// Authorisation
import isAuth from "../isauth";

const Router = express.Router();
Router.use(cookieParser())



Router.get('/',async(req,res)=>{
    const total_ques= await QuestionModel.find().count()
    const approved_question= await QuestionModel.find({isValid:{'$eq':true}}).count()
    const total_college= await CollegeModel.find().count()
    const total_faculty= await UserModel.find({isVarified:{'$eq':true}}).count()
    const total_moderator= await UserModel.find({isExpert:{'$eq':true}}).count()
    const total_subject= await SubjectModel.find().count()
    

   const total_chapter=await SubjectModel.aggregate([{$project:{chapter:1}}])
   const chapters=total_chapter.map(elem=>{
       return elem.chapter
   })
   const totalchapter=[ ... new Set([].concat.apply([],chapters))].length

   const total_branch=await CollegeModel.aggregate([{$project:{branch:1}}])
   const branches=total_branch.map(elem=>{
       return elem.branch
   })
   const totalbranch=[ ... new Set([].concat.apply([],branches))].length

   



    res.render('adminDashboard',{total_ques:total_ques,approved_question:approved_question,
        total_college:total_college,total_faculty:total_faculty,total_moderator:total_moderator,
        total_subject:total_subject,totalchapter:totalchapter,totalbranch:totalbranch })
})


Router.get('/college',async(req,res)=>{
    const collegedata= await CollegeModel.find()

    res.render('adminCollege',{collegedata:collegedata})
})


Router.get('/faculty',(req,res)=>{
    res.render('adminFaculty')
})


Router.get('/questions',async(req,res)=>{
    const questiondata= await QuestionModel.find()
    res.render('adminQuestions',{questiondata:questiondata})
})


Router.get('/moderator',(req,res)=>{
    res.render('adminModerator')
})


export default Router;