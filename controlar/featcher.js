


const Featcher = require('../models/featcher');
const FeatcherCard = require("../models/featcherCard")

exports.CreatefeatcherTop = async (req, res) => {
    const { title, subtitle } = req.body;

    try {

        const featcher = new Featcher({
            title,
            subtitle,
        });
        await featcher.save();

        console.log('featcher page Top added successfully');
        return res.status(201).json({ message: 'featcher added successfully' });
    } catch (error) {
        console.error('Error adding Work Top:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.CreatefeatcherCard= async (req, res) => {
    const { title, subtitle, subtitle1, content, content2,content3,content4 } = req.body;
    try {
        const featcherCard = new FeatcherCard({
            title,
             subtitle,
              subtitle1,
               content,
                content2,
                content3,
                content4 
            
        });
        await featcherCard.save();
        console.log('Featcher Card page Top added successfully');
        return res.status(201).json({ message: 'Feacther Card added successfully' });
    } catch (error) {
        console.error('Error adding featcher Card:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getfeatcherTop = async (req, res) => {
    try {
        const featcher = await Featcher.find()
        res.status(200).json({featcher});
    } catch (error) {
        console.error('Error getting  work:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getfeatcherCard = async (req, res) => {
    try {
        // Find all blogs with status 'draft'
        const workcard = await FeatcherCard.find()
        res.status(200).json({ workcard });
    } catch (error) {
        console.error('Error getting  work:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.upDatefeatcherTop = async (req, res) => {
    const userId = req.params.id;
    try {
        const work = await Featcher.findById(userId); // Fix: Remove the curly braces around userId
        if (!work) {
            return res.status(404).json({ error: 'Top not found' });
        }
        console.log("match work top")
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
 exports.upDatefeatcherCard = async (req, res) => {
    const userId = req.params.id;
    try {
        const work = await FeatcherCard.findById(userId); // Fix: Remove the curly braces around userId
        if (!work) {
            return res.status(404).json({ error: 'Top not found' });
        }
        console.log("match work top")
        //   update Top:
        work.title = req.body.title
        work.subtitle = req.body.subtitle
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