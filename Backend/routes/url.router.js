import { generateShortUrl, getLongUrl, getUrls } from "../controllers/url.controller.js";
import analytics from "../middlewares/analytics.middlewear.js";
import { checkForToken } from "../middlewares/user.middleware.js";
import { Router } from "express";

const urlRouter = Router();

urlRouter.post("/generate", checkForToken, generateShortUrl);

urlRouter.get("/geturls", checkForToken, getUrls);

urlRouter.get("/:code",analytics, getLongUrl);

export { urlRouter };
