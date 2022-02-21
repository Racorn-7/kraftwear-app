class PaymentMethod {
    constructor(payMethodName, name, number, type){
        this.payMethodName = payMethodName,
        this.nameOnCard = name;
        this.cardNo = number;
        this.cardType = type;
    }
}

module.exports = PaymentMethod;