//Library
import express from "express";
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"

// models
import { UserModel } from "../models/user";

const Router = express.Router();
Router.use(cookieParser())

function isAuth (req, res, next){
  console.log("in isauth");
  const token=req.cookies.jwt
  
  if(token === null) return res.sendStatus(401);
  jwt.verify(token, 'Quesio8bit',(err,user)=>{
    if(err) return res.sendStatus(403)
    req.mytoken=token
    next()
  })
};

Router.get('/as',(req,res)=>{
    // res.json({token: req.mytoken})
    res.render('home')
})

// Route: /user/login
// Description : Rendering login page
// params: none
// Access: Public
// Method : GET
Router.get('/',(req, res)=>{
  res.render('login'); 
  
})

// Route: /user/login
// Description : Loging in user
// params: none
// Access: Public
// Method : POST
Router.post('/',async(req, res)=>{
  try {
    const user = await UserModel.findByEmailAndPassword(req.body.password,req.body.email);
    // generate jwt token
    const token = user.generateJwtToken();
    // console.log(token)
    // res.redirect('/')
   res.cookie('jwt',token)
    res.json({
      token:token
    })
  } catch (error) {
      console.log(`You got a error ${error.message}`);
      res.json({"error":error.message});
  }
})

export default Router;