import jwt from 'jsonwebtoken';


const authenticateToken = (req, res, next) => {
    try{
        let token = req.cookies.token;

        // If token not in cookies, check Authorization header
        if (!token) {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7); // Remove 'Bearer ' prefix
            }
        }

        if(!token){
            return res.status(403).json({ message: "No token provided",
                success: false
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(403).json({ message: "Invalid token",
                success: false
            });
        }
        req.id = decoded.userId;
        next();

    } catch(error){
        return res.status(401).json({ message: "Invalid token", });
    }
};

export default authenticateToken;