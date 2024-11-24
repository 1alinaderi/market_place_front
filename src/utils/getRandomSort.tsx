export function getRandomSort() {
    const randomsort = [
        "-createdAt",
        "createdAt",
        "updatedAt",
        "-updatedAt",
        "-visit",
        "visit",
        "name_en",
        "-name_en",
        "desc_en",
        "-desc_en",
      ];

      const randomIndex = Math.floor(Math.random() * randomsort.length);
      const randomElement = randomsort[randomIndex];
      return randomElement
}