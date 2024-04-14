const Rpage = require('../models/pageData');
const ImageTopCarousel = require('../models/imageTopCarousel');
const Team = require("../models/Team.js");
const ContacPage=require("../models/ContacPageModel.js")
const Review =require("../models/Review.js")
const Seminer=require("../models/Seminer.js");
const Video=require("../models/Video.js")
const Brand =require("../models/Brand.js")
exports.contacpageCreate=async(req,res)=>{
   try{
      const {title,content,image}=req.body;
      const newcontacpage = new ContacPage({
        title,
        content,
        image
      });
      await newcontacpage.save();

      return res.status(201).json({ message: 'Page data added successfully' });
   }catch(err){
    console.log("err")
   }
}
exports.contacpageData=async(req,res)=>{
    try {
        // Find all contacpages and sort them in descending order by _id
        let contacpages = await ContacPage.find().sort({ _id: -1 }).limit(1);
    
        return res.status(200).json({ contacpages });
    
      } catch (err) {
        console.error("Error fetching data:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
}



exports.registerPage = async (req, res) => {
    try {
        const { Address, Contactinfo, timeSchedule, title, subtitle } = req.body;
        const newRegistration = new Rpage({
            Address,
            Contactinfo,
            timeSchedule,
            title,
            subtitle
        });
        await newRegistration.save();
        return res.status(201).json({ message: 'Page data added successfully' });
    } catch (error) {
        console.error('Error adding subscriber:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.registerPageDataUpdate = async (req, res) => {
    try {
        const { Address, Contactinfo, timeSchedule, title, subtitle } = req.body;
        // update data
        const updatedPageData = await Rpage.findOneAndUpdate(
            { /* Your query criteria */ },
            {
                $set: {
                    Address,
                    ContactInfo: Contactinfo,
                    TimeSchedule: timeSchedule,
                    title: req.body.title,
                    subtitle: req.body.subtitle
                },
            },
            { new: true }
        );

        if (!updatedPageData) {
            return res.status(404).json({ error: 'Page data not found' });
        }

        return res.status(200).json({ message: 'Page data updated successfully', updatedPageData });
    } catch (error) {
        console.error('Error updating page data:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.registerPageData = async (req, res) => {
    try {
        // Implement the logic to retrieve page data
        // You can query the database using the Rpage model and send the data in the response
        const pageData = await Rpage.find();
        return res.status(200).json({ pageData });
    } catch (error) {
        console.error('Error fetching page data:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.topCarusel = async (req, res) => {
    try { } catch (err) {
        console.error('Error fetching page data:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// ... other functions ...

exports.topCaruselDataCreate = async (req, res) => {
    try {
        const { image } = req.body;

        // Check if there's an existing top carousel image
        let existingTopImage = await ImageTopCarousel.findOne();

        if (existingTopImage) {
            // Update the existing image
            existingTopImage.image = image;
            await existingTopImage.save();
            return res.status(200).json({ message: 'Top carousel image updated successfully', image: existingTopImage });
        } else {
            // If no existing image, create a new one
            let topImage = new ImageTopCarousel({ image });
            await topImage.save();
            return res.status(201).json({ message: 'Top carousel image created successfully', image: topImage });
        }
    } catch (err) {
        console.error('Error updating/creating top carousel image:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getTopCaruselImage = async (req, res) => {
    try {
        // Find the top carousel image
        const topImage = await ImageTopCarousel.findOne();

        if (!topImage) {
            return res.status(404).json({ error: 'Top carousel image not found' });
        }

        return res.status(200).json({ image: topImage.image });
    } catch (error) {
        console.error('Error fetching top carousel image:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
// team:

exports.createTeam = async (req, res) => {
    const { designation,position, name, image, facebook,twiter,email,linkdin,youtube} = req.body;
    try {
        const newTeam = new Team({
            name,
            position,
            designation,
            author: req.user._id,
            image,
            facebook,
            twiter,
            email,
            linkdin,
            youtube
        });
        await newTeam.save();
        const populatedTeam = await newTeam.populate('author', 'name email image')
        res.status(201).json({ message: 'Team Member created successfully', team:populatedTeam  });
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
//
exports.allTeam = async (req, res) => {
    try {
        // Find all blogs with status 'draft'
        const team = await Team.find()
            .populate('author', 'name email'); // Populate the 'author' field with user details
        res.status(200).json({ team });
    } catch (error) {
        console.error('Error getting All  Team Member:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.deleteSingeteam = async (req, res) => {
    const teamId = req.params._id; // Assuming team ID is passed as a route parameter
// console.log(teamId)
    try {
        // Find the team member by ID and remove it
        const deletedTeam = await Team.findOneAndDelete({ _id: teamId });

        if (!deletedTeam) {
            return res.status(404).json({ error: 'Team member not found' });
        }

        res.status(200).json({ message: 'Team member deleted successfully' });
    } catch (error) {
        console.error('Error deleting team member:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.ReviewCreate=async(req,res)=>{
    const _id=req.user._id;
    const {review}=req.body;
if(! review.lenght){
    return res.json({
        error:" review required"
    })
}
    try{
        console.log(_id,review)
   const reviews =new Review({
    review,
    postedby:_id
   });
   review.save();
   res.json(reviews)

    }catch(error){
        console.error('Error please verify your image :', error);
        res.status(400).json({ error: ' Server Error' });
    }
    
}
exports.Review=async(req,res)=>{
    try{
const review=await Review.find().populate("postedby","name email_id");
res.json(review)

    }catch(err){
        res.status(400).json({ error: ' Server Error' });
 
    }
}
// createSeminar
exports.createSeminar= async (req, res) => {
    const { subtitle, title, image,time ,date} = req.body;
    try {
        // Create a new blog and associate it with the authenticated user
        const newSeminer = new Seminer({
            title,
            subtitle,
            image,
            time,
            date
        });
        await newSeminer.save();

        res.status(201).json({ message: ' Seminer created successfully',});
    } catch (error) {
        console.error('Error creating Seminer:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.allSeminer=async (req, res) => {
    try {
        // Find all blogs with status 'draft'
        const seminer = await Seminer.find()
        res.status(200).json({ seminer });
    } catch (error) {
        console.error('Error getting   All Seminer:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.deleteSingeSeminer= async (req, res) => {
    const seminerId = req.params._id; // Assuming team ID is passed as a route parameter
// console.log(teamId)
    try {
        // Find the team member by ID and remove it
        const deletedSeminer= await Seminer.findOneAndDelete({ _id: seminerId });

        if (!deletedSeminer) {
            return res.status(404).json({ error: ' Seminer  not found' });
        }

        res.status(200).json({ message: 'Seminer deleted successfully' });
    } catch (error) {
        console.error('Error deleting Seminer:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.AddVideoPlaylist=async (req, res) => {
    const {  playlistTitle,
        title} = req.body;
    try {
        // Create a new blog and associate it with the authenticated user
        const video = new Video({
            playlistTitle,
            title,
        });
        await video.save();
        res.status(201).json({ message: 'Team Member created successfully', video  });
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getAllPlaylist=async(req,res)=>{
    try {
        // Find all blogs with status 'draft'
        const video = await Video.find()
        res.status(200).json({ video });
    } catch (error) {
        console.error('Error getting   All Video Playlist:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.AllBrand=async(req,res)=>{
    const {  image,
        } = req.body;
    try {
        // Create a new blog and associate it with the authenticated user
        const brand = new Video({
            image,
            
        });
        await brand.save();
        res.status(201).json({ message: 'Team Member created successfully', brand  });
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getAllBrand=async(req,res)=>{
    try {
        // Find all blogs with status 'draft'
        const brand = await Brand.find()
        res.status(200).json({ brand });
    } catch (error) {
        console.error('Error getting   All Brand:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.deleteSingeBrandByID = async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the blog by id
        const deletedBlog = await Brand.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({ error: 'Brand not found' });
        }

        res.status(200).json({ message: 'Brand deleted successfully' });
    } catch (error) {
        console.error('Error deleting Brand:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};