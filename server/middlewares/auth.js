import jwt from "jsonwebtoken";

function extractToken(req) {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}

async function restrictToLoggedInUser(req, res, next) {
    try {
        const token = extractToken(req);
        if (!token) {
            return res.status(401).json({ error: "Token is required" });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            return res.status(401).json({ error: "Invalid or expired token" });
        }

        req.user = decode.entry; 
        console.log(decode); 
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ error: "Unauthorized access" });
    }
}

export { restrictToLoggedInUser };
