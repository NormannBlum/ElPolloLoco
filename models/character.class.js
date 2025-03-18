/**
 * Die Character-Klasse repräsentiert den spielbaren Charakter.
 * Sie erweitert die MovableObject-Klasse und ermöglicht Bewegung, Sprünge und Animationen.
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
   * Initialisiert die Animationen und die Bewegung des Charakters.
   */
  animate() {
    this.initMovement();
    this.initAnimation();
  }

  /**
   * Startet die Bewegung des Charakters basierend auf Benutzereingaben.
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
   * Bewegt den Charakter nach rechts, wenn die entsprechende Taste gedrückt wird.
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
   * Bewegt den Charakter nach links, wenn die entsprechende Taste gedrückt wird.
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
   * Lässt den Charakter springen, wenn die entsprechende Taste gedrückt wird.
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
   * Aktualisiert die Position der Kamera basierend auf der Position des Charakters.
   */
  updateCamera() {
    this.world.camera_x = -this.x + 100;
  }

  /**
   * Initialisiert die Animationszyklen für den Charakter.
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
   * Spielt die Todesanimation ab, wenn der Charakter tot ist.
   */
  playDeadAnimation() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    }
  }

  /**
   * Spielt die Verletzungsanimation ab, wenn der Charakter verletzt ist.
   */
  playHurtAnimation() {
    if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    }
  }

  /**
   * Spielt die Sprunganimation ab, wenn der Charakter springt.
   */
  playJumpingAnimation() {
    if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
    }
  }

  /**
   * Spielt die Laufanimation ab, wenn der Charakter läuft.
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
   * Prüft, ob der Charakter im Leerlauf ist.
   * @returns {boolean} - True, wenn der Charakter im Leerlauf ist.
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
   * Spielt die Leerlaufanimation ab, wenn der Charakter untätig ist.
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
   * Wählt und spielt die entsprechende Leerlaufanimation basierend auf der Inaktivitätsdauer.
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
   * Lässt das Objekt springen, indem es die vertikale Geschwindigkeit erhöht.
   * @returns {void}
   */
  jump() {
    this.speedY = 30;
  }

  /**
   * Verursacht Schaden am Objekt, indem die Energie um 5 reduziert wird.
   * Spielt einen Treffer-Sound ab und setzt die Energie auf 0, falls sie negativ wird.
   * Der Treffer kann nur alle 200 Millisekunden erfolgen, um mehrfachen Schaden in kurzer Zeit zu verhindern.
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
}
