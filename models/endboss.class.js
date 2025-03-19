/**
 * The Endboss class represents the final boss in the game.
 * It has different phases such as alert mode, movement, attack, and injury.
 */
class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 55;
  energy = 25;
  speed = 2;

  IMAGES_ALERT = [
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G6.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G7.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G8.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G9.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G10.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G11.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_WALKING = [
    "img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ATTACK = [
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G13.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G14.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G15.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G16.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G17.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G18.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G19.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G24.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G25.png",
    "img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  hadFirstContact = false;
  attackCooldown = false;
  isAttacking = false;
  isAlerting = false;
  character;

  /**
   * Creates an instance of the Endboss.
   * @param {Character} character - Reference to the player's character.
   */
  constructor(character) {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 3900;
    this.character = character;
    this.initAnimation();
    this.checkForFirstContact();
  }

  offset = {
    x: 20,
    y: 70,
    width: 25,
    height: 100,
  };

  /**
   * Continuously checks if the player is close enough to activate the Endboss.
   */
  checkForFirstContact() {
    let checkInterval = setInterval(() => {
      if (!this.character) return;

      if (this.character.x + 800 > this.x && !this.isAlerting) {
        clearInterval(checkInterval);
        this.isAlerting = true;
        this.playAlertAnimation();
      }
    }, 500);
  }

  /**
   * Plays the alert animation slowly before the Endboss starts.
   */
  playAlertAnimation() {
    let i = 0;
    let interval = setInterval(() => {
      if (i >= this.IMAGES_ALERT.length) {
        clearInterval(interval);
        this.isAlerting = false;
        this.hadFirstContact = true;
        this.startBoss();
      } else {
        this.loadImage(this.IMAGES_ALERT[i]);
        i++;
      }
    }, 500);
  }

  /**
   * Starts the Endboss movement and combat.
   */
  startBoss() {
    this.animate();
    this.initiateAttacking();
  }

  /**
   * Activates the movement and animation of the Endboss.
   */
  animate() {
    setInterval(() => {
      if (this.hadFirstContact && !this.isDead()) {
        this.followCharacter();
      }
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 500);
  }

  /**
   * Initializes animations such as "Dead" and "Hurt".
   */
  initAnimation() {
    setInterval(() => {
      this.playDeadAnimation();
      this.playHurtAnimation();
    }, 200);
  }

  /**
   * Plays the death animation when the Endboss is dead.
   */
  playDeadAnimation() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    }
  }

  /**
   * Plays the hurt animation when the Endboss is injured.
   */
  playHurtAnimation() {
    if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    }
  }

  /**
   * Moves the Endboss towards the character.
   */
  followCharacter() {
    if (!this.character) return;

    if (this.character.x < this.x) {
      this.otherDirection = false;
      this.moveLeft();
    } else if (this.character.x > this.x) {
      this.otherDirection = true;
      this.moveRight();
    }
  }

  /**
   * Starts the object's walking animation.
   * Periodically updates movement direction
   * and plays the walking animation.
   *
   * Additionally, the attack behavior is initialized.
   * @returns {void}
   */
  startWalking() {
    setInterval(() => {
      this.playWalkingAnimation();
    }, 300);

    this.initiateAttacking();
  }

  /**
   * Updates the movement direction based on the character's position.
   */
  updateMovementDirection() {
    if (!this.hadFirstContact || this.isAttacking) return;

    if (this.character.x < this.x) {
      this.moveLeft();
      this.otherDirection = false;
    } else if (this.character.x > this.x) {
      this.moveRight();
      this.otherDirection = true;
    }
  }

  /**
   * Plays the walking animation of the object.
   * Uses predefined images for the walking movement.
   * @returns {void}
   */
  playWalkingAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * Starts the Endboss's attack mode.
   */
  initiateAttacking() {
    setInterval(() => {
      if (!this.attackCooldown && this.hadFirstContact) {
        this.startAttackCycle();
      }
    }, 2000);
  }

  /**
   * Plays the attack animation.
   */
  playAttackAnimation() {
    this.attackInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_ATTACK);
    }, 500);
  }

  /**
   * Begins the Endboss's attack cycle.
   */
  startAttackCycle() {
    this.attackCooldown = true;
    this.isAttacking = true;

    this.playAttackAnimation();
  }

  /**
   * Reduces the object's energy by 5 and plays a hit sound.
   * If energy reaches 0 or below, it is set to 0
   * and the death sound is played.
   * @returns {void}
   */
  hit() {
    let now = new Date().getTime();
    if (now - this.lastHit > 200) {
      this.lastHit = now;
      this.energy -= 5;
      sounds.endbossHurt.play();

      if (this.energy <= 0) {
        this.energy = 0;
        sounds.endbossDead.play();
      }
    }
  }
}
