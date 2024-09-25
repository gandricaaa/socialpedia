import jwt from 'jsonwebtoken'
export const verifyToken = async (req,res, next) =>{
    try{    
        let token = req.header("Authorization")
        if (!token){
            return res.status(403).send("Acces Denied")
        }
        if(token.startWith("Bearer")){
            token = token.slice(7, token.length).trimLeft();
        }
        const verifed = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verifed;
        next();
    }catch(err) {
        res.status(500).json({error: err.message})
    }
}