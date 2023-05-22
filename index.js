const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

//
const json = require("./data.json");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app" et mettre async
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  // Run your code here, after you have insured that the connection was made
  .then(async () => {
    const myRecipe = await Recipe.create({
      title: "Polenta",
      cuisine: "Italienne",
    });
    console.log(myRecipe);
  })
  .then(async () => {
    await Recipe.insertMany(json);
  })
  .then(async () => {
    const rigatoni = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: "100" },
      { new: true }
    );
    console.log(rigatoni);
  })

  .then(async () => {
    await Recipe.findOneAndDelete({ title: "Carrot Cake" });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

// mongoose
// .connect(MONGODB_URI)
// .then(async (x) => {
//   console.log(Connected to the database: "${x.connection.name}");
//   // Before adding any recipes to the database, let's remove all existing ones
//   return Recipe.deleteMany();
// })
// .then(() => {
//   // Insert the recipes into the database
//   return Recipe.insertMany(data);
// })
// .then((insertedRecipes) => {
//   console.log("Inserted recipes:");
//   insertedRecipes.forEach((recipe) => {
//     console.log(recipe.title);
//   });
//   // Close the database connection
//   mongoose.connection.close();
// })
// .catch((error) => {
//   console.error("Error connecting to the database", error);
// });
