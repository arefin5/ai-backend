const Top = require("../models/Top")

exports.CreateTop = async (req, res) => {
    console.log("Create Top ENDPOINT => ", req.body);
    const { title1,
        title2,
        title3,
        title4,
        title5,
        title6,
        title7,
        title8,
        subtitle1,
        subtitle2,
        cardtitle,
        reveiwtitle, image,
        sltitle,
        firstButton,
        secendButton } = req.body;
    const top = new Top({
        title1,
        title2,
        title3,
        title4,
        title5,
        title6,
        title7,
        title8,
        subtitle1,
        subtitle2,
        cardtitle,
        reveiwtitle,
        image,
        sltitle,
        firstButton,
        secendButton
    });
    try {
        await top.save();
        return res.json({
            ok: true,
        });
    } catch (err) {
        console.log("Create Top FAILED => ", err);
        return res.status(400).send("Error. Try again.");
    }
};

exports.getTop = async (req, res) => {
    try {
        // Find all blogs with status 'draft'
        const top = await Top.find()
        res.status(200).json({ top });
    } catch (error) {
        console.error('Error getting  Top:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.upDateTop = async (req, res) => {
    const userId = req.params.id;
    console.log("id")
    try {
        const top = await Top.findById(userId); // Fix: Remove the curly braces around userId
        if (!top) {
            return res.status(404).json({ error: 'Top not found' });
        }
        console.log("match")
        //   update Top:

        top.title1 = req.body.title1
        top.title2 = req.body.title2
        top.title3 = req.body.title3
        top.title4 = req.body.title4
        top.title5 = req.body.title5
        top.title6 = req.body.title6
        top.title7 = req.body.title7
        top.title8 = req.body.title8
        top.subtitle1 = req.body.subtitle1
        top.subtitle2 = req.body.subtitle2
        top.cardtitle = req.body.cardtitle
        top.reveiwtitle = req.body.reveiwtitle
        top.image = req.body.image
        top.sltitle = req.body.sltitle

        await top.save();
        // Send a response indicating success
        res.json({ message: 'Top updated successfully', Top });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};