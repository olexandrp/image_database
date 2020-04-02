import EventEmmiter from 'eventemitter3';
import DataSource from '../data_source';
import BaseCollection from "./BaseCollection";

export type BaseModelData = {
    [key: string]: any
}

class BaseModel {
    protected _url: string;
    protected _data: BaseModelData;
    protected _dataSource: DataSource;
    protected _events: EventEmmiter;

    constructor(url: string, data: BaseModelData = {}) {
        this._url = url;
        this._data = data;
        this._dataSource = new DataSource();
        this._events = new EventEmmiter();
    }

    on(eventName: string, callback: (arg0?: any) => void) {
        this._events.on(eventName, callback);
    }

    off(eventName: string, callback?: (arg0?: any) => void) {
        this._events.off(eventName, callback);
    }

    emitChange() {
        this._events.emit('change', this._data);
    }

    get url() {
        return this._url;
    }

    get data() {
        if (this.isEmpty()) {
            this.fetch();
        }
        return this._data;
    }

    fetch() {
        this._dataSource.get<any[]>(this._url).then((data: any) => {
            this._data = {
                ...data,
                data: new BaseCollection(this._url, data.data.map((entry: any, index: number) => new BaseModel(`${this._url}/${index}`, entry)))
            };
            this.emitChange();
        })
    }

    getByKey(key: string) {
        return this._data[key];
    }

    isEmpty() {
        return Object.keys(this._data).length === 0;
    }
}

export default BaseModel;