import HttpException from "./http-base-exception";

export class DuplicateException extends HttpException {
    constructor(name: string) {
        super(400, `Input with value '${name}' already exists.`);
    }
}

export class UnAuthenticated extends HttpException {
    constructor() {
        super(401, `User not authenticated/authorized to perform this action.`);
    }
}

export class ForeignKeyException extends HttpException {
    constructor(name: string) {
        super(400, `No reference found for the constraint '${name}' in the system.`);
    }
}

export class RecordNotFoundException extends HttpException {
    constructor(tdeiRecord: string) {
        super(404, `Record not found for the record '${tdeiRecord}'.`);
    }
}




