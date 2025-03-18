class ThrowableObject extends MovableObject {
  IMAGES_ROTATION = [
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y, direction, world) {
    super().loadImage(this.IMAGES_ROTATION[0]);
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.world = world;
    this.height = 60;
    this.width = 50;
    this.isSplashing = false;
    this.throw();
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    this.animate();

    this.throwInterval = setInterval(() => {
      if (!this.isSplashing) {
        this.x += 15 * this.direction;
      }
    }, 50);

    setTimeout(() => {
      if (!this.isSplashing) {
        this.markedForDeletion = true;
      }
    }, 3000);
  }

  splashEffect() {
    if (this.isSplashing) return;
    this.isSplashing = true;
    clearInterval(this.throwInterval);

    this.playSplashAnimation(() => {
      this.markedForDeletion = true;
    });
  }

  playSplashAnimation(callback) {
    let i = 0;
    let interval = setInterval(() => {
      if (i >= this.IMAGES_SPLASH.length) {
        clearInterval(interval);
        callback();
      } else {
        this.loadImage(this.IMAGES_SPLASH[i]);
        i++;
      }
    }, 100);
  }

  animate() {
    setInterval(() => {
      if (!this.isSplashing) {
        this.playAnimation(this.IMAGES_ROTATION);
      }
    }, 100);
  }
}
