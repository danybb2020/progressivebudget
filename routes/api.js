const router = require ("express").Router();
const transaction = require ("../models/transcaction.js");

router.post("api/transaction", ({body},res)=>{
transaction.create(body)
.then(dbTransaction =>{
    res.json(dbTransaction);
})
.catch(err => {
    res.status(404).json(err);

});
});

router.post ("/api/transaction/bulk", ({body}, res)=>{
    transaction.insertMany(body)
    .then(dbTransaction => {
res.json(dbTransaction);
    })
    .catch(err=>{
        res.status(404).json(err);
    });
});

router.get("/api/transaction", (req, res) => {
transaction.find({}).sort({date: -1})
.then(dbTransaction => {
 res.json(dbTransaction);
})
.catch(err=> {
res.status(404).json (err);


});
});

module.exports = router;