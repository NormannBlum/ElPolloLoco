/**
 * The Level class represents a level in the game.
 * It contains enemies, background objects, collectible items, and the end position of the level.
 */
class Level {
  /**
   * A list of all enemies in the level.
   * @type {MovableObject[]}
   */
  enemies;

  /**
   * A list of all clouds in the level.
   * @type {Cloud[]}
   */
  clouds;

  /**
   * A list of all background objects in the level.
   * @type {BackgroundObject[]}
   */
  backgroundObjects;

  /**
   * A list of all bottles in the level that can be collected.
   * @type {Bottle[]}
   */
  bottles;

  /**
   * A list of all coins in the level.
   * @type {Coin[]}
   */
  coins;

  /**
   * The x-coordinate of the end of the level.
   * @type {number}
   */
  level_end_x = 3600;

  /**
   * Creates an instance of a level with enemies, clouds, background objects, bottles, and coins.
   * @param {MovableObject[]} enemies - A list of enemies in the level.
   * @param {Cloud[]} clouds - A list of clouds in the level.
   * @param {BackgroundObject[]} backgroundObjects - A list of background objects.
   * @param {Bottle[]} bottles - A list of collectible bottles.
   * @param {Coin[]} coins - A list of collectible coins.
   */
  constructor(enemies, clouds, backgroundObjects, bottles, coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.bottles = bottles;
    this.coins = coins;
  }
}
