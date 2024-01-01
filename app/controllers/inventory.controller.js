const db = require('../models'); // Assuming your Sequelize models are in the ../models directory
const Inventory = db.inventory;

// Controller functions
exports.create = async (req, res) => {
    try {
        const { name, unit, date, description } = req.body;
        const newInventory = await Inventory.create({ name, unit, date, description });
        res.status(201).json({ inventory: newInventory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        const inventories = await Inventory.findAll();
        res.status(200).json(inventories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.findOne = async (req, res) => {
    const { id } = req.params;
    try {
        const inventory = await Inventory.findByPk(id);
        if (inventory) {
            res.status(200).json({ inventory });
        } else {
            res.status(404).json({ message: 'Inventory not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    try {
        const  updatedInventory = await Inventory.update(req.body, {
            where: { id },
            returning: true,
        });
        res.status(200).json( updatedInventory );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRowCount = await Inventory.destroy({ where: { id } });
        if (deletedRowCount > 0) {
            res.status(200).json({ message: 'Inventory deleted successfully' });
        } else {
            res.status(404).json({ message: 'Inventory not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
