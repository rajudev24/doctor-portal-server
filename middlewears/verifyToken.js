import admin from 'firebase-admin';


import serviceAccount from'./doctors-portal-firebase-adminsdk.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


//JWT Token
export const verifyToken= async(req, res, next) =>{
    if (req.headers?.authorization?.startsWith('Bearer ')) {
        const token = req.headers.authorization.split(' ')[1];

        try {
            const decodedUser = await admin.auth().verifyIdToken(token);
            req.decodedEmail = decodedUser.email;
        }
        catch {

        }
    }
    next();
}
