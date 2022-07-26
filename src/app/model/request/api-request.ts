export class ApiRequest<T> {
    body: T;

    constructor(body: T) {
        this.body = body;
    }
}