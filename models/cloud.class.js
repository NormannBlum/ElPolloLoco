class Cloud extends MovableObject {
  y = 20;
  width = 500;
  height = 250;

  constructor() {
    super().loadImage("img_pollo_locco/img/5_background/layers/4_clouds/1.png");

    this.x = 200 + Math.random() * 500;
  }
}
