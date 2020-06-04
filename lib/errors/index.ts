

export class BaseError extends Error {

    constructor(message: string, code: string) {
        super(message)
    }

    toJSON() {
        const alt = {};

        Object.getOwnPropertyNames(this).forEach(function (key) {
            alt[key] = this[key];
        }, this);

        return alt;
    }
}



export class InvalidSchemeClassError extends BaseError {

    constructor() {
        super(
            'invalid scheme class.',
            '10001'
        )
    }
}

export class MultipleSchemeRefDefinitionError extends BaseError {

    constructor() {
        super(
            'multiple SchemeRef definition are not allowed.',
            '10002'
        )
    }
}


export class ArrayOfSchemeRefAppliedOnNonArrayVelueError extends BaseError {

    constructor() {
        super(
            'ArrayOfSchemeRef definition applied on a non array value. \n ' +
            'Validate the field\'s value to be exist and an array first.',
            '10003'
        )
    }
}
