const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());
app.use(fileUpload());
app.use(express.json());
dotenv.config();

//log to console info about what DB data is used (useful for testing)
console.log((process.env.MOCK_DB_USED == "false") ? "LIVE DB USED" : "MOCK DB USED");

//Route MIDDLEWAREs
const authRoute =
  process.env.MOCK_DB_USED === "true" ?
    require('./server/routes/authMOCK') : require('./server/routes/auth');
app.use('/api/user', authRoute);
const profileRoute =
  require('./server/routes/profile');
app.use('/api/profile', profileRoute);
const ordersRoute =
  process.env.MOCK_DB_USED === "true" ?
    require('./server/routes/ordersMOCK') : require('./server/routes/orders');
app.use('/api/orders', ordersRoute);
const designsRoute =
  process.env.MOCK_DB_USED === "true" ?
    require('./server/routes/designsMOCK') : require('./server/routes/designs');
app.use('/api/designs', designsRoute);
const cartRoute =
  process.env.MOCK_DB_USED === "true" ?
    require('./server/routes/cartMOCK') : require('./server/routes/cart');
app.use('/api/cart', cartRoute);
const stockRoute = require('./server/routes/stock');
app.use('/api/stock', stockRoute);
const paymentRoute = require('./server/routes/payment');
app.use('/api/payment', paymentRoute);
const jobsRoute = require('./server/routes/jobs');
app.use('/api/jobs', jobsRoute);
const settingsRoute = require('./server/routes/settings');
app.use('/api/settings', settingsRoute);


/*
const uploadRoute = require('./server/routes/upload');
app.use('/upload', uploadRoute);
*/
//TODO move into separate route file
//issue with not receiving request currently (?)
//image upload route
app.post('/upload/single', (req, res) => {
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




//Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log('Yaaay! Connected to DB')
);

app.listen(5000, () => console.log("The server is running on port 5000"));

process.on('SIGINT', () => process.exit(1));