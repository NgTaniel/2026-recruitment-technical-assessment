import express, { Request, Response } from "express";

// ==== Type Definitions, feel free to add or modify ==========================
interface cookbookEntry {
  name: string;
  type: string;
}

interface requiredItem {
  name: string;
  quantity: number;
}

interface recipe extends cookbookEntry {
  requiredItems: requiredItem[];
}

interface ingredient extends cookbookEntry {
  cookTime: number;
}

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express();
app.use(express.json());

// Store your recipes here!
const cookbook: cookbookEntry[] = [];

export const resetCountTest = () => {
  cookbook.length = 0
}

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

  if (typeof name !== "string" || name === "") {
    return res.status(400).send("invalid name");
  }

  if (cookbook.find(item => item.name === name)) {
    return res.status(400).send("item entry already exists in CookbookEntry");
  }

  let entry: cookbookEntry;

  // different bodies depending on whether they are recipe or ingredient items
  if (type === "recipe") {
    const { requiredItems } = req.body.requiredItems;

    // if (!Array.isArray(requiredItems)) {
    //   return res.status(400).send("invalid items array list")
    // }

    entry = { name, type, requiredItems } as recipe;

  } else if (type === "ingredient") {
    const { cookTime } = req.body.cookTime;

    // check again for another way
    if (cookTime < 0) {
      return res.status(400).send("invalid cooking time D:")
    }

    entry = { name, type, cookTime } as ingredient;
  }

  cookbook.push(entry);

  return res.status(200).send({});

});

// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name
app.get("/summary", (req:Request, res:Request) => {
  // TODO: implement me
  res.status(500).send("not yet implemented!")

});

// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080;
app.listen(port, () => {
  console.log(`Running on: http://127.0.0.1:8080`);
});
