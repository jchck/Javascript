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
          dinoArray.push(dino);
        })
      })

      /**
       * loop over dinoArray
       * add img key to each entry
       * set img value equal to the species name
       */
      dinoArray.forEach((entry) => {
        let dinoImg = entry.species.toLowerCase();
        entry.img = `images/${dinoImg}.png`;
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
        humanObject.fact = [compareHeight(), compareWeight(), compareDiet()];
        humanObject.img = 'images/human.png';
      })(humanObject)
    }

      // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches.
    const compareHeight = () => humanObject.height < dinoArray[0].height ? `${humanObject.species} is shorter than a ${dinoArray[0].species}!` : `${humanObject.species} is taller than a ${dinoArray[0].species}!`;

    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    // const compareWeight = humanObject.weight < dinoArray[2].weight ? `${humanObject.species}` is
    const compareWeight = () => {
      if (humanObject.weight < dinoArray[1].weight) {
        return `${humanObject.species} is ${dinoArray[1].weight - humanObject.weight} pounds lighter than a ${dinoArray[1].species}`;
      }
      else {
        return `${humanObject.species} is ${dinoArray[1].weight + humanObject.weight} pounds heavier than a ${dinoArray[1].species}`;
      }
    }

    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    const compareDiet = () => {
      if (humanObject.diet === 'Herbavor') {
        return `${humanObject.species} has the same diet as a ${dinoArray[0].species} and a ${dinoArray[2].species}`;
      }
      else if(humanObject.diet === 'Carnivor') {
        return `${humanObject.species} has the same diet as a ${dinoArray[1].species}`;
      }
      else {
        return `${humanObject.species} is an Omnivor!`;
      }
    }

    // Generate Tiles for each Dino in Array
    const tiles = () => {
      // put human in middle of dinoArray
      dinoArray.splice(4, 0, humanObject);

      for (let i = 0; i < dinoArray.length; i++) {
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
        title.innerHTML = dinoArray[i].species;
        img.setAttribute('src', dinoArray[i].img);
        fact.innerHTML = dinoArray[i].fact;
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
