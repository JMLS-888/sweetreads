require('dotenv').config()
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dkkiqqvdz',
    api_key: '195751371198965',
    api_secret: 'wIDaOpHGZwuHgAk2WzrkJOaCybA',
    secure: true,
});

const images = [
    './images/beef.png',
    './images/haha-yes',
    './images/'
]

cloudinary.uploader.upload(image).then(result => {
    console.log(result)
})
