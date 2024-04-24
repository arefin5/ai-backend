


const Reveiw = require('../models/reveiwModel');
const ReveiwCard = require("../models/reveiwCardmodel")

exports.CreatereveiwTop = async (req, res) => {
    const { title, subtitle, subtitle1 } = req.body;

    try {

        const reveiw = new Reveiw({
            title,
            subtitle,
            subtitle1
        });
        await reveiw.save();

        console.log('reveiw page Top added successfully');
        return res.status(201).json({ message: 'reveiw added successfully' });
    } catch (error) {
        console.error('Error adding Work Top:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.CreatereveiwCard = async (req, res) => {
    const { title, subtitle, name, image, rating, } = req.body;
    try {
        const reveiwcard = new ReveiwCard({
            title,
            subtitle,
            name,
            image,
            reting,

        });
        await reveiwcard.save();
        return res.status(201).json({ message: 'Reveiw Card added successfully' });
    } catch (error) {
        console.error('Error adding Reveiw Card:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getreveiwTop = async (req, res) => {
    try {
        const reveiw = await Reveiw.find()
        res.status(200).json({ reveiw });
    } catch (error) {
        console.error('Error getting  work:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getreveiwCard = async (req, res) => {
    try {
        // Find all blogs with status 'draft'
        const reveiwcard = await ReveiwCard.find()
        res.status(200).json({ reveiwcard });
    } catch (error) {
        console.error('Error getting  work:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.upDatereveiwTop = async (req, res) => {
    const reweiwid = req.params.id;
    try {
        const reveiw = await Reveiw.findById(reweiwid); // Fix: Remove the curly braces around userId
        if (!reveiw) {
            return res.status(404).json({ error: 'Top not found' });
        }
        //   update Top:
        reveiw.title = req.body.title
        reveiw.subtitle = req.body.subtitle
        reveiw.subtitle1 = req.body.subtitle1
        await reveiw.save();
        // Send a response indicating success
        res.json({ message: 'Reveiw  Top successfully', reveiw });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.upDatereveiwCard = async (req, res) => {
    const reveiwID = req.params.id;
    try {
        const reveiwcard = await ReveiwCard.findById(reveiwID); // Fix: Remove the curly braces around userId
        if (!reveiwcard) {
            return res.status(404).json({ error: 'Top not found' });
        }
        // console.log("match work top")
        //   update Top:
        reveiwcard.title = req.body.title
        reveiwcard.subtitle = req.body.subtitle
        reveiwcard.subtitle2 = req.body.subtitle2
        reveiwcard.image = req.body.image
        reveiwcard.reting=req.body.reting
        await reveiwcard.save();
        // Send a response indicating success
        res.json({ message: 'Reveiw Card updated successfully', reveiwcard });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};