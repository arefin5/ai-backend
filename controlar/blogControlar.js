const express = require('express');
const Blog = require('../models/blogModel.js');
const CaruselModel = require("../models/CaruselModel.js")
exports.createBlog = async (req, res) => {
    const { title, content, image, category } = req.body;
    if (!category) {
        return res.status(400).json({ error: 'Category is required.' });
    }
    try {
        // Create a new blog and associate it with the authenticated user
        const newBlog = new Blog({
            image,
            title,
            content,
            category,
            author: req.user._id, // Assuming the authenticated user's ID is stored in req.user
        });
       
        await newBlog.save();

        // Use populate to fetch details of the author and attach them to the blog
        const populatedBlog = await newBlog.populate('author', 'name phone image')

        res.status(201).json({ message: 'Blog created successfully', blog: populatedBlog });
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.allPendingBlog = async (req, res) => {
    try {
        // Find all blogs with status 'draft'
        const pendingBlogs = await Blog.find({ status: 'draft' })
            .populate('author', 'name phone'); // Populate the 'author' field with user details
        res.status(200).json({ pendingBlogs });
    } catch (error) {
        console.error('Error getting pending blogs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.singleBlog = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the single blog by id
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        // Update the status to 'published'
        blog.status = 'published';
        await blog.save();
        res.status(200).json({ message: 'Blog published successfully', blog });
    } catch (error) {
        console.error('Error updating blog status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
// public single blog:
exports.singleblogpublic=async(req,res)=>{
    try{
        const { id } = req.params;
        const blog = await Blog.findById(id);
        res.status(200).json({  blog });

    }catch(error){
        res.status(500).json({ error: 'Internal Server Error' });

    }

}
exports.singlgleBlogTags=async (req, res) => {
    const blogId = req.params.id;
  const { tags, status } = req.body;

  try {
    // Update the blog with the selected tags and status
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { tags, status },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    // Send a success response with the updated blog
    res.json({ success: true, message: 'Blog approved successfully', blog: updatedBlog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}


exports.deleteBlogById = async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the blog by id
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.allPublishedBlog = async (req, res) => {
    try {
        // Find all blogs with status 'published'
        const publishedBlogs = await Blog.find({ status: 'published' })
            .populate('author', 'name phone'); // Populate the 'author' field with user details

        res.status(200).json({ publishedBlogs });
    } catch (error) {
        console.error('Error getting published blogs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.allPublishedBlogService = async (req, res) => {
    try {

        const publishedstudy = await Blog.find({ 'tags.service': true, status: 'published' })
        .populate('author', 'name phone');
        res.status(200).json({ publishedstudy });

    } catch (error) {
        console.error('Error getting published blogs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.allPublishedBlogBlogs = async (req, res) => {
    try {

        const publishedstudy = await Blog.find({ 'tags.blogs': true, status: 'published' })
        .populate('author', 'name phone');
        res.status(200).json({ publishedstudy });

    } catch (error) {
        console.error('Error getting published blogs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.allPublishedBlogstudy = async (req, res) => {
    try {

        const publishedstudy = await Blog.find({ 'tags.study': true, status: 'published' })
        .populate('author', 'name phone');
        res.status(200).json({ publishedstudy });

    } catch (error) {
        console.error('Error getting published blogs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.singleBlogconvert = async (req, res) => {
    // this is convert single post  status draft mode to publish mode 
}




exports.CreateCarusel = async (req,res) => {
    const {image}=req.body;
    console.log("test carusel",image);
    try {

        const populatedTopCarusel = new CaruselModel({
            
            image
        });
        // newCaruselModel.image = {
        //     url: `data:image/png;base64,${public_id}`,
        //     public_id,
        // };
        await populatedTopCarusel.save();

        // Use populate to fetch details of the author and attach them to the blog
        res.json({ message: 'Blog created successfully', carusel: populatedTopCarusel });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });

    }
}
exports.getCaruselDraft=async(req,res)=>{
    // get all data from Carusel
    try {
        // Find all blogs with status 'draft'
        const AllpendingCarusel = await CaruselModel.find({ status: 'draft' })
             // Populate the 'author' field with user details
             console.log(AllpendingCarusel)
        res.status(200).json({ AllpendingCarusel });
    } catch (error) {
        console.error('Error getting pending blogs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
//draft
// exports.getCaruselDraft = async (req, res) => {
//     // Get all data from Carusel
//     try {
//         // Find all carousels with status 'draft' and include the 'image' field
//         const AllpendingCarusel = await CaruselModel.find({ status: 'draft' }).select('image category author status');

//         res.status(200).json({ AllpendingCarusel });
//     } catch (error) {
//         console.error('Error getting pending carousels:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }
// exports.getCaruselDraft = async (req, res) => {
//     // Get all data from Carusel
//     try {
//         // Find all carousels with status 'draft' and include the 'image' field
//         const  allCarusels= await CaruselModel.find()

//         res.status(200).json({allCarusels});
//     } catch (error) {
//         console.error('Error getting pending carousels:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }
exports.getAllCarusels = async (req, res) => {
    try {
        // Find all carousels
        const allCarusels = await CaruselModel.find()

        res.status(200).json(allCarusels);
    } catch (error) {
        console.error('Error getting carousels:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


exports.deleteCaruselDraft = async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the carousel draft by id
        const deletedCarusel = await CaruselModel.findByIdAndDelete(id);

        if (!deletedCarusel) {
            return res.status(404).json({ error: 'Carousel draft not found' });
        }

        res.status(200).json({ message: 'Carousel draft deleted successfully' });
    } catch (error) {
        console.error('Error deleting carousel draft:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.aprovedCarusel = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the carousel draft by id
        const carusel = await CaruselModel.findById(id);

        if (!carusel) {
            return res.status(404).json({ error: 'Carousel draft not found' });
        }

        // Update the status to 'published'
        carusel.status = 'published';
        await carusel.save();

        res.status(200).json({ message: 'Carousel draft approved and published successfully', carusel });
    } catch (error) {
        console.error('Error updating carousel draft status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// exports.getCarusel=async(req,res)=>{
//     // status:published
// }
exports.getCarusel = async (req, res) => {
    try {
        // Find all carousels with status 'published'
        const publishedCarusels = await CaruselModel.find({ status: 'published' })
            // .populate('author', 'name'); // Populate the 'author' field with user details


        res.status(200).json({ publishedCarusels });
    } catch (error) {
        console.error('Error getting published carousels:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// const blog=()=>{

// 
