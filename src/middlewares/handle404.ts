import { NextFunction, Request, Response } from "express";
import NotFound from "../errors/NotFound";

function handle404(_req: Request, res: Response, next: NextFunction) {
	const error404 = new NotFound();
	res.status(400).json(error404);
	next();
}

export default handle404;