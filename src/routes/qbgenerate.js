//Library
import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { QuestionModel } from "../models/question";

const Router = express.Router();


Router.get('/',async(req, res)=>{

    const data=await QuestionModel.aggregate([
     {$group:{
     "_id":"$difficulty",
     "questiondata": {
       $push: "$$ROOT"
   },count:{$sum:1}
     }
   }])
   
   
   function shuffle(array) {
     let currentIndex = array.length,  randomIndex;
     // While there remain elements to shuffle...
     while (currentIndex != 0) {
       // Pick a remaining element...
       randomIndex = Math.floor(Math.random() * currentIndex);
       currentIndex--;
       // And swap it with the current element.
       [array[currentIndex], array[randomIndex]] = [
         array[randomIndex], array[currentIndex]];
     }
     return array;
   }
   
   let mydata ={"easy":[],"medium":[],"hard":[]}
   for (let index = 0; index < data.length; index++) {
       if (data[index]._id=='easy'){
        mydata.easy.push(data[index].questiondata)
       }
       if (data[index]._id=='medium'){
        mydata.medium.push(data[index].questiondata)
       }
       if (data[index]._id=='hard'){
        mydata.hard.push(data[index].questiondata)
       }
   }
   
   let ceasy=2
   let cmedium=2
   let chard=1
   let myeasy=mydata.easy[0].slice(0,ceasy)
   let mymedium=mydata.medium[0].slice(0,cmedium)
   let myhard=mydata.hard[0].slice(0,chard)
   
   
   res.send(myeasy)
   
   });
   


export default Router;