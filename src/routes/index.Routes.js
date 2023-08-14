import { Router } from "express";
import usersRouter from "./users.Routes.js";
import servicesRouter from "./services.Routes.js";

const router = Router();

router.use(usersRouter);
router.use(servicesRouter);

export default router;
