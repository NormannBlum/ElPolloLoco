class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 55;
  energy = 25;

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
  character;

  /**
   * Erstellt eine Instanz des Endbosses.
   * @param {Character} character - Referenz auf den Charakter des Spielers.
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
    this.animate();
    this.initAnimation();
  }

  offset = {
    x: 20,
    y: 70,
    width: 25,
    height: 100,
  };

  /**
   * Aktiviert die Bewegung und Animation des Endbosses.
   */
  animate() {
    setInterval(() => {
      this.followCharacter();
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);

    setInterval(() => {
      if (!this.hadFirstContact) {
        this.playAnimation(this.IMAGES_ALERT);
      }
    }, 100);
  }

  /**
   * Initialisiert Animationen wie "Tot" und "Verletzt".
   */
  initAnimation() {
    setInterval(() => {
      this.playDeadAnimation();
      this.playHurtAnimation();
    }, 200);
  }

  /**
   * Spielt die Todesanimation, wenn der Endboss tot ist.
   */
  playDeadAnimation() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    }
  }

  /**
   * Spielt die Verletzungsanimation, wenn der Endboss verletzt wurde.
   */
  playHurtAnimation() {
    if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    }
  }

  /**
   * Bewegt den Endboss in Richtung des Charakters.
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

  startWalking() {
    setInterval(() => {
      this.updateMovementDirection();
      this.playWalkingAnimation();
    }, 100);
  
    this.initiateAttacking();
  }
  
  /**
   * Aktualisiert die Bewegungsrichtung basierend auf der Position des Charakters.
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
  
  playWalkingAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
  }
  
  /**
   * Startet den Angriffsmodus des Endbosses.
   */
  initiateAttacking() {
    setInterval(() => {
      if (!this.attackCooldown && this.hadFirstContact) {
        this.startAttackCycle();
      }
    }, 3000);
  }

  /**
   * Spielt die Angriffsanimation ab.
   */
  playAttackAnimation() {
    this.attackInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_ATTACK);
    }, 100);
  }

  /**
   * Beginnt den Angriffszyklus des Endbosses.
   */
  startAttackCycle() {
    this.attackCooldown = true;
    this.isAttacking = true;

    this.playAttackAnimation();

    setTimeout(() => {
      this.completeAttackCycle();
    }, 1000);
  }

  /**
   * Beendet den Angriffszyklus und führt eine schnelle Bewegung aus.
   */
  completeAttackCycle() {
    clearInterval(this.attackInterval);

    if (this.otherDirection) {
      this.moveRightQuickly();
    } else {
      this.moveLeftQuickly();
    }

    this.isAttacking = false;
    this.attackCooldown = false;
  }

  moveRightQuickly() {
    this.x += 150;
  }

  moveLeftQuickly() {
    this.x -= 150;
  }

  hit() {
    this.energy -= 5;
    sounds.endbossHurt.play();
    if (this.energy <= 0) {
      this.energy = 0;
      sounds.endbossDead.play();
    }
  }
  
}
