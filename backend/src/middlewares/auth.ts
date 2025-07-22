import { NextFunction, Request, Response } from "express"
import { decodeToken } from "../tools/jwt"

export const strictToLogin = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" })
    }

    const token = authHeader.split(" ")[1]
    const decoded = decodeToken(token)

    if (!decoded) {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" })
    }

    // Safely attach decoded data to req.body (or better, extend the Request interface)
    req.body.decoded = decoded
    next()
}
