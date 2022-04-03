const express = require('express');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require("cors");

mongoose
  .connect(process.env.MONG_URL||"mongodb+srv://quantricsdlhd2022:QTCSDLHD2022@dath.f3nfu.mongodb.net/DATH?retryWrites=true&w=majority", {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log("DB Connection runs successfully"))
  .catch(err => console.log(err));
  
const port = process.env.PORT || 5000;
const app = express();

const registerRoutes = require("./routes/register")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/register', registerRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});