class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 55;
  energy = 25;
  // isDead = false;

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

  animate() {
    setInterval(() => {
      this.followCharacter();
    }, 1000 / 60); // 60 FPS

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200); // Animationsgeschwindigkeit

    setInterval(() => {
      if (!this.hadFirstContact) {
        this.playAnimation(this.IMAGES_ALERT);
      }
    }, 100);
  }

  initAnimation() {
    setInterval(() => {
      this.playDeadAnimation();
      this.playHurtAnimation();
    }, 200);
  }

  playDeadAnimation() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    }
  }

  playHurtAnimation() {
    if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    }
  }

  followCharacter() {
    if (!this.character) return; // Verhindert Fehler, wenn character nicht gesetzt ist

    if (this.character.x < this.x) {
      this.otherDirection = false; // Nach links schauen
      this.moveLeft(); // Nach links bewegen
    } else if (this.character.x > this.x) {
      this.otherDirection = true; // Nach rechts schauen
      this.moveRight(); // Nach rechts bewegen
    }
  }

  startWalking() {
    setInterval(() => {
      this.updateMovementDirection(); // Aktualisiert die Bewegungsrichtung
      this.playWalkingAnimation(); // Spielt die Walking-Animation ab
    }, 100);
  
    this.initiateAttacking(); // Startet den Angriffsmodus
  }
  
  updateMovementDirection() {
    if (!this.hadFirstContact || this.isAttacking) return;
  
    if (this.character.x < this.x) {
      this.moveLeft(); // Bewegung nach links
      this.otherDirection = false; // Blickrichtung nach links
    } else if (this.character.x > this.x) {
      this.moveRight(); // Bewegung nach rechts
      this.otherDirection = true; // Blickrichtung nach rechts
    }
  }
  
  playWalkingAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
  }
  
  initiateAttacking() {
    setInterval(() => {
      if (!this.attackCooldown && this.hadFirstContact) {
        this.startAttackCycle();
      }
    }, 3000);
  }

  playAttackAnimation() {
    this.attackInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_ATTACK);
    }, 100); // Schneller Wechsel für flüssige Animation
  }

  startAttackCycle() {
    this.attackCooldown = true;
    this.isAttacking = true;

    this.playAttackAnimation();

    setTimeout(() => {
      this.completeAttackCycle();
    }, 1000); // Angriffsdauer
  }

  completeAttackCycle() {
    clearInterval(this.attackInterval);

    if (this.otherDirection) {
      this.moveRightQuickly(); // Schneller Angriff nach rechts
    } else {
      this.moveLeftQuickly(); // Schneller Angriff nach links
    }

    this.isAttacking = false;
    this.attackCooldown = false;
  }

  moveRightQuickly() {
    this.x += 150; // Schnelle Bewegung nach rechts
  }

  moveLeftQuickly() {
    this.x -= 150; // Schnelle Bewegung nach links
  }
}