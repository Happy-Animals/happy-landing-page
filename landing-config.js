window.HAPPY_ANIMALS_LANDING_CONFIG = {
  /*
   * BLOCKCHAINS QUE QUIERO MOSTRAR
   *
   * Para activar una, pon su nombre aquí.
   * Para desactivarla, bórrala o comenta la línea.
   */
  enabledBlockchains: [
    "Base",
    "Robinhood",

    // "Polygon",
    // "Blast",
    // "Arbitrum",
    // "Berachain",
    // "Sonic",
    // "Abstract",
  ],

  /*
   * ANIMALES QUE QUIERO MOSTRAR
   *
   * Usa el número de colección del 1 al 152.
   * NO son token IDs.
   *
   * Ejemplo:
   * [1, 2, 3] = animales #001, #002 y #003
   */
  visibleAnimalsByBlockchain: {
    base: [1, 5, 9],
    robinhood: [32, 57, 70, 50, 21],
  },

  /*
   * Para mostrar los 152:
   *
   * visibleAnimals: "all",
   */
};
