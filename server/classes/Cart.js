/**
 * Cart class
 */
class Cart {
  constructor( items, status ){
    this.items = items;
    this.status = status;
  }
  
  getItems(){
    return this.items;
  }

  setItems(items){
    this.items = items; 
  }

  getStatus(){
    return this.status;
  }

  setStatus(status){
    this.status = status;
  }
}

module.exports = Cart;