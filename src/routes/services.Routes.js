import {  Router } from "express";
import {  validateSchemas} from "../middlewares/validateSchema.js"
import { addLinkSchema } from "../schemas/urlSchemas.js";
import { validateAuth } from "../middlewares/validateAuth.js";
import { getService, addService, getAvailableServices, patchService } from "../controllers/servicesControllers.js";

const servicesRouter = Router();

servicesRouter.get('/services/:id', getService)
servicesRouter.get('/services', getAvailableServices)
servicesRouter.post('/services/create', validateAuth, addService)
servicesRouter.patch('/my-services/:id', validateAuth, patchService)

/*servicesRouter.get('/urls/:id', getURL)
servicesRouter.get('/urls/open/:shortUrl', openURL)

servicesRouter.delete('/urls/:id', validateAuth, deleteURL)
servicesRouter.patch('/urls/:id', validateAuth, nickURL)
*/
export default servicesRouter;
