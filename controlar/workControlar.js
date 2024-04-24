


const Work = require('../models/work');
const Workcard = require("../models/workcard")

exports.CreateWorkTop = async (req, res) => {
    const { title, subtitle, subtitle1 } = req.body;
    try {
        const work = new Work({
            title,
            subtitle,
            subtitle1
        });
        await work.save();
        return res.status(201).json({ message: 'Work added successfully' });
    } catch (error) {
        console.error('Error adding Work Top:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.CreateWorkCard = async (req, res) => {
    const { title, subtitle, subtitle1, subtitle2, image } = req.body;
    try {
        const workcard = new Workcard({
            title,
            subtitle,
            image,
            subtitle1,
            subtitle2
        });
        await workcard.save();
        console.log('Work Card page Top added successfully');
        return res.status(201).json({ message: 'Work Card added successfully' });
    } catch (error) {
        console.error('Error adding Work Top:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getWorkTop = async (req, res) => {
    try {
        // Find all blogs with status 'draft'
        const work = await Work.find()
        res.status(200).json({ work });
    } catch (error) {
        console.error('Error getting  work:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getWorkCard = async (req, res) => {
    try {
        // Find all blogs with status 'draft'
        const workcard = await Workcard.find()
        res.status(200).json({ workcard });
    } catch (error) {
        console.error('Error getting  work:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.upDateWorkTop = async (req, res) => {
    const userId = req.params.id;
    try {
        const work = await Work.findById(userId); // Fix: Remove the curly braces around userId
        if (!work) {
            return res.status(404).json({ error: 'Top not found' });
        }
        //   update Top:
        work.title = req.body.title
        work.subtitle = req.body.subtitle
        work.subtitle1 = req.body.subtitle1

        await work.save();
        // Send a response indicating success
        res.json({ message: 'Top updated successfully', work });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.upDateWorkCard = async (req, res) => {
    const userId = req.params.id;
    try {
        const work = await Workcard.findById(userId); // Fix: Remove the curly braces around userId
        if (!work) {
            return res.status(404).json({ error: 'Top not found' });
        }
    console.log("tesr")

        //   update Top:
        work.title = req.body.title
        work.subtitle = req.body.subtitle
        work.subtitle1=req.body.subtitle1
        work.subtitle2 = req.body.subtitle2
        work.image = req.body.image
        await work.save();
        // Send a response indicating success
        res.json({ message: 'Top updated successfully', work });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};