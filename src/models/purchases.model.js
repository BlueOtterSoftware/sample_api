var highId = 0;
class Purchase {
  constructor(symbol, amount) {
    this.id = highId++;
    this.symbol = symbol;
    this.amount = amount;
  }
}

module.exports = Purchase;
