import mongoose from "mongoose";

const identitySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    documentUrl: { type: String, required: true }, // Cloudinary link
    selfieUrl: { type: String, required: true },
    age: { type: Number },
    status: { type: String, enum: ["pending", "verified", "rejected"], default: "pending" },
    submittedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Identity", identitySchema);
