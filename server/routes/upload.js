const router = require('express').Router();
const fileUpload = require('express-fileupload');
router.use(fileUpload());

router.post('/upload/single', (req, res) => {
  //console.log(req.files);
  
  if (req.files === null) {
    return res.status(400).json({ msg: "no file uploaded" });
  }
  const file = req.files.file;

  file.mv(`${__dirname}/server/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    }
    console.log("file copied");
    res.status(200).json({ fileName: file.name, filePath: `/server/uploads/${file.name}` });
  });
});


module.exports = router;