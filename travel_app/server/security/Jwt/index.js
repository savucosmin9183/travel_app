const jwt = require('jsonwebtoken');

const {
    ServerError
} = require('../../Errors');


const options = {
    issuer: process.env.JWT_ISSUER,
    subject: process.env.JWT_SUBJECT,
    audience: process.env.JWT_AUDIENCE
};

const generateToken = async (payload) => {
   try {
       const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
       return token;
   } catch (err) {
       console.trace(err);
       throw new ServerError("Eroare la codificarea tokenului!", 500);
   }
};

const verifyAndDecodeData = async (token) => {
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY, options);
        return decoded;
    } catch (err) {
        console.trace(err);
        throw new ServerError("Eroare la decodificarea tokenului!", 500);
    }
};

const authorizeAndExtractToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw new ServerError('Lipseste headerul de autorizare!', 403);
        }
        const token = req.headers.authorization.split(" ")[1];

        const decoded = await verifyAndDecodeData(token);
        req.state = {
            decoded
        };

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    generateToken,
    authorizeAndExtractToken
};