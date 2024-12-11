import { Router, Request, Response } from "express";
import { getItems, addProduct, addService, addSubscription } from "./storage";
import { Product, Service, Subscription } from "./types";
import {
  validateProduct,
  validateService,
  validateSubscription,
} from "./validators";

const router = Router();

const generateFourDigitId = (): string => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

router.get("/items", (req: any, res: any) => {
  try {
    const items = getItems();
    const isEmpty = !Object.values(items).some(
      (itemArray) => itemArray.length > 0
    );

    if (isEmpty) {
      return res.status(404).json({ message: "No items found" });
    }
    return res.json(items);
  } catch (err) {
    const error = err as Error;
    return res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
});

// POST /items: Add a new item based on type
router.post("/items", (req: any, res: any) => {
  const data = req.body;

  if (!data.type) {
    return res.status(400).json({ error: "'type' is a required field" });
  }

  let validation;
  let createdItem;
  const id = generateFourDigitId();

  switch (data.type) {
    case "product":
      validation = validateProduct(data as Product);
      if (!validation.isValid) {
        return res.status(400).json({ error: validation.error });
      }
      createdItem = { id, type: data.type, ...data };
      addProduct(createdItem as Product);
      break;

    case "service":
      validation = validateService(data as Service);
      if (!validation.isValid) {
        return res.status(400).json({ error: validation.error });
      }
      createdItem = { id, type: data.type, ...data };
      addService(createdItem as Service);
      break;

    case "subscription":
      validation = validateSubscription(data as Subscription);
      if (!validation.isValid) {
        return res.status(400).json({ error: validation.error });
      }
      createdItem = { id, type: data.type, ...data };
      addSubscription(createdItem as Subscription);
      break;

    default:
      return res.status(400).json({
        error:
          "Invalid 'type'. Must be 'product', 'service', or 'subscription'",
      });
  }

  return res
    .status(201)
    .json({ message: "Item added successfully", item: createdItem });
});

export default router;
