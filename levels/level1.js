/**
 * Function to reinitialize the level.
 * @returns {Level} A new Level object.
 */
function resetLevel() {
  return new Level(
    // Enemies
    [
      new Endboss(),
      new Chicken(), new Chicken(), new Chicken(), new Chicken(),
      new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(),
      new SmallChicken(), new SmallChicken(), new SmallChicken(), new SmallChicken(),
      new SmallChicken(), new SmallChicken(), new SmallChicken(), new SmallChicken()
    ],

    // Clouds
    [
      new Cloud(210), new Cloud(430), new Cloud(670), new Cloud(820),
      new Cloud(1170), new Cloud(1350), new Cloud(1580), new Cloud(1900),
      new Cloud(2150), new Cloud(2430), new Cloud(2670), new Cloud(2820),
      new Cloud(3160), new Cloud(3410), new Cloud(3670), new Cloud(3820),
      new Cloud(4060), new Cloud(4250), new Cloud(4460), new Cloud(4710),
      new Cloud(4970), new Cloud(5130), new Cloud(5460), new Cloud(5750),
      new Cloud(5980)
    ],

    // BackgroundObjects (grouped by x-position)
    [
      // -719
      new BackgroundObject("img_pollo_locco/img/5_background/layers/air.png", -719),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/3_third_layer/2.png", -719),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/2_second_layer/2.png", -719),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/1_first_layer/2.png", -719),

      // 0
      new BackgroundObject("img_pollo_locco/img/5_background/layers/air.png", 0),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/1_first_layer/1.png", 0),

      // 719
      new BackgroundObject("img_pollo_locco/img/5_background/layers/air.png", 719),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/3_third_layer/2.png", 719),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/2_second_layer/2.png", 719),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/1_first_layer/2.png", 719),

      // 1438 (719 * 2)
      new BackgroundObject("img_pollo_locco/img/5_background/layers/air.png", 719 * 2),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/3_third_layer/1.png", 719 * 2),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/2_second_layer/1.png", 719 * 2),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/1_first_layer/1.png", 719 * 2),

      // 2157 (719 * 3)
      new BackgroundObject("img_pollo_locco/img/5_background/layers/air.png", 719 * 3),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/3_third_layer/2.png", 719 * 3),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/2_second_layer/2.png", 719 * 3),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/1_first_layer/2.png", 719 * 3),

      // 2876 (719 * 4)
      new BackgroundObject("img_pollo_locco/img/5_background/layers/air.png", 719 * 4),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/3_third_layer/1.png", 719 * 4),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/2_second_layer/1.png", 719 * 4),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/1_first_layer/1.png", 719 * 4),

      // 3595 (719 * 5)
      new BackgroundObject("img_pollo_locco/img/5_background/layers/air.png", 719 * 5),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/3_third_layer/2.png", 719 * 5),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/2_second_layer/2.png", 719 * 5),
      new BackgroundObject("img_pollo_locco/img/5_background/layers/1_first_layer/2.png", 719 * 5)
    ],

    // Bottles (sorted by x)
    [
      new Bottle(510, 370), new Bottle(800, 370), new Bottle(1120, 370),
      new Bottle(1530, 370), new Bottle(1860, 370), new Bottle(2240, 370),
      new Bottle(2400, 370), new Bottle(2620, 370), new Bottle(2870, 370),
      new Bottle(3050, 370), new Bottle(3200, 370), new Bottle(3490, 370)
    ],

    // Coins (sorted by x)
    [
      new Coin(600, 140), new Coin(1100, 230), new Coin(1580, 270),
      new Coin(1860, 170), new Coin(2150, 240), new Coin(2400, 170),
      new Coin(2660, 230), new Coin(2900, 140), new Coin(3200, 220),
      new Coin(3380, 180)
    ]
  );
}

let level1 = resetLevel();
