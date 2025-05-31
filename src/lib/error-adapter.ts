export abstract class HttpException extends Error {
    constructor(
        public readonly errorCode: number,
        public readonly message: string       
    ) {
        super(message);
    }
}

export class SessionException extends HttpException {
    constructor() {
        super(401, "Sesión expirada");
    }
}

export class BadRequestException extends HttpException {
    constructor(message = "Información Incorrecta") {
        super(400, message);
    }
}

export class DuplicatedObjectException extends HttpException {
    constructor(message = "Ya existe un elemento con esas propiedades") {
        super(400, message);
    }
}

export class NotFoundException extends HttpException {
    constructor(message = "No se existe ese elemento") {
        super(404, message);
    }
}

export class FetchFailedException extends HttpException {
    constructor(
        public message: string, 
        public errorCode: number
    ) {
        super(errorCode, message);
    }
}
