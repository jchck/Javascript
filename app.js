const DATA = './dino.json';

function init() {
  (async () => {
    const dinoData = await fetch(DATA)
      .then(response => {
        if (response.ok) {
          return response;
        }
        else {
          const error = new Error(`Error ${response.status}: ${response.statusText}`);
          error.response = response;
          throw error;
        }
      },
      error => {
        const errorMessage = new Error(error.message);
        throw errorMessage;
      })
      .then(response => response.json())
      .then(response => response.Dinos)
      .catch(error => {
        console.log(`Error: ${error.message}`);
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
    }

    const dinosaurs = dinoData.map(dino => new Animal(
      dino.species,
      dino.weight,
      dino.height,
      dino.diet,
      dino.where,
      dino.when,
      dino.fact,
      dino.image
    ));

      /**
       * loop over dinosaurs
       * set img value equal to the species name
       */
      dinosaurs.forEach((entry) => {
        let dinoImg = entry.species.toLowerCase();
        entry.img = `images/${dinoImg}.png`;
      })

    /**
     * use Animal constructor to create humanObject
     */
    const humanObject = new Animal();
    // Use IIFE to get human data from form
      // data in dino.json is in lbs & inches
    function humanData() {
      (function(humanObject) {
        // set form name field to species
        humanObject.species = document.getElementById('name').value;
        // form weight = weight
        humanObject.weight = document.getElementById('weight').value;
        // convert raw feet value into inches
        const feet = parseInt(document.getElementById('feet').value * 12);
        // raw inches value
        const inches = document.getElementById('inches').value;
        // add the two
        humanObject.height = feet + inches;
        // form diet = diet
        humanObject.diet = document.getElementById('diet').value;
        // humanObject.fact = '';
        humanObject.img = 'images/human.png';
      })(humanObject)
    }

    // put human in middle
    dinosaurs.splice(4, 0, humanObject);

    // Generate Tiles for each Dino in Array
    const tiles = () => {

      for (let i = 0; i < dinosaurs.length; i++) {
        // create DOM elements
        const gridItem = document.createElement('div');
        const title = document.createElement('h3');
        const img = document.createElement('img');
        const fact = document.createElement('p');

        // place DOM elements
        document.getElementById('grid').appendChild(gridItem);
        gridItem.appendChild(title);
        gridItem.appendChild(img);
        gridItem.appendChild(fact);

        // set content + attr of DOM elements
        gridItem.className = 'grid-item';
        title.innerHTML = dinosaurs[i].species;
        img.setAttribute('src', dinosaurs[i].img);

        // Create Dino Compare Method 1
        // NOTE: Weight in JSON file is in lbs, height in inches.
        const compareDiet = () => {
          if (dinosaurs[i].diet === 'herbavor' && humanObject.diet === 'Herbavor') {
            return `${humanObject.species} has same diet as a ${dinosaurs[i].species}`;
          }
        }

        // Create Dino Compare Method 2
        // NOTE: Weight in JSON file is in lbs, height in inches.
        const compareHeight = () => {
          if (humanObject.height < dinosaurs[i].height) {
            return `${humanObject.species} is ${dinosaurs[i].height - humanObject.height} inches shorter than a ${dinosaurs[i].species}`;
          }
          else if (humanObject.height > dinosaurs[i].height) {
            return `${humanObject.species} is ${humanObject.height - dinosaurs[i].height} inches taller than a ${dinosaurs[i].species}`;
          }
          else if (humanObject.height === dinosaurs[i].height) {
            return `${humanObject.species} is the same height as a ${dinosaurs[i].species}!`;
          }
        }

        // Create Dino Compare Method 3
        // NOTE: Weight in JSON file is in lbs, height in inches.
        const compareWeight = () => {
          if (humanObject.weight < dinosaurs[i].weight) {
            return `${humanObject.species} is ${dinosaurs[i].weight - humanObject.weight} pounds lighter than a ${dinosaurs[i].species}`;
          }
          else if (humanObject.weight > dinosaurs[i].weight) {
            return `${humanObject.species} is ${humanObject.weight - dinosaurs[i].weight} pounds heavier than a ${dinosaurs[i].species}`;
          }
          else if (humanObject.weight === dinosaurs[i].weight) {
            return `${humanObject.species} is the same weight as a ${dinosaurs[i].species}!`;
          }
        }

        const facts = [compareDiet(), compareHeight(), compareWeight()];
        const random = (randomize) => randomize[Math.floor(Math.random() * randomize.length)];
        const oldFact = dinosaurs[i].fact;
        const newFact = random(facts);

        fact.innerHTML = dinosaurs[i].fact;
        if (dinosaurs[i].species === humanObject.species) { // if human
          fact.innerHTML = '';
        }
        else if (dinosaurs[i].species === 'Pigeon') { // if bird
          fact.innerHTML = oldFact;
        }
        else if(newFact === undefined) {
          fact.innerHTML = oldFact;
        }
        else {
          fact.innerHTML = newFact;
        }
      }
    }

    return tiles(humanData());
  })(); // end async

} // end init()

// On button click, prepare and display infographic
document.getElementById('btn').addEventListener('click', () => {
  // Remove form from screen
  document.querySelector('form').style.display = 'none';

  init();
})
