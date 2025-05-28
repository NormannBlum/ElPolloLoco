/**
 * Factory function that creates and returns a new instance of a predefined level.
 * This function defines the initial state of the game world by instantiating and
 * positioning all game objects, including enemies, environment elements, and collectibles.
 * It is used to initialize the level at the start of the game or to reset it.
 *
 * The `Level` constructor is populated with arrays of:
 * - Enemies: An Endboss, several Chickens, and SmallChickens.
 * - Clouds: A series of clouds for the sky.
 * - BackgroundObjects: Multiple layers for a parallax scrolling effect.
 * - Bottles: Collectible bottle items.
 * - Coins: Collectible coin items.
 *
 * @returns {Level} A new Level object containing all the defined game elements.
 */
function resetLevel() {
  return new Level(
    [
      new Endboss(),
      new Chicken(), new Chicken(), new Chicken(), new Chicken(),
      new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(),
      new SmallChicken(), new SmallChicken(), new SmallChicken(), new SmallChicken(),
      new SmallChicken(), new SmallChicken(), new SmallChicken(), new SmallChicken()
    ],
    [
      new Cloud(210), new Cloud(430), new Cloud(670), new Cloud(820),
      new Cloud(1170), new Cloud(1350), new Cloud(1580), new Cloud(1900),
      new Cloud(2150), new Cloud(2430), new Cloud(2670), new Cloud(2820),
      new Cloud(3160), new Cloud(3410), new Cloud(3670), new Cloud(3820),
      new Cloud(4060), new Cloud(4250), new Cloud(4460), new Cloud(4710),
      new Cloud(4970), new Cloud(5130), new Cloud(5460), new Cloud(5750),
      new Cloud(5980)
    ],
    [
      new BackgroundObject("img_pollo_locco/img/5_background/layers/air.png", -719),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/3_third_layer/2.png", -719),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/2_second_layer/2.png", -719),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/1_first_layer/2.png", -719),

      new BackgroundObject("img_pollo_locco/img/5_background/layers/air.png", 0),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/1_first_layer/1.png", 0),

      new BackgroundObject("img_pollo_locco/img/5_background/layers/air.png", 719),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/3_third_layer/2.png", 719),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/2_second_layer/2.png", 719),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/1_first_layer/2.png", 719),

      new BackgroundObject("img_pollo_locco/img/5_background/layers/air.png", 719 * 2),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/3_third_layer/1.png", 719 * 2),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/2_second_layer/1.png", 719 * 2),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/1_first_layer/1.png", 719 * 2),

      new BackgroundObject("img_pollo_locco/img/5_background/layers/air.png", 719 * 3),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/3_third_layer/2.png", 719 * 3),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/2_second_layer/2.png", 719 * 3),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/1_first_layer/2.png", 719 * 3),

      new BackgroundObject("img_pollo_locco/img/5_background/layers/air.png", 719 * 4),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/3_third_layer/1.png", 719 * 4),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/2_second_layer/1.png", 719 * 4),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/1_first_layer/1.png", 719 * 4),

      new BackgroundObject("img_pollo_locco/img/5_background/layers/air.png", 719 * 5),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/3_third_layer/2.png", 719 * 5),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/2_second_layer/2.png", 719 * 5),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/1_first_layer/2.png", 719 * 5)
    ],
    [
      new Bottle(510, 370), new Bottle(800, 370), new Bottle(1120, 370),
      new Bottle(1530, 370), new Bottle(1860, 370), new Bottle(2240, 370),
      new Bottle(2400, 370), new Bottle(2620, 370), new Bottle(2870, 370),
      new Bottle(3050, 370), new Bottle(3200, 370), new Bottle(3490, 370)
    ],
    [
      new Coin(600, 140), new Coin(1100, 230), new Coin(1580, 270),
      new Coin(1860, 170), new Coin(2150, 240), new Coin(2400, 170),
      new Coin(2660, 230), new Coin(2900, 140), new Coin(3200, 220),
      new Coin(3380, 180)
    ]
  );
}

let level1 = resetLevel();