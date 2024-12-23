import pkg from "jsonwebtoken";
const {verify}=pkg;
export default async function Auth(req,res,next) {
    try {
        
        console.log(req.headers.authorization);
        const key=req.headers.authorization;
        
        if(!key)
            return res.status(403).send({msg:"Unauthorized access"});
        console.log("auth");
        const token=key.split(" ")[1];
        const auth=await verify(token,process.env.JWT_KEY);
        console.log(auth);
        req.user=auth;
        next();
    } catch (error) {
        return res.status(403).send({msg:"session expired please log in again"});
    }
}