const DATA = './dino.json';

function init() {
  (async () => {
    /**
     * build dinoArray with data fetched from external JSON
     */
    const dinoArray = [];
    await fetch(DATA)
      .then(response => response.json())
      .then(response => {
        response.Dinos.map((dino) => {
          dinoArray.push(dino)
        })
      })

      /**
       * loop over dinoArray
       * add img key to each entry
       * set img value equal to the species name
       */
      dinoArray.forEach((entry) => {
        let dinoImg = entry.species.toLowerCase()
        entry.img = `images/${dinoImg}.png`
      })

    // Animal constructor
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

    /**
     * use Animal constructor to create humanObject
     */
    const humanObject = new Animal();
    // Use IIFE to get human data from form
      // data in dino.json is in lbs & inches
    function humanData() {
      (function(humanObject) {
        humanObject.species = document.getElementById('name').value;
        humanObject.weight = document.getElementById('weight').value;
        humanObject.feet = document.getElementById('feet').value;
        humanObject.inches = document.getElementById('inches').value;
        humanObject.diet = document.getElementById('diet').value;
        // humanObject.fact = ...
        humanObject.img = 'images/human.png';
      })(humanObject)
    }

      // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.

    // Generate Tiles for each Dino in Array
    const tiles = () => {

      for (let i = 0; i < dinoArray.length; i++) {

        // create DOM elements
        const gridItem = document.createElement('div');
        const title = document.createElement('h3');
        const img = document.createElement('img');
        const fact = document.createElement('p');

        // log dinos
        // console.log(dinoArray)

        // place DOM elements
        document.getElementById('grid').appendChild(gridItem);
        gridItem.appendChild(title);
        gridItem.appendChild(img);
        gridItem.appendChild(fact);

        // set content + attr of DOM elements
        gridItem.className = 'grid-item';
        title.innerHTML = dinoArray[i].species;
        img.setAttribute('src', dinoArray[i].img);
        fact.innerHTML = dinoArray[i].fact;
      }
    }

    return tiles(humanData());
  })(); // end async

  console.log('init() called')
} // end init()

// On button click, prepare and display infographic
document.getElementById('btn').addEventListener('click', () => {
  // Remove form from screen
  document.querySelector('form').style.display = 'none';

  // Add tiles to DOM
  init()
})
