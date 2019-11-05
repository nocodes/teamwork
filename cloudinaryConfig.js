import dotenv from 'dotenv';
import cloudinary from 'cloudinary';

dotenv.config();


const {
  CLOUDINARY_CLOUDNAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
} = process.env;

cloudinary.config({
cloud_name: CLOUDINARY_CLOUDNAME,
api_key: CLOUDINARY_API_KEY,
api_secret: CLOUDINARY_API_SECRET
});

exports.uploads = (file) =>{
return new Promise(resolve => {
cloudinary.uploader.upload(file, (result) =>{
resolve({url: result.url, id: result.public_id})
}, {resource_type: "auto"})
})
}