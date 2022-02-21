/**
 * ProductLine class
 */
class ProductLine {
  constructor( productType, size, design, garmentType, color, qtty, unitPrice ){
    this.productType = productType;
    this.size = size;
    this.design = design;
    this.garmentType = garmentType;
    this.color = color;
    this.qtty = qtty;
    this.unitPrice = unitPrice;
  }
}

module.exports = ProductLine;