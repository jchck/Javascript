const DATA = './dino.json';


(async () => {
  const dinoArray = [];
  await fetch(DATA)
    .then(response => response.json())
    .then(response => {
      response.Dinos.map((dino) => {
        dinoArray.push(dino)
      })
    })

    // console.log(dinoArray)

      // Create Dino Constructor
  function Animal(species, weight, height, diet, where, when, fact, img) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
    this.img = img;
  };


  // Create Dino Objects
  const dinoObjects = dinoArray.map(dino => new Animal(
    dino.species,
    dino.weight,
    dino.height,
    dino.diet,
    dino.where,
    dino.when,
    dino.fact,
    dino.img
  ));

  // console.log(dinoObjects)

  // Create Human Object
  const humanObject = new Animal();
  // Use IIFE to get human data from form
    // data in dino.json is in lbs & inches
    (function(humanObject) {
      humanObject.species = document.getElementById('name').value;
      humanObject.weight = document.getElementById('weight').value;
      humanObject.feet = document.getElementById('feet').value;
      humanObject.inches = document.getElementById('inches').value;
      humanObject.diet = document.getElementById('diet').value;
      // humanObject.fact = ...
      humanObject.img = 'images/human.png';
    })(humanObject)
  console.log(humanObject)
})();


    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array

        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic

