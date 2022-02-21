/**
 * Design class
 */
class Design {
  constructor( name, images, garmentColor, garmentTypeName, cost = 0.00 ){
    this.name = name;
    this.garmentColor = garmentColor;
    this.garmentTypeName = garmentTypeName;
    this.cost = cost;
    this.images = images;
  }

  getName(){
    return this.name;
  }

  setName(name){
    this.name = name; 
  }

  getDetails(){
    return this.details;
  }

  setDetails(details){
    this.details = details;
  }

  getImages(){
    return this.images;
  }

}

module.exports = Design;