import { NextFunction, Request, Response } from "express"
import { decodeToken } from "../tools/jwt"

export interface AuthenticatedRequest<P = {}, ResBody = any, ReqBody = any, ReqQuery = {}> extends Request<P, ResBody, ReqBody, ReqQuery> {
    user?: {
        userId: string
    }
}

export const strictToLogin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" })
    }

    const token = authHeader.split(" ")[1]
    const decoded = decodeToken(token)

    if (!decoded) {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" })
    }

    req.user = decoded.dataHolder
    next()
}
