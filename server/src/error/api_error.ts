class ApiError extends Error
{
    status:any;

    constructor(status:any, message:any)
    {
        super();
        this.status = status;
        this.message = message;
    }

    static bad_request(message:any)
    {
        return new ApiError(404, message)
    }

    static internal(message:any)
    {
        return new ApiError(500, message)
    }

    static forbidden(message:any)
    {
        return new ApiError(403, message)
    }
}

module.exports = ApiError;