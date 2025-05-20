/********************************************************************************
*  WEB700 – Assignment 02
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Katariya Dhruvkumar vinodkumar
   Student ID: 135914240
    Date: 05/20/2025
*
********************************************************************************/

const setData = require("./data/setData.json");
const themeData = require("./data/themeData.json");

class LegoData {
  constructor() {
    this.sets = [];
  }

  initialize() {
    return new Promise((resolve, reject) => {
      try {
        this.sets = [];
        setData.forEach((set) => {
          const theme = themeData.find(t => t.id === set.theme_id);
          this.sets.push({
            ...set,
            theme: theme ? theme.name : "Unknown"
          });
        });
        resolve();
      } catch (err) {
        reject("unable to load data");
      }
    });
  }

  getAllSets() {
    return new Promise((resolve, reject) => {
      if (this.sets.length === 0) {
        reject("no sets available");
      } else {
        resolve(this.sets);
      }
    });
  }

  getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
      const result = this.sets.find(set => set.set_num === setNum);
      if (result) {
        resolve(result);
      } else {
        reject(`Unable to find set: ${setNum}`);
      }
    });
  }

  getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
      const themeLower = theme.toLowerCase();
      const result = this.sets.filter(set =>
        set.theme.toLowerCase().includes(themeLower)
      );
      if (result.length > 0) {
        resolve(result);
      } else {
        reject(`Unable to find sets with theme: ${theme}`);
      }
    });
  }
}


// Test Code
const data = new LegoData();

data.initialize()
  .then(() => {
    console.log(`Number of Sets: ${data.sets.length}`);
    return data.getSetByNum("0012-1");
  })
  .then(set => {
    console.log(set);
    return data.getSetsByTheme("tech");
  })
  .then(sets => {
    console.log(`Number of 'tech' sets: ${sets.length}`);
  })
  .catch(err => {
    console.error(err);
  });
