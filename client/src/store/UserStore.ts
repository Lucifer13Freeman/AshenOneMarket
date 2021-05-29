import { makeAutoObservable } from 'mobx';

export default class UserStore 
{
    private _is_auth:boolean;
    private _user:any;

    constructor()
    {
        this._is_auth = false;
        this._user = {};
        makeAutoObservable(this);
    }

    set_is_auth(bool:boolean) { this._is_auth = bool; }

    set_user(user:any) { this._is_auth = user; }

    get is_auth() { return this._is_auth; }

    get user() { return this._user; }
}