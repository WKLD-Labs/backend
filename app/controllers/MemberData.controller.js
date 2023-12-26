const {memberdata: MemberData, member} = require("../models");

exports.create = async (req, res) => {
    try {
        const {name, faculty, major, entry_year, age, } = req.body;
        console.log(name, faculty, major, entry_year, age);
        const newDataMember = await MemberData.create({
            name,
            faculty,
            major,
            entry_year: new Date(date),
            age
        });
        res.status(201).json(newDataMember);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

exports.findOne = async (req, res) => {
    try {
        const {id} = req.params;
        const memberdata = await MemberData.findOne({
            where: {id: id}
        });
        if (!memberdata) {
            return res.status(404).json({ error: "Member not found!" });
        }
        res.status(200).json(memberdata);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

exports.findAll = async (req, res) => {
    try {
        const memberdata = await MemberData.findAll();
        res.status(200).json(memberdata);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

exports.update = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, faculty, major, entry_year, age} = req.body;
        const memberdata = await MemberData.findOne({
            where: {id: id}
        });
        if (!memberdata) {
            return res.status(404).json({ error: "Member not found!" });
        }
        memberdata.name = name;
        memberdata.faculty = faculty;
        memberdata.major = major;
        memberdata.entry_year = new Date(date);
        memberdata.age = age;
        await memberdata.save();
        res.status(200).json(memberdata);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

exports.delete = async (req, res) => {
    try {
        const {id} = req.params;
        const memberdata = await MemberData.findOne({
            where: {id: id}
        });
        if (!memberdata) {
            return res.status(404).json({ error: "Member not found!" });
        }
        await memberdata.destroy();
        res.status(200).json({message: "Member deleted successfully"});
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
