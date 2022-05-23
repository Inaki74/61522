//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
class HttpError extends Error{
    constructor(message, status_code){
        super(message);
        this.status = status_code;
        this.name   = 'HttpError';
    }
}
module.exports = HttpError;