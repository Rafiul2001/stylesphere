import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken";
import config from "../config/config";

export const generateToken = (dataHolder: {}): string => {
    const token = jwt.sign({
        dataHolder
    }, config.jwtPrivateKey, { expiresIn: '2s' });
    return token
}

export const decodeToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, config.jwtPrivateKey) as JwtPayload;
        console.log("Token is valid ✅");
        console.log(decoded);
        return decoded;
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            console.error("Token expired!");
        } else if (error instanceof JsonWebTokenError) {
            console.error("Invalid token!");
        } else {
            console.error("Unknown token error!", error);
        }
        return null;
    }
}
