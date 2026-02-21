import express, { Request, Response } from "express";

// ==== Type Definitions, feel free to add or modify ==========================
interface cookbookEntry {
  name: string;
  type: "ingredient" | "recipe";
}

interface requiredItem {
  name: string;
  quantity: number;
}

interface recipe extends cookbookEntry {
  type: "recipe";
  requiredItems: requiredItem[];
}

interface ingredient extends cookbookEntry {
  type: "ingredient";
  cookTime: number;
}

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express();
app.use(express.json());

// Store your recipes here!
const cookbook: (recipe | ingredient)[] = [];

// Task 1 helper (don't touch)
app.post("/parse", (req:Request, res:Response) => {
  const { input } = req.body;

  const parsed_string = parse_handwriting(input)
  if (parsed_string == null) {
    res.status(400).send("this string is cooked");
    return;
  } 
  res.json({ msg: parsed_string });
  return;
  
});

// [TASK 1] ====================================================================
// Takes in a recipeName and returns it in a form that 
const parse_handwriting = (recipeName: string): string | null => {
  // base case
  if (recipeName.length <= 0 || recipeName === null) {
    return null;
  }

  // letters and hyphens using regex
  let parseRecipeName = recipeName.replace(/[_-]/g, " ");

  // removing non-alphabetic characters
  parseRecipeName = parseRecipeName.replace(/[^a-zA-z\s]/g, "");

  // whitespace handler
  parseRecipeName = parseRecipeName.replace(/\s+/g, " ").trim();

  parseRecipeName = parseRecipeName.split(" ").map(item => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()).join(" ")

  return parseRecipeName
}

// [TASK 2] ====================================================================
// Endpoint that adds a CookbookEntry to your magical cookbook
app.post("/entry", (req:Request, res:Response) => {
  // res.status(500).send("not yet implemented!")
  const { name, type } = req.body;

  if (type !== "recipe" && type !== "ingredient") {
    return res.status(400).send("type should be an ingredient or recipe");
  }

  if (name === null || name === "") {
    return res.status(400).send("invalid name");
  }

  if (cookbook.find(item => item.name === name)) {
    return res.status(400).send("item entry already exists in CookbookEntry");
  }

  let entry;

  // different bodies depending on whether they are recipe or ingredient items
  if (type === "recipe") {
    const { requiredItems } = req.body;

    if (!Array.isArray(requiredItems)) {
      return res.status(400).send("invalid items array list")
    }

    entry = { name, type, requiredItems } as recipe;

  } else if (type === "ingredient") {
    const { cookTime } = req.body;

    // check again for another way
    if (cookTime < 0 || cookTime === null) {
      return res.status(400).send("invalid cooking time D:")
    }

    entry = { name, type, cookTime } as ingredient;
  }

  cookbook.push(entry);

  return res.status(200).send({});

});

// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name
app.get("/summary", (req:Request, res:Response) => {
  const name = req.query.name as string;

  if (!name) {
    return res.status(400).send("name query parameter required")
  }

  const findRecipe = cookbook.find(e => e.name === name);

  if (!findRecipe) {
    return res.status(400).send("invalid recipe item");
  }

  if (findRecipe.type !== "recipe") {
    return res.status(400).send("not a recipe");
  }

  // aligns ingredient with their cooking time
  const ingredientMap = new Map<string, number>();

  const ingredientExtraction = (item: string, quantity: number) => {
    const entry = cookbook.find(e => e.name === item);

    // if (!entry) {
    //   return res.status(400).send("invalid entry")
    // }

    if (entry.type === "ingredient") {
      const currQuant = ingredientMap.get(entry.name) ?? 0
      ingredientMap.set(entry.name, quantity + currQuant)
      return
    }

    // Recursion to extract individual ingredients
    for (const req of entry.requiredItems) {
      ingredientExtraction(req.name, req.quantity * quantity)
    }
  }

  try {
    ingredientExtraction(findRecipe.name, 1);
  } catch (error) {
    return res.status(400).send("invalid recipe structure")
  }

  let cookingTime = 0

  for (const [name, quantity] of ingredientMap.entries()) {
    const findIngredient = cookbook.find(e => e.name === name);

    // ensures that the type is an ingredient
    if (findIngredient.type !== "ingredient") {
      return res.status(400).send("not an ingredient type");
    }

    cookingTime += findIngredient.cookTime * quantity;
  }
  
  return res.status(200).send({
    name: findRecipe.name,
    cookTime: cookingTime,
    ingredients: Array.from(ingredientMap.entries()).map(([name, quantity]) => ({name, quantity})),
  });
  // res.status(500).send("not yet implemented!")
});

// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080;
app.listen(port, () => {
  console.log(`Running on: http://127.0.0.1:8080`);
});
