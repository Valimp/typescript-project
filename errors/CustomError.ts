export class CustomError extends Error {
    errorcode: number; // Add the 'errorcode' property
    constructor(message: string, errorcode: number) {
        super(message);
        this.name = "CustomError";
        this.errorcode = errorcode;
    }
}