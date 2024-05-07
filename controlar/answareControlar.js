const Answare = require('../models/answareModel');
const AnswareCard = require("../models/answarecardmodel")

exports.CreateanswareTop = async (req, res) => {
    const { title, subtitle } = req.body;
    try {
        const answare = new Answare({
            title,
            subtitle,
        });
        await answare.save();
        // console.log('featcher page Top added successfully');
        return res.status(201).json({ message: 'featcher added successfully' });
    } catch (error) {
        console.error('Error adding Work Top:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.CreateanswareCard= async (req, res) => {
    const { title, contnet, } = req.body;
    try {
        const answarecard = new AnswareCard({
            title,
             contnet,
        });
        await answarecard.save();
        return res.status(201).json({ message: 'Feacther Card added successfully' });
    } catch (error) {
        console.error('Error adding featcher Card:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getanswareTop = async (req, res) => {
    try {
        const answare = await Answare.find()
        res.status(200).json({answare});
    } catch (error) {
        console.error('Error getting  work:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getanswareCard = async (req, res) => {
    try {
        // Find all blogs with status 'draft'
        const answarecard = await AnswareCard.find()
        res.status(200).json({ answarecard });
    } catch (error) {
        console.error('Error getting  work:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.upDateanswareTop = async (req, res) => {
    const userId = req.params.id;
    try {
        const work = await Answare.findById(userId); // Fix: Remove the curly braces around userId
        if (!work) {
            return res.status(404).json({ error: 'Top not found' });
        }
        //   update Top:
        work.title = req.body.title
        work.subtitle = req.body.subtitle
        await work.save();
        // Send a response indicating success
        res.json({ message: 'Top updated successfully', work});
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
 exports.upDateanswareCard = async (req, res) => {
    const userId = req.params.id;
    try {
        const work = await AnswareCard.findById(userId); // Fix: Remove the curly braces around userId
        if (!work) {
            return res.status(404).json({ error: 'Top not found' });
        }
        console.log("match work top")
        //   update Top:
        work.title = req.body.title
        work.content= req.body.content
                await work.save();
        // Send a response indicating success
        res.json({ message: 'Top updated successfully', work });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};