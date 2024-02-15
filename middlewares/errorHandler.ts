import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/CustomError";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof CustomError) {
        res.status(500).json({error: err.errorcode});
    } else {
        res.status(500).json({error: "Erreur inconnue"});
    }
    next(err);
}