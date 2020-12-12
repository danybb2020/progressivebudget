const router = require("express").Router();
const transaction = require("../models/transaction.js");

router.post("api/transaction", ({ body }, res) => {
    console.log('fuck yeah');
  transaction
    .create(body)
    .then((dbTransaction) => {
      res.json(dbTransaction);
    })
    .catch((err) => {
        console.log(err);
        console.error(err);
      res.status(404).json(err);
    });
});
/** 
router.post("/api/transaction/bulk", ({ body }, res) => {
  transaction
    .insertMany(body)
    .then((dbTransaction) => {
      res.json(dbTransaction);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.get("/api/transaction", (req, res) => {
  transaction
    .find({})
    .sort({ date: -1 })
    .then((dbTransaction) => {
      res.json(dbTransaction);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});
*/
module.exports = router;
