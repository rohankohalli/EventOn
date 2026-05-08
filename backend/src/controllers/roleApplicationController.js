import { RoleApplications, Users } from "../models/Associations.js";

// @desc    Apply for a new role
// @route   POST /api/applications
// @access  Private (User only)
export const applyForRole = async (req, res) => {
    try {
        const { requestedRole, businessName, details } = req.body;
        const userId = req.user.id;

        if (!requestedRole || !businessName || !details) {
            return res.status(400).json({ success: false, message: "Please provide all required fields" });
        }

        if (requestedRole !== "Organizer" && requestedRole !== "VenueOwner") {
            return res.status(400).json({ success: false, message: "Invalid role requested" });
        }

        // Check if user already has this role
        const user = await Users.findByPk(userId);
        if (user.role === requestedRole) {
            return res.status(400).json({ success: false, message: `You are already a(n) ${requestedRole}` });
        }

        // Check if there's already a pending application
        const existingApp = await RoleApplications.findOne({
            where: { userId, status: "Pending" }
        });

        if (existingApp) {
            return res.status(400).json({ success: false, message: "You already have a pending application" });
        }

        const application = await RoleApplications.create({
            userId,
            requestedRole,
            businessName,
            details,
            status: "Pending"
        });

        res.status(201).json({ success: true, application });
    } catch (error) {
        console.error("Error applying for role:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// @desc    Get all role applications
// @route   GET /api/applications
// @access  Private (Admin only)
export const getAllApplications = async (req, res) => {
    try {
        const applications = await RoleApplications.findAll({
            include: [{ model: Users, attributes: ["id", "name", "email", "role"] }],
            order: [["createdAt", "DESC"]]
        });

        res.status(200).json({ success: true, applications });
    } catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// @desc    Get my application status
// @route   GET /api/applications/me
// @access  Private
export const getMyApplication = async (req, res) => {
    try {
        const application = await RoleApplications.findOne({
            where: { userId: req.user.id },
            order: [["createdAt", "DESC"]]
        });

        res.status(200).json({ success: true, application });
    } catch (error) {
        console.error("Error fetching my application:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// @desc    Approve application
// @route   PUT /api/applications/:id/approve
// @access  Private (Admin only)
export const approveApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await RoleApplications.findByPk(id);

        if (!application) {
            return res.status(404).json({ success: false, message: "Application not found" });
        }

        if (application.status !== "Pending") {
            return res.status(400).json({ success: false, message: `Application is already ${application.status}` });
        }

        // Update application status
        application.status = "Approved";
        await application.save();

        // Update user role
        const user = await Users.findByPk(application.userId);
        user.role = application.requestedRole;
        await user.save();

        res.status(200).json({ success: true, message: "Application approved", application });
    } catch (error) {
        console.error("Error approving application:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// @desc    Reject application
// @route   PUT /api/applications/:id/reject
// @access  Private (Admin only)
export const rejectApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await RoleApplications.findByPk(id);

        if (!application) {
            return res.status(404).json({ success: false, message: "Application not found" });
        }

        if (application.status !== "Pending") {
            return res.status(400).json({ success: false, message: `Application is already ${application.status}` });
        }

        application.status = "Rejected";
        await application.save();

        res.status(200).json({ success: true, message: "Application rejected", application });
    } catch (error) {
        console.error("Error rejecting application:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
