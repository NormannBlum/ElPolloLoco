class Bottle extends DrawableObject {
  offset = {
    x: 10,
    y: 10,
    width: 20,
    height: 20,
  };
  
    constructor(x, y) {
      super();
      this.loadImage("img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
      this.x = x;
      this.y = y;
      this.width = 60 ;
       this.height = 60;
    }
  }