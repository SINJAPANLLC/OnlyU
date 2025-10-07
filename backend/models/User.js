import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true }, // Firebase UID
    email: { type: String, required: true },
    displayName: { type: String },
    isBanned: { type: Boolean, default: false },
    reports: [{ reason: String, createdAt: Date }],
    lastSeen: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
