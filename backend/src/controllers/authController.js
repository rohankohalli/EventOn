import Users from "../models/Users.js"
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const register = async (req, res, next) => {
    const AVATARS = ["avatar_1", "avatar_2", "avatar_3", "avatar_4"]
    const randomAvatar = AVATARS[Math.floor(Math.random() * AVATARS.length)]

    try {
        const { name, email, dateOfBirth, mobileNo, password, role } = req.body;
        const existing = await Users.findOne({ where: { email } })
        if (existing) return res.status(400).json({ message: "Email already in use" })

        const hashed = await bcrypt.hash(password, 10);
        const user = await Users.create({
            name,
            email,
            dateOfBirth,
            mobileNo,
            password: hashed,
            role: role || "User",
            status: "Active",
            avatar: randomAvatar
        })

        res.status(201).json({
            message: "User registered successfully",
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
        });
    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await Users.findOne({ where: { email } })
        if (!user) return res.status(404).json({ message: "User Not Found" })

        if (user.status === "Banned") return res.status(403).json({ message: "User Invalid" })

        const passwordCheck = await bcrypt.compare(password, user.password)

        if (!passwordCheck) return res.status(401).json({ message: "Invalid Password" })

        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        await user.update({ refreshToken })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 7 * 24 * 3600 * 1000,
            path: "/",
            secure: false
        })

        res.json({
            message: "Login Successfull",
            accessToken,
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
        })

    } catch (error) {
        next(error)
    }
}

export const logout = async (req, res) => {
    try {
        let userId = null;

        if (req.user?.id) {
            userId = req.user.id;
        }

        else if (req.cookies.refreshToken) {
            const decoded = jwt.decode(req.cookies.refreshToken);
            userId = decoded?.id;
        }

        if (userId) {
            await Users.update({ refreshToken: null }, { where: { id: userId } });
        }

        res.clearCookie("refreshToken", {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            path: "/",
        });

        return res.json({ message: "Logged out successfully" });

    } catch (err) {
        return res.status(500).json({ message: "Logout failed" });
    }
};

export const refreshAccessToken = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
        return res.status(401).json({ message: "No Refresh Token provided" });

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const user = await Users.findByPk(decoded.id);
        if (!user) return res.status(404).json({ message: "User Not Found" });

        if (user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: "Refresh Token Reused" })
        }
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        await user.update({ refreshToken: newRefreshToken });

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 7 * 24 * 3600 * 1000,
            path: "/",
            secure: false
        })
        res.json({ accessToken: newAccessToken })
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(403).json({ message: "Refresh token expired" });
        }
        res.status(401).json({ message: "Invalid refresh token" });
    }
}

export const user = async (req, res, next) => {
    try {
        const user = await Users.findByPk(req.user.id, {
            attributes: ["id", "name", "email", "mobileNo", "dateOfBirth", "role", "status", "avatar", "theme",
                "sidebarPinned"],
        });

        if (!user) return res.status(404).json({ message: "User Not Found" });

        res.json({ user });
    } catch (error) {
        next(error)
    }
}

export const requestPasswordReset = async (req, res, next) => {
    try {
        const { email } = req.body

        const user = await Users.findOne({ where: { email } })
        if (!user) return res.status(404).json({ message: "If the email exists, a reset link has been sent" })

        const token = crypto.randomBytes(32).toString('hex')
        await user.update({ resetToken: token, resetTokenExpiresAt: new Date(Date.now() + 15 * 60 * 1000) })

        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

        // console.log("Reset Token:", token)
        console.log("Reset Link:", resetLink)

        res.json({ token, message: "Password reset link sent" })
    } catch (error) {
        next(error)
    }
}

export const confirmPasswordReset = async (req, res, next) => {
    try {
        const { token, newPassword } = req.body;

        const user = await Users.findOne({ where: { resetToken: token, resetTokenExpiresAt: { [Op.gt]: new Date() } } })

        if (!user) return res.status(400).json({ message: "Invalid or expired token" })

        const hashed = await bcrypt.hash(newPassword, 10)

        await user.update({ password: hashed, resetToken: null, resetTokenExpiresAt: null })

        res.json({ message: "Password updated" })

    } catch (err) {
        next(err)
    }
}
