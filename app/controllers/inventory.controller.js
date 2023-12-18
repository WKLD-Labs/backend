const fs = require('fs');
const db = require('../models');
const inventory =  db.inventory;

exports.create = async (req, res) => {
    try {
        const { name, unit, date, picture, description } = req.body;
        const newInventoryItem = await inventory.create({
            name,
            unit,
            date,
            picture,
            description,
        });
        res.status(201).json(newInventoryItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        const inventoryItems = await inventory.findAll();
        res.status(200).json(inventoryItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

