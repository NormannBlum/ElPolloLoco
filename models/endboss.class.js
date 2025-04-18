/**
 * The Endboss class represents the final boss in the game.
 * It has different phases such as alert mode, movement, attack, and injury.
 */
class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 55;
  energy = 25;
  speed = 1;

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

  offset = {x: 20, y: 70, width: 25, height: 100};

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
    this.speed = 2.5;
  }

  /**
   * Periodically checks if the player is close enough to trigger the boss.
   */
  checkForFirstContact() {
    let checkInterval = setInterval(() => {
      if (!this.character) return;

      if (this.character.x + 800 > this.x && !this.isAlerting) {
        clearInterval(checkInterval);
        this.isAlerting = true;
        this.playAlertAnimation();
      }
    }, 300);
  }

  /**
   * Plays the alert animation before activating the boss.
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
   * Starts movement and attack behavior.
   */
  startBoss() {
    this.animate();
    this.initiateAttacking();
  }

  /**
   * Controls movement and walking animation.
   */
  animate() {
    setInterval(() => {
      if (this.hadFirstContact && !this.isDead()) {
        this.followCharacter();
      }
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 300);
  }

  /**
   * Handles hurt and death animations.
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
   * Moves toward the player's character.
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
   * Begins checking for attack opportunities.
   */
  initiateAttacking() {
    setInterval(() => {
      if (!this.attackCooldown && this.hadFirstContact) {
        this.startAttackCycle();
      }
    }, 1000);
  }

  /**
   * Starts a single attack cycle.
   */
  startAttackCycle() {
    this.attackCooldown = true;
    this.isAttacking = true;
    this.playAttackAnimation();
  }

  /**
   * Repeats the attack animation.
   */
  playAttackAnimation() {
    this.attackInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_ATTACK);
    }, 500);
  }

  /**
   * Reduces energy on hit and handles death logic.
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
