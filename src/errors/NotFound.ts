import ErrorBase from "./ErrorBase";

class NotFound extends ErrorBase {
	declare message: string;
	constructor(message: string = "Recurso não encontrado") {
		super(message, 404);
		this.message = message;
	}
}

export default NotFound;
