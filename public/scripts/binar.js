// Function to get a random integer between min and max (inclusive)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Binar class for managing car data
class Binar {
  // Method to populate car availability based on random conditions
  static populateCars(cars) {
    return cars.map((car) => {
      const isPositive = getRandomInt(0, 1) === 1;
      const timeAt = new Date();
      const mutator = getRandomInt(1000000, 100000000);
      const availableAt = new Date(
        timeAt.getTime() + (isPositive ? mutator : -mutator)
      );

      return {
        ...car,
        availableAt,
      };
    });
  }

  // Method to list cars with optional filtering
  static async listCars(filterer) {
    let cars;
    let cachedCarsString = localStorage.getItem("CARS");

    if (cachedCarsString) {
      const cachedCars = JSON.parse(cachedCarsString);
      cars = this.populateCars(cachedCars);
    } else {
      const response = await fetch(
        "https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json"
      );
      const body = await response.json();
      cars = this.populateCars(body);
      localStorage.setItem("CARS", JSON.stringify(cars));
    }

    // Apply filter if filterer is a function
    return filterer instanceof Function ? cars.filter(filterer) : cars;
  }
}
