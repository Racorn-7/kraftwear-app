class Address {
    constructor( addName, addLineOne, city, postcode, isBilling, isDeliver){
        this.addName = addName;
        this.addLineOne = addLineOne;
        this.city = city;
        this.postCode = postcode;
        this.billing=isBilling;
        this.deliver = isDeliver;
    }

}

module.exports = Address;