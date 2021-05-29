import { makeAutoObservable } from 'mobx';

export default class DeviceStore 
{
    private _types:any[];
    private _selected_type:any;
    private _brands:any[];
    private _selected_brand:any;
    private _devices:any[];
    private _page:number;
    private _total_count:number;
    private _limit:number;

    constructor()
    {
        this._types = [];
        this._selected_type = {};
        this._brands = [];
        this._selected_brand = {};
        this._devices = [];

        this._page = 1;
        this._total_count = 0;
        this._limit = 9;

        makeAutoObservable(this);
    }

    set_types(types:any) { this._types = types; }

    set_selected_type(type:any) 
    { 
        this.set_page(1);
        this._selected_type = type; 
    }

    set_brands(brands:any) { this._brands = brands; }

    set_selected_brand(brand:any) 
    { 
        this.set_page(1);
        this._selected_brand = brand; 
    }

    set_devices(devices:any) { this._devices = devices; }

    set_page(page:any) { this._page = page; }

    set_total_count(total_count:any) { this._total_count = total_count; }

    set_limit(limit:any) { this._limit = limit; }


    get types() { return this._types; }

    get selected_type() { return this._selected_type; }

    get brands() { return this._brands; }

    get selected_brand() { return this._selected_brand; }

    get devices() { return this._devices; }

    get page() { return this._page; }

    get total_count() { return this._total_count; }

    get limit() { return this._limit; }
}