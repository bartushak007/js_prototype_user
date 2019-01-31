var transport = {
  stop: null
};
var car = {
  stop: true
};
car.__proto__ = transport;

console.log(car.stop); // ? (1)
// true звертається до своєї властивості
delete car.stop;
console.log(car.stop); // ? (2)
// null звертається через прото до транспорт
delete transport.stop;
console.log(car.stop); // ? (3)
// undefined так як і в цьому і в трансопрт властивість відсутня

function Car(brand, year, run, color) {
  this.brand = brand;
  this.year = year;
  this.run = run;
  this.color = color;
  this.engine = false;
  this.traffic = false;
  this.fuel = false;
}

Car.prototype = {
  startEngine: function() {
    if (this.fuel === true) {
      this.engine = true;
    } else {
      console.log('Нужно заправить автомобиль');
    }
  },

  go: function() {
    if (this.engine === true) {
      console.log(
        'Машина ' + this.brand + ' марки ' + this.color + ' цвета поехала!'
      );
      this.traffic = true;
    } else {
      console.log('Включите вначале зажигание!');
    }
  },

  stop: function() {
    if (this.engine === true) {
      console.log('Машинка остановилась!');
      this.engine = false;
      this.traffic = false;
    } else {
      console.log('Зажигание и так выключено');
    }
  },

  addFuel: function() {
    this.fuel = true;
  }  
};


var objCar = new Car('bmw', '2019', '9', 'black');
var objSecondCar = new Car('mercedesBenz', '2019', '99', 'silver');
var objThirdCar = new Car('audi', '2018', '17799', 'red');

objCar.go();
objCar.stop();
objCar.startEngine();
objCar.addFuel();
objCar.startEngine();
objCar.go();
objCar.stop();

objSecondCar.startEngine();
objCar.addFuel();
objCar.startEngine();
objSecondCar.go();
objSecondCar.stop();
