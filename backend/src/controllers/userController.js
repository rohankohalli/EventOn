import Users from "../models/Users.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: { exclude: ["password"] }
        })
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.id, {
            attributes: { exclude: ["password"] }
        })

        if (!user) return res.status(404).json({ message: "User not found" })

        res.json(user)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const updates = req.body

        if (req.user.role !== "Admin") {
            return res.status(403).json({ message: "Admins only" })
        }

        const targetUser = await Users.findByPk(id)
        if (!targetUser) {
            return res.status(404).json({ message: "User not found" })
        }

        if (req.user.id === targetUser.id && "role" in updates) {
            return res.status(400).json({ message: "You cannot change your own role" })
        }

        if ( targetUser.role === "Admin" && updates.role && updates.role !== "Admin") {
            const adminCount = await Users.count({ where: { role: "Admin" } })

            if (adminCount === 1) {
                return res.status(400).json({ message: "Cannot remove the last Admin." })
            }
        }

        const allowed = ["name", "email", "role", "status"]
        allowed.forEach(key => {
            if (updates[key] !== undefined) {
                targetUser[key] = updates[key]
            }
        })

        await targetUser.save()

        res.json({ message: "User updated", user: targetUser })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
}


export const deleteUser = async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.id)

        if (!user) return res.status(404).json({ message: "User not found" })

        await user.destroy()

        res.json({ message: "User deleted" })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const updatePreferences = async (req, res, next) => {
    try {
        const userId = req.user.id

        const allowed = ["theme", "sidebarPinned"]
        const updates = {}

        allowed.forEach((key) => {
            if (req.body[key] !== undefined) {
                updates[key] = req.body[key]
            }
        })

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: "No valid preferences provided" })
        }

        await Users.update(updates, {
            where: { id: userId },
        })

        const updatedUser = await Users.findByPk(userId, {
            attributes: [
                "id",
                "name",
                "email",
                "role",
                "status",
                "avatar",
                "theme",
                "sidebarPinned",
            ],
        })

        res.json({ user: updatedUser })
    } catch (error) {
        next(error)
    }
}

