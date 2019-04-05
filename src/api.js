var express = require("express");

var app = express();
app.use(express.json());

var Purchase = require("./models/purchases.model.js");

var InMemoryDb = [new Purchase("AAPL", 239.75), new Purchase("FB", 3976.22)];
var getByName = function (symbol) {
  var retVal = [];
  for ( var i=0; i < InMemoryDb.length; i++) {
    if( InMemoryDb[i].symbol == symbol){
      retVal.push(InMemoryDb[i]);
    };
  };
  return retVal;
}

/*  "/api/purchases"
 *    GET: finds all purchases
 *        no parameters - returns all purchases
 *        id parameter - returns the purchase with the given id, 404 if not found.
 *        symbol parameter - returns all purchase with the given symbol, empty set if not found.
 *    POST: creates a new purchase
 *
 */
//app.use(express.json())
app.get("/api/purchases", (req, res) => {
  if ( Object.keys(req.query).length ) {
    if ( req.query.id ) {
      if( req.query.id >= InMemoryDb.length) {
        res.status(404).end();
      } else {
        res.status(200).json(InMemoryDb[req.query.id]);
      }
    } else if (req.query.symbol){
      var result = getByName(req.query.symbol);
      res.status(200).json(result);
    } else {
       res.status(400).json({"error" : "Bad request, only id and symbol are accepted as parameters"});
    }
  } else {
    res.status(200).json(InMemoryDb);
  }
});

app.post("/api/purchases", (req, res) => {
  var purchaseJson = req.body;

  if( !(purchaseJson) || !(purchaseJson.symbol) || !(purchaseJson.amount) ) {
    return res.status(400).json({"error" : "Request JSON object must include symbol and amount"});
  } else {
    var purchase = new Purchase(purchaseJson.symbol, purchaseJson.amount);
    InMemoryDb.push(purchase);
    return res.status(200).json(purchase);
  }
});

app.listen(4242, () =>
  console.log(`API listening on port 4242`),
);

module.exports = app;
