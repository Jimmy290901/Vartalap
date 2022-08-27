import admin from "./config/firebase.js";

async function verifyUser(req,res,next) {
    const token = req.headers.authorization.split(' ')[1];
    
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (decodedToken) {
            return next();
        } else {
            return res.json({
                message: "Un-authorized user",
            });
        }
    } catch(err) {
        console.log(err);
        return res.json({
            message: "Internal Error",
        });
    }
}

export {verifyUser};