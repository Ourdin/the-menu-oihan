// Burger object
//
// { type: 'TYPE', item: 'ITEM' }
//
// Golden rules of a burger
//
// 1 - Bun on top and bottom
// 2 - Use the same type of bun
// 3 - The cheese should always be above the beef
// 4 - The lettuce should always be below a bun
// 5 - Never stack two buns on top of another
// 6 - Never use the same ingredient on top of another
//
// Optional rule
//
// 1 - Vegetarian (contains no beef or bacon)
//

import { TYPES, ITEMS } from '../constants/burger'


const getFirstIngredient = burger => burger[0];

const getLastIngredient = burger => burger[burger.length - 1];

export const isThereTwoBunsStartAndEnd = burger => burger.length >= 2 && getFirstIngredient(burger).type === TYPES.BUN && getLastIngredient(burger).type === TYPES.BUN;

export const isVegetarian = (burger) => {
  return !burger.some(ingredient => ingredient.item === ITEMS.BACON || ingredient.item === ITEMS.BEEF)
}

export const isBunsStack = (burger) => {
  if (burger.length < 2) return false
  return burger.reduce((prevIngredient, currentIngredient) => {
    if (prevIngredient === true) return true
    if (prevIngredient === TYPES.BUN && currentIngredient.type === TYPES.BUN) {
      return true;
    }
    return currentIngredient.type;
  }, null) !== true;
}

export const isIngredientsStack = (burger) => {
  if (burger.length < 2) return false
  return burger.reduce((prevIngredient, currentIngredient) => {
    if (prevIngredient === true) return true
    if (prevIngredient === currentIngredient.item) {
      return true;
    }
    return currentIngredient.item;
  }, null) !== true;
}

export const isCheeseAboveBeef = (burger) => {
  if (burger.length < 2) return false

  const indexBeef = burger.findIndex((elem) => elem.item === ITEMS.BEEF)
  const indexCheese = burger.findIndex((elem) => elem.item === ITEMS.CHEESE)
  if (indexBeef === -1 || indexCheese === -1) return true;

  let foundCheese = false;
  let foundBeef = false;
  for (const ingredient of burger) {
    if (ingredient.item === ITEMS.BEEF) {
      foundBeef = true;
      foundCheese = false;
    } else if (foundBeef && ingredient.item === ITEMS.CHEESE) {
      foundCheese = true;
    } else if (!foundBeef && ingredient.item === ITEMS.CHEESE) {
      foundCheese = false;
      break;
    }
  }

  return foundCheese;
}

export const isTheSameBunsType = (burger) => {
  if (burger.length < 2) return false
  const firstIngredientItem = getFirstIngredient(burger).item;
  const lastIngredientItem = getLastIngredient(burger).item;
  return firstIngredientItem.includes('DARK') && lastIngredientItem.includes('DARK') ? true : firstIngredientItem.includes('CLASSIC') && lastIngredientItem.includes('CLASSIC')
}

export const isLettuceBellowBun = (burger) => {
  if (burger.length < 2) return false
  let foundLettuce = false;
  let foundBun = false;

  if (burger.findIndex((elem) => elem.item === ITEMS.LETTUCE) === -1) return true;

  for (const ingredient of burger) {
    if (ingredient.item === ITEMS.LETTUCE) {
      foundLettuce = true;
      foundBun = false;
    } else if (foundLettuce && ingredient.type === TYPES.BUN) {
      foundBun = true;
    }
  }

  return foundLettuce && foundBun;
}
