const router = require('express').Router();
const User = require('../model/User');
const verify = require('../verification/verifyToken');
const productLineSchema = require('../model/ProductLineSchema');
const mongoose = require('mongoose');
const ProductLineModel = mongoose.model('ProductLineModel', productLineSchema);

//get stock details
router.post('/all', verify, async (req, res) => {
  //get user with given id
  const user = await User.findOne({ _id: req.user._id });
  if (!user) return res.status(400).send({ error: 'No user found with these details' });

  //array for 3d model details
  const threeDeeModels = [
    {
      id: "gt001",
      name: "t-shirt male",
      uri: '/3dmodels/t-shirt_white.gltf',
      scale: [.005, .005, .005],
      position: [0, -2, 0],
      thumbnail: "/3dmodels/thumbnails/model3d_thumb_1.png",
      backgroundColor: "dark"
    },
    {
      id: "gt002",
      name: "hoodie male",
      uri: '/3dmodels/grey-hoodie.gltf',
      scale: [.005, .005, .005],
      position: [0, -2, 0],
      thumbnail: "/3dmodels/thumbnails/model3d_thumb_3.png",
      backgroundColor: "light"
    },
    {
      id: "gt003",
      name: "hoodie female",
      uri: '/3dmodels/KraftWear_hoodie_model_4.gltf',
      scale: [4, 4, 4],
      position: [0, -.3, 0],
      thumbnail: "/3dmodels/thumbnails/model3d_thumb_2.png",
      backgroundColor: "dark"
    },
    {
      id: "gt004",
      name: "t-shirt female",
      uri: '/3dmodels/female_tshirt_halfed.gltf',
      scale: [4, 4, 4],
      position: [0, -2, 0],
      thumbnail: "/3dmodels/thumbnails/model3d_thumb_4.png",
      backgroundColor: "light"
    },
    {
      id: "gt005",
      name: "v-neck male",
      uri: '/3dmodels/t-shirt_white.gltf',
      scale: [.005, .005, .005],
      position: [0, -2, 0],
      thumbnail: "/3dmodels/thumbnails/model3d_thumb_1.png",
      backgroundColor: "dark"
    },
    {
      id: "gt006",
      name: "v-neck female",
      uri: '/3dmodels/female_tshirt_halfed.gltf',
      scale: [4, 4, 4],
      position: [0, -2, 0],
      thumbnail: "/3dmodels/thumbnails/model3d_thumb_4.png",
      backgroundColor: "light"
    },
    {
      id: "gt007",
      name: "sweater male",
      uri: '/3dmodels/grey-hoodie.gltf',
      scale: [.005, .005, .005],
      position: [0, -2, 0],
      thumbnail: "/3dmodels/thumbnails/model3d_thumb_3.png",
      backgroundColor: "light"
    },
    {
      id: "gt008",
      name: "sweater female",
      uri: '/3dmodels/KraftWear_hoodie_model_4.gltf',
      scale: [4, 4, 4],
      position: [0, -.3, 0],
      thumbnail: "/3dmodels/thumbnails/model3d_thumb_2.png",
      backgroundColor: "dark"
    },
  ];

  res.send({
    productType: ProductLineModel.schema.path('productType.name').enumValues,
    size: ProductLineModel.schema.path('size').enumValues,
    garmentType: ProductLineModel.schema.path('garmentType').enumValues,
    color: ProductLineModel.schema.path('color').enumValues,
    threeDeeModels: threeDeeModels,
  })
});

module.exports = router;