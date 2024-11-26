import userSchema from "./models/user.model.js"
import profileSchema from './models/profile.model.js'
import postSchema from './models/post.model.js'
import bcrypt from "bcrypt"
import pkg from "jsonwebtoken"
import nodemailer from "nodemailer"
const {sign}=pkg
const transporter = nodemailer.createTransport({
    service:"gmail",
     auth: {
       user: "arjunk80043@gmail.com",
       pass: "uukl gaea htbv yiqd",
     },
   });
   export async function profile(req,res){
    try{
        console.log("fdf");
        
            const _id=req.user.userId;
            const user=await userSchema.findOne({_id});
            console.log(user);
            
            if(!user){
                return res.status(403).send({msg:"Unauthorized Access"})
            }
            const profile=await profileSchema.findOne({userId:_id})
            res.status(200).send({username:user.username,profile})
        }catch(error){
            res.status(404).send({msg:"error"})
        }
   }

export async function home(req,res){
    try{
    console.log(req.user.userId);
    const _id=req.user.userId
    const user=await userSchema.findOne({_id});
    console.log(user);
    if(!user)
        return res.status(403).send({msg:"Unauthorized access"})
    res.status(200).send({username:user.username})
    }catch(error){
        res.status(404).send({msg:error})
    }
}
export async function editUser(req,res){
    try{
        console.log("edd");
    const {...user}=req.body;
    
    const id=req.user.userId;
    const check=await profileSchema.findOne({userId:id})
    console.log(check);
    
    if(check){
        const data=await profileSchema.updateOne({userId:user.userId},{$set:{...user}})
    } else{
        console.log(id);
        const data=await profileSchema.create({userId:id,...user})
    }
    res.status(201).send({msg:"updated"})
    }  catch(error){
        res.status(404).send({msg:"error"})
    } 
}
export async function verifyEmail(req,res) {
    const {email}=req.body;
    console.log(email);
    
    const otp=Math.floor(Math.random()*1000000);
     // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Arjun', // sender address
        to: `${email}`, // list of receivers
        subject: "OTP", // Subject line
        text: "your otp", // plain text body
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #4CAF50;
            font-size: 24px;
            margin-bottom: 20px;
        }
        p {
            font-size: 16px;
            line-height: 1.5;
            color: #555;
        }
        .button {
            display: inline-block;
            padding: 15px 30px;
            font-size: 16px;
            background-color: #4CAF50;
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
            text-align: center;
            margin-top: 20px;
        }
        .button:hover {
            background-color: #45a049;
        }
        .footer {
            font-size: 12px;
            color: #aaa;
            text-align: center;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Email Verification</h1>
        <p>Hi there,</p>
        <p>Thank you for signing up! Please verify your email address by clicking the button below:</p>
        
        <!-- Replace this link with the actual verification URL -->
        <a href="http://localhost:5173/register" class="button">Verify Email</a>

        <p>If you did not sign up for an account, you can ignore this email.</p>
        
        <div class="footer">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`, // html body
    });
    // console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    userSchema.create({email}).then(()=>{
        console.log(otp);
        return res.status(201).send({msg:"OTP succefully sent",email});
    }).catch((error)=>{
        return res.status(404).send({msg:"Error occured"})
    })
}


export async function signUp(req,res) {
    try {
        const {email,username,password,cpassword}=req.body;
        console.log(email,username,password,cpassword);
        if(!(email&&username&&password&&cpassword))
            return res.status(404).send({msg:"fields are empty"});
        if(password!==cpassword)
            return res.status(404).send({msg:"password not matched"})
        bcrypt.hash(password,10).then((hashedPassword)=>{
            console.log(hashedPassword);
            userSchema.updateOne({email},{$set:{otp:"",username,password:hashedPassword}}).then(()=>{
                return res.status(201).send({msg:"success"});
            }).catch((error)=>{
                return res.status(404).send({msg:"Not registered"})
            })
        }).catch((error)=>{
            return res.status(404).send({msg:error}); 
        })

    } catch (error) {
        return res.status(404).send({msg:error});
    }
}

export async function signIn(req,res) {

        console.log(req.body);
    const {email,password}=req.body;
    if(!(email&&password))
        return res.status(404).send({msg:"fields are empty"})
    const user=await userSchema.findOne({email})
    console.log(user);
    if(user===null)
        return res.status(404).send({msg:"invalid email"})

    //convert to hash and compare using bcrypt
    const success=await bcrypt.compare(password,user.password);
    console.log(success);
    if(success!==true)
        return res.status(404).send({msg:"email or password is invalid"})
    //generate token using sign(JWT key)
    const token=await sign({userId:user._id},process.env.JWT_KEY,{expiresIn:"24h"});
    console.log(token);
    return res.status(200).send({msg:"Succefully logged in",token})
    
}
export async function addPost(req,res) {
    try {
    const {...post}=req.body;
   console.log(post);
    const data=await postSchema.create({...post});
    res.status(201).send({msg:"Post Added"});
    } catch (error) {
        res.status(404).send({msg:"error"})
    }
}
export async function getPost(req,res) {
    try {
        const id=req.user.userId;
        const post=await postSchema.find({userId:id});
    res.status(200).send(post);
    } catch (error) {
        res.status(404).send({msg:"error"})
    }
}