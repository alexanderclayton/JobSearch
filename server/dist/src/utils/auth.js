import jwt from "jsonwebtoken";
import "dotenv/config";
const JWT_SECRET = process.env.JWT_SECRET;
export const generateToken = (user) => {
    if (JWT_SECRET) {
        return jwt.sign(user.toObject(), JWT_SECRET, { expiresIn: "1h" });
    }
};
