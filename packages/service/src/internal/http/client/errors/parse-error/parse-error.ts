import { BaseError } from 'make-error-cause';

export class ParseError extends BaseError {
    public constructor(message?: string, cause?: Error) {
        super(message, cause);
    }
}
