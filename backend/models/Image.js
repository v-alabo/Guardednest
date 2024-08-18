const mongoose = require('mongoose')

const ImageDetailsScehma = new mongoose.Schema(
    {
     username: String,   
     image:String
    },
    {
      collection: "ImageDetails",
    }
  );
  
  const Images = mongoose.model("ImageDetails", ImageDetailsScehma);
  module.exports = Images