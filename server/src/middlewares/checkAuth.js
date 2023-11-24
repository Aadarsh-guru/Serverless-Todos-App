import jwt from "jsonwebtoken";

const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization || "";
        if (!token) {
            return res.status(400).json({
                message: 'Please provide a valid token to continue.',
                success: false
            });
        }
        try {
            const { id } = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = id;
            return next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({
                    message: 'Token has expired. Please log in again.',
                    success: false
                });
            } else {
                throw error; // Rethrow other errors for general error handling
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Error in check auth middleware.',
            success: false,
            error: error.message
        });
    };
};

export default checkAuth;
