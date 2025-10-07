import Identity from "../models/Identity.js";

// GET all identity requests
export const getIdentities = async (req, res) => {
    try {
        const identities = await Identity.find().populate("userId", "email displayName");
        res.json(identities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Approve / Reject KYC
export const updateIdentityStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await Identity.findByIdAndUpdate(id, { status });
        res.json({ message: `Identity ${status}` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
