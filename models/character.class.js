/**
 * The Character class represents the playable character.
 * It extends the MovableObject class and enables movement, jumps, and animations.
 */
class Character extends MovableObject {
  height = 250;
  y = 180;
  speed = 10;
  energy = 150;
  lastActionTime = Date.now();
  idleTimeout = 5000;

  IMAGES_LONGIDLE = [
    "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_IDLE = [
    "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-2.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-3.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-4.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-5.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-6.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-7.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-8.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-9.png",
    "img_pollo_locco/img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_WALKING = [
    "img_pollo_locco/img/2_character_pepe/2_walk/W-21.png",
    "img_pollo_locco/img/2_character_pepe/2_walk/W-22.png",
    "img_pollo_locco/img/2_character_pepe/2_walk/W-23.png",
    "img_pollo_locco/img/2_character_pepe/2_walk/W-24.png",
    "img_pollo_locco/img/2_character_pepe/2_walk/W-25.png",
    "img_pollo_locco/img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img_pollo_locco/img/2_character_pepe/3_jump/J-31.png",
    "img_pollo_locco/img/2_character_pepe/3_jump/J-32.png",
    "img_pollo_locco/img/2_character_pepe/3_jump/J-33.png",
    "img_pollo_locco/img/2_character_pepe/3_jump/J-34.png",
    "img_pollo_locco/img/2_character_pepe/3_jump/J-35.png",
    "img_pollo_locco/img/2_character_pepe/3_jump/J-36.png",
    "img_pollo_locco/img/2_character_pepe/3_jump/J-37.png",
    "img_pollo_locco/img/2_character_pepe/3_jump/J-38.png",
    "img_pollo_locco/img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img_pollo_locco/img/2_character_pepe/5_dead/D-51.png",
    "img_pollo_locco/img/2_character_pepe/5_dead/D-52.png",
    "img_pollo_locco/img/2_character_pepe/5_dead/D-53.png",
    "img_pollo_locco/img/2_character_pepe/5_dead/D-54.png",
    "img_pollo_locco/img/2_character_pepe/5_dead/D-55.png",
    "img_pollo_locco/img/2_character_pepe/5_dead/D-56.png",
    "img_pollo_locco/img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img_pollo_locco/img/2_character_pepe/4_hurt/H-41.png",
    "img_pollo_locco/img/2_character_pepe/4_hurt/H-42.png",
    "img_pollo_locco/img/2_character_pepe/4_hurt/H-43.png",
  ];

  world;

  constructor() {
    super().loadImage("img_pollo_locco/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONGIDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animate();
  }

  offset = {
    x: 15,
    y: 95,
    width: 40,
    height: 100,
  };

  /**
   * Initializes the character's animations and movement.
   */
  animate() {
    this.initMovement();
    this.initAnimation();
  }

  /**
   * Selects and plays the appropriate idle animation based on inactivity duration.
   */
  chooseIdleAnimation() {
    let timeSinceLastAction = Date.now() - this.lastActionTime;
    if (timeSinceLastAction >= this.idleTimeout) {
      this.playAnimation(this.IMAGES_LONGIDLE);
    } else {
      this.playAnimation(this.IMAGES_IDLE);
    }
  }

  /**
   * Starts character movement based on user input.
   */
  initMovement() {
    setInterval(() => {
      sounds.walking.pause();
      this.handleRightMovement();
      this.handleLeftMovement();
      this.handleJump();
      this.updateCamera();
    }, 1000 / 60);
  }

  /**
   * Initializes the animation cycles for the character.
   */
  initAnimation() {
    setInterval(() => {
      this.playDeadAnimation();
      this.playHurtAnimation();
      this.playJumpingAnimation();
      this.playWalkingAnimation();
      this.playIdleAnimation();
    }, 200);
  }

  /**
   * Moves the character to the left if the corresponding key is pressed.
   */
  handleLeftMovement() {
    if (this.world.gameOver) return;
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
      sounds.walking.play();
      this.lastActionTime = Date.now();
    }
  }

  /**
   * Makes the character jump if the corresponding key is pressed.
   */
  handleJump() {
    if (this.world.gameOver) return;
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
      sounds.jump.play();
      this.lastActionTime = Date.now();
    }
  }

  /**
   * Moves the character to the right if the corresponding key is pressed.
   */
  handleRightMovement() {
    if (this.world.gameOver) return;
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
      sounds.walking.play();
      this.lastActionTime = Date.now();
    }
  }

  /**
   * Causes damage to the object by reducing energy by 5.
   * Plays a hit sound and sets energy to 0 if it falls below zero.
   * The hit can only occur once every 200 milliseconds to prevent multiple hits in a short time.
   *
   * @returns {void}
   */
  hit() {
    const now = new Date().getTime();
    if (now - this.lastHit > 200) {
      this.energy -= 5;
      sounds.hurt.play();

      if (this.energy < 0) {
        this.energy = 0;
        sounds.dead.play();
      }

      this.lastHit = now;
    }
  }

  /**
   * Checks if the character is idle.
   * @returns {boolean} - True if the character is idle.
   */
  isIdle() {
    return (
      !this.isDead() &&
      !this.isHurt() &&
      !this.isAboveGround() &&
      !this.world.keyboard.RIGHT &&
      !this.world.keyboard.LEFT
    );
  }

  /**
   * Makes the object jump by increasing its vertical speed.
   * @returns {void}
   */
  jump() {
    this.speedY = 30;
  }

  /**
   * Plays the death animation if the character is dead.
   */
  playDeadAnimation() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    }
  }

  /**
   * Plays the hurt animation if the character is injured.
   */
  playHurtAnimation() {
    if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    }
  }

  /**
   * Plays the idle animation if the character is inactive.
   */
  playIdleAnimation() {
    if (this.world.gameOver) return;
    if (this.isIdle()) {
      if (Date.now() - this.lastActionTime >= this.idleTimeout) {
        sounds.snore.play();
      }
      this.chooseIdleAnimation();
    }
  }

  /**
   * Plays the jumping animation if the character is in the air.
   */
  playJumpingAnimation() {
    if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
    }
  }

  /**
   * Plays the walking animation if the character is moving.
   */
  playWalkingAnimation() {
    if (
      !this.isHurt() &&
      !this.isAboveGround() &&
      (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)
    ) {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  /**
   * Updates the camera position based on the character's position.
   */
  updateCamera() {
    this.world.camera_x = -this.x + 100;
  }
}
