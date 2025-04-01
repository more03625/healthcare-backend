import express, { Request, Response, NextFunction } from "express";
import { staffController } from "../controllers";
import { validate } from "../../utils";
import { staffSchema } from "../schemas";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await staffController.getAllStaff(req.query);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

router.post("/", validate(staffSchema.create), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await staffController.addStaff(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", validate(staffSchema.update), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await staffController.updateStaff(Number(req.params.id), req.body);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await staffController.deleteStaff({ id: req.params.id });
        res.json(result);
    } catch (error) {
        next(error);
    }
});

export default router;
