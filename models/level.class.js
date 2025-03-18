/**
 * Die Level-Klasse repräsentiert ein Level im Spiel.
 * Sie enthält Gegner, Hintergrundobjekte, sammelbare Items und die Endposition des Levels.
 */
class Level {
  /**
   * Eine Liste aller Gegner im Level.
   * @type {MovableObject[]}
   */
  enemies;

  /**
   * Eine Liste aller Wolken im Level.
   * @type {Cloud[]}
   */
  clouds;

  /**
   * Eine Liste aller Hintergrundobjekte im Level.
   * @type {BackgroundObject[]}
   */
  backgroundObjects;

  /**
   * Eine Liste aller Flaschen im Level, die gesammelt werden können.
   * @type {Bottle[]}
   */
  bottles;

  /**
   * Eine Liste aller Münzen im Level.
   * @type {Coin[]}
   */
  coins;

  /**
   * Die x-Koordinate des Endes des Levels.
   * @type {number}
   */
  level_end_x = 3600;

  /**
   * Erstellt eine Instanz eines Levels mit Gegnern, Wolken, Hintergrundobjekten, Flaschen und Münzen.
   * @param {MovableObject[]} enemies - Eine Liste von Gegnern im Level.
   * @param {Cloud[]} clouds - Eine Liste von Wolken im Level.
   * @param {BackgroundObject[]} backgroundObjects - Eine Liste von Hintergrundobjekten.
   * @param {Bottle[]} bottles - Eine Liste von sammelbaren Flaschen.
   * @param {Coin[]} coins - Eine Liste von sammelbaren Münzen.
   */
  constructor(enemies, clouds, backgroundObjects, bottles, coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.bottles = bottles;
    this.coins = coins;
  }
}
