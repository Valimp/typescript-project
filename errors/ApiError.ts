import { errorCodes, errorMessages } from "../const/errorCodes";
import { CustomError } from "./CustomError";

export class ApiError extends CustomError {
    constructor(message: string){
        super(message, errorCodes.ApiError);
        this.name = errorMessages.ApiErrorMessage;
    }
}