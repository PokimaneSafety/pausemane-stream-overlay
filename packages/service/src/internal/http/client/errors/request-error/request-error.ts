import { BaseError } from 'make-error-cause';

export class RequestError extends BaseError {
    public constructor(message?: string, cause?: Error) {
        super(message, cause);
    }
}
