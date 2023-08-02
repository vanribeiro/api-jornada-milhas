import { Response } from "express";

class ErrorBase {
    message: string;
    status: number;

	constructor(
		message: string = "Erro interno do servidor",
		status: number = 500
	) {
        this.message = message;
        this.status = status;
    }

    async sendAnswer(res: Response){
        return res.status(this.status).send({
            message: this.message,
            status: this.status
        });
    }
}

export default ErrorBase;
