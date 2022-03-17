const express = require('express');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

mongoose
  .connect(process.env.MONG_URL||"mongodb+srv://quantricsdlhd2022:QTCSDLHD2022@dath.f3nfu.mongodb.net/DATH?retryWrites=true&w=majority", {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log("DB Connection runs successfully"))
  .catch(err => console.log(err));
const port = process.env.PORT || 3000;
const app = express();
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});