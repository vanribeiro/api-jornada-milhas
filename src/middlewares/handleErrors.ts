import { NextFunction, Request, Response } from "express";
import ErrorBase from "../errors/ErrorBase";

const handleErrors = (
	_error: Error,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
    new ErrorBase().sendAnswer(res);
};

export default handleErrors;