class Bottle extends DrawableObject {
  IMAGES_BOTTLE = [
    "img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
    "img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
  ];

  offset = {
    x: 10,
    y: 10,
    width: 20,
    height: 20,
  };

  constructor(x, y) {
    super().loadImage("img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.loadImages(this.IMAGES_BOTTLE);
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
    this.startAnimation();
  }

  startAnimation() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE);
    }, 400); // 300ms-400ms
  }
}