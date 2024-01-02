const db = require("../models");
const Member = db.member;

// Create a new member
exports.create = async (req, res) => {
    try {
        const newMember = await Member.create(req.body);
        res.status(201).json(newMember);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all members
exports.findAll = async (req, res) => {
    try {
        const members = await Member.findAll();
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific member by ID
exports.findOne = async (req, res) => {
    const { id } = req.params;
    try {
        const member = await Member.findByPk(id);
        if (member) {
            res.json(member);
        } else {
            res.status(404).json({ message: 'Member not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a member by ID
exports.update = async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Member.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedMember = await Member.findByPk(id);
            res.json(updatedMember);
        } else {
            res.status(404).json({ message: 'Member not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a member by ID
exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Member.destroy({
            where: { id: id }
        });
        if (deleted) {
            res.json({ message: 'Member deleted' });
        } else {
            res.status(404).json({ message: 'Member not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};