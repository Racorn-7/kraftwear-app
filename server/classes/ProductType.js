/**
 * ProductType class
 */
class ProductType {
  constructor(name) {
    this.name = name;
    this.setPrice(name);
  }

  setPrice(name){
      switch (name) {
        case 't-shirt female':
        case 't-shirt male':
          return 20
        case 'hoodie female':
          return 40
        case 'hoodie male':
          return 45
        case 'v-neck female':
        case 'v-neck male':
          return 25
        case 'sweater female':
          return 30
        case 'sweater male':
          return 35
        default:
          return 20
      }
  }
}

module.exports = ProductType;