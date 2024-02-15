import { errorCodes, errorMessages } from "../const/errorCodes";
import { CustomError } from "./CustomError";

export class DatabaseError extends CustomError {
    constructor(message: string){
        super(message, errorCodes.DatabaseError);
        this.name = errorMessages.DatabaseErrorMessage;
    }
}