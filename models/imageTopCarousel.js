// models/imageTopCarousel.js

const mongoose = require('mongoose');

const imageTopCarouselSchema = new mongoose.Schema({
    image: {
        type: String, // Assuming you're storing the image path or URL as a string
        required: true,
    },
});

const ImageTopCarousel = mongoose.model('ImageTopCarousel', imageTopCarouselSchema);

module.exports = ImageTopCarousel;
