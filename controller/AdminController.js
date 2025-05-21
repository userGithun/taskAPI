const mongoose = require('mongoose')
const phoneModel = require('../model/phone')
const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: "dn2xbnshn",
    api_key: "112167159957627",
    api_secret: "KLfjbcjYHgUH_9PK05e6jJjWNFY",
});

class AdminController {
    static phoneInsert = async (req, res) => {
        try {
            // console.log(req.body)

            const { name, condition, storage, color, price } = req.body;

            const file = req.files.image;
            const imageupload = await cloudinary.uploader.upload(
                file.tempFilePath,
                {
                    folder: "phone",
                }
            );
            const phone = await phoneModel.create({
                name,
                condition,
                storage,
                color,
                price,
                image: {
                    public_id: imageupload.public_id,
                    url: imageupload.secure_url
                }
            });
            return res.status(200).json({
                success: true,
                message: "Phone Inserted",
                data: phone
            });
        } catch (error) {
            console.log(error);
        }
    };
    static phoneDisplay = async (req, res) => {
        try {
            const phone = await phoneModel.find();
            return res.status(200).json({
                success: true,
                message: "Phone Display",
                phone
            });
        } catch (error) {
            console.log(error);
        }
    };
    static phone_delete = async (req, res) => {
        try {
            const id = req.params.id;
            const phone = await phoneModel.findByIdAndDelete(id);
            return res.status(200).json({
                success: true,
                message: "Phone Deleted",
                phone
            });
        } catch (error) {
            console.log(error);
        }
    };
    static phone_view = async (req, res) => {
        try {
            const id = req.params.id;
            const phone = await phoneModel.findById(id);
            return res.status(200).json({
                success: true,
                message: "Phone view",
                phone
            });
        } catch (error) {
            console.log(error);
        }
    };
    static phone_update = async (req, res) => {
        try {
            const id = req.params.id
            const { name, condition, storage, color, price } = req.body;
            if (req.files) {
                const admin = await phoneModel.findById(id);
                const imageID = admin.image.public_id;
                // console.log(imageID);

                //deleting image from Cloudinary
                await cloudinary.uploader.destroy(imageID);
                //new image update
                const imagefile = req.files.image;
                const imageupload = await cloudinary.uploader.upload(
                    imagefile.tempFilePath,
                    {
                        folder: "userprofile",
                    }
                );
                var data = {
                    name: name,
                    condition: condition,
                    storage: storage,
                    color: color,
                    price: price,
                    //image
                    image: {
                        public_id: imageupload.public_id,
                        url: imageupload.secure_url,
                    },
                };
            } else {
                var data = {
                    name: name,
                    condition: condition,
                    storage: storage,
                    color: color,
                    price: price
                };
            }
            const phone = await phoneModel.findByIdAndUpdate(id, data);
            return res.status(200).json({
                success: true,
                message: "Phone details updated",
                phone
            });

        } catch (error) {
            console.log(error);
        }
    };
}
module.exports = AdminController