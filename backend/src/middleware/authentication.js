import jwt from "jsonwebtoken"

export const authenticateToken = (req, res, next) => {
    const header = req.headers.authorization
    if (!header?.startsWith("Bearer "))
        return res.status(401).json({ message: "Missing or Invalid Authorization Header" })

    const token = header.split(" ")[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        req.user = decoded
        next()
    } catch {
        res.status(401).json({ message: "Access Token Invalid or Expired" })
    }
}

export const requireRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied — insufficient permissions" })
        }
        next()
    }
}
