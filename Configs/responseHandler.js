class ResponseHandler {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    sender(code, message, data, error) {
        if (error) {
            if (error.code === "LIMIT_FILE_SIZE")
                return this.res
                    .status(STATUS_CODES.NOT_ALLOWED)
                    .json({
                        message: error.message
                    })

            // HANDLE LOGS AND OTHER STUFF
            console.log("-----------------------------------------------------------------")
            console.error(this.req.method + " : " + this.req.originalUrl);
            console.error("ERROR", error);
            console.error("Headers : ", JSON.stringify(this.req.headers));
            console.error("Body : ", JSON.stringify(this.req.body));
            console.log("-----------------------------------------------------------------")
        }

        this.res
            .status(code)
            .json({
                message: (typeof message === 'string' ? this.res.__(message) : this.res.__(message.key, message.value)),
                data
            })
    }

    custom(...args) { this.sender(...args) }

    // 2XX SUCCESS
    success(message, data) {
        this.sender(
            STATUS_CODES.SUCCESS,
            message || 'STATUS.SUCCESS',
            data
        )
    }

    created(message, data) {
        this.sender(
            STATUS_CODES.CREATED,
            message || 'STATUS.CREATED',
            data
        )
    }

    // 4XX CLIENT ERROR
    badRequest(message, data) {
        this.sender(
            STATUS_CODES.BAD_REQUEST,
            message || 'STATUS.BAD_REQUEST',
            data
        )
    }

    unauthorized(message, data, error) {
        this.sender(
            STATUS_CODES.UNAUTHORIZED,
            message || 'STATUS.UNAUTHORIZED',
            data, error
        )
    }

    forbidden(message, data, error) {
        this.sender(
            STATUS_CODES.FORBIDDEN,
            message || 'STATUS.FORBIDDEN',
            data, error
        )
    }

    notFound(message, data, error) {
        this.sender(
            STATUS_CODES.NOT_FOUND,
            message || 'STATUS.NOT_FOUND',
            data, error
        )
    }

    conflict(message, data, error) {
        this.sender(
            STATUS_CODES.CONFLICT,
            message || 'STATUS.CONFLICT',
            data, error
        )
    }

    preconditionFailed(message, data, error) {
        this.sender(
            STATUS_CODES.PRECONDITION_FAILED,
            message || 'STATUS.PRECONDITION_FAILED',
            data, error
        )
    }

    validationError(message, error) {
        this.sender(
            STATUS_CODES.VALIDATION_ERROR,
            message || 'STATUS.VALIDATION_ERROR',
            error
        )
    }

    // 5XX SERVER ERROR
    serverError(error) {
        console.log("error", error)
        this.sender(
            STATUS_CODES.SERVER_ERROR,
            'STATUS.SERVER_ERROR',
            undefined,
            error
        )
    }

    notAllowed(message, error) {
        this.sender(
            STATUS_CODES.NOT_ALLOWED,
            message || 'STATUS.NOT_ALLOWED',
            error
        )
    }

    serviceUnavailable(message, error) {
        this.sender(
            STATUS_CODES.SERVICE_UNAVAILABLE,
            message || 'STATUS.SERVICE_UNAVAILABLE',
            undefined, undefined,
            error
        )
    }
}

module.exports = ResponseHandler;

