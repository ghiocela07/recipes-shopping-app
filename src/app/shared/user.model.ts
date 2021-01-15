export class User {

    // email: string | undefined;
    // id: string | undefined;
    // private _token: string | undefined;
    // private _tokenExpirationDate: Date | undefined;

    constructor(public email: string, public id: string, private _token: string, private _tokenExpirationDate: Date) {
        // this.email = email;
        // this.id = id;
        // this._token = _token;
        // this._tokenExpirationDate = _tokenExpirationDate
    }

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return undefined;
        }
        return this._token;
    }
}