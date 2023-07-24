import { NextFunction, Request, Response } from "express";
import ErrorBase from "../errors/ErrorBase";

const handleErrors = (
	error: Error,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	if (error instanceof ErrorBase) {
		error.sendAnswer(res);
	} else {
		new ErrorBase().sendAnswer(res);
	}
};

export default handleErrors;
