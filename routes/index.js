var express = require("express");
var router = express.Router();
var recipes = require("../recipes.json");

/* GET home page. */
router.get("/recipes/step/:id", function (req, res, next) {
  const queries = req.query;
  const parameters = req.params;

  console.log("parameters.id", parameters.id)
if(isNaN(parameters.id)) {
  res.status(400).send('NOT_FOUND');
  return
}
if(parameters.id < 1) {
  res.status(400).json("parameter ID cannot be less than 1.");
  return
}
  const id = parseInt(parameters.id);

  const minutes = parseInt(queries.elapsedTime);
  // console.log("minutes", typeof minutes);

  // if (typeof id === "string") {
  //   res.status(400).json("NOT_FOUND");
  //   return
  // }


  if (minutes === 0 ) {
    res.status(200).json({ index: 0 });

  } 
   if (typeof id === "number")
   {
    const timers = recipes[id - 1].timers;
    console.log("timers", timers);

    function getStep() {
      let acumm = 0;
      let step = 0;
      for (let i = 0; i < timers.length; i++) {
        acumm += timers[i];
        if (minutes < acumm) {
          step = i;
          break;
        }
      }
      return step;
    }

    console.log("step", getStep());

    res.send({ index: getStep() });
  } 
});

module.exports = router;
