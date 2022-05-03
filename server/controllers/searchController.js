const Vaccine = require("../models/Vaccines");
const client = require("../redis");

const search = function (req, res) {
  var search = req.query.searchKey;
  client.get("Vaccine" + search, async (err, data) => {
    if (err) {
      res.status(500);
    }
    //if no match found
    if (data != null) {
      let vaccines = JSON.parse(data);
      // console.log(vaccines);
      res.send(vaccines);
    } else {
      Vaccine.find({ Ten: new RegExp(search, "i") }, function (err, vaccines) {
        client.set("Vaccine" + search, JSON.stringify(vaccines));
        res.send(vaccines);
      });
    }
  });
};

// const search = function (req, res) {
//   try {
//     var searchKey = req.query.searchKey;

//     // Check the redis store for the data first
//     client.get(searchKey, async (err, result) => {
//       if (result) {
//         return res.status(200).send({
//           error: false,
//           message: `Result for ${searchKey} from the cache`,
//           data: JSON.parse(result),
//         });
//       } else {
//         // When the data is not found in the cache then we can make request to the server

//         const result = await axios.get("http://localhost:5000/search", {
//           params: {
//             searchKey: searchKey,
//           },
//         });

//         // save the record in the cache for subsequent request
//         client.setex(searchKey, 1440, JSON.stringify(result.data.results));

//         // return the result to the client
//         return res.status(200).send({
//           error: false,
//           message: `Result for ${searchKey} from the server`,
//           data: result.data.results,
//         });
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports = {
  search,
};
