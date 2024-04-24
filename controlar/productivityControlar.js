const Productivity = require('../models/productivity');

 exports.CreateProductivity = async (req, res) => {
    // console.log("Create Top ENDPOINT => ", req.body);
    const { 
        title1,
        title2,
        title3,
        title4,
        title5,
        title6,
        title7,
        title8,
        firstButton,
     } = req.body;
    const productivity = new Productivity({
        title1,
        title2,
        title3,
        title4,
        title5,
        title6,
        title7,
        title8,
        
        firstButton,
    });
    try {
        await productivity.save();
        return res.json({
            ok: true,
        });
    } catch (err) {
        console.log("Create uctivity FAILED => ", err);
        return res.status(400).send("Error. Try again.");
    }
};
    exports.getProductivity = async (req, res) => {
    try {
        // Find all blogs with status 'draft'
        const productivity = await Productivity.find()
        res.status(200).json({ productivity });
    } catch (error) {
        console.error('Error getting  productivity:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.upDateProductivity = async (req, res) => {
    const userId = req.params.id;
    // console.log("id")
    try {
        const top = await Productivity.findById(userId); // Fix: Remove the curly braces around userId
        if (!top) {
            return res.status(404).json({ error: 'Top not found' });
        }
        // console.log("match")
        //   update Top:

        top.title1 = req.body.title1
        top.title2 = req.body.title2
        top.title3 = req.body.title3
        top.title4 = req.body.title4
        top.title5 = req.body.title5
        top.title6 = req.body.title6
        top.title7 = req.body.title7
        top.title8 = req.body.title8
        top.firstButton = req.body.firstButton
        

        await top.save();
        // Send a response indicating success
        res.json({ message: 'Top updated successfully', top });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};