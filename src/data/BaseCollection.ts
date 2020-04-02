import EventEmmiter from 'eventemitter3';
import DataSource from '../data_source';
import BaseModel, { BaseModelData } from './BaseModel';

class BaseCollection {
    protected _url: string;
    protected _data: BaseModel[];
    protected _dataSource: DataSource;
    protected _events: EventEmmiter;

    constructor(url: string, data: BaseModel[] = []) {
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

    get data() {
        if (this.isEmpty()) {
            this.fetch();
        }
        return this._data;
    }

    set data(data: any[]) {
        data.map((entry) => {
            const model = new BaseModel(entry.url, entry as BaseModelData);
            this.addModel(model);
        })
        this.emitChange();
    }

    addModel(model: BaseModel) {
        if (this._data.length) {
            const modelExist = this._data.some((entry) => entry.url === model.url);
            if (!modelExist) {
                this._data.push(model);
            }
        } else {
            this._data = [model];
        }
    }

    fetch() {
        this._dataSource.get<any[]>(this._url).then((data) => {
            this.data = data;
        })
    }

    isEmpty() {
        return !this._data.length;
    }

    map<T>(callback: (entry: BaseModel) => any) {
        return this._data.map<T>((entry) => callback(entry));
    }

    sort<T>(callback: ((a: BaseModel, b: BaseModel) => number) | undefined) {
        const dataForSorting = [...this._data];
        dataForSorting.sort(callback);
        return dataForSorting;
    }

    sortByKey(sortingKey: string) {
        return this.sort((entry1: BaseModel, entry2: BaseModel) => {
            if (entry1.getByKey(sortingKey) < entry2.getByKey(sortingKey)) return -1;
            if (entry1.getByKey(sortingKey) > entry2.getByKey(sortingKey)) return 1;
            return 0;
        });
    }

    subByKey(sumKey: string) {
        return this._data.reduce((accumulator, currentValue) => accumulator + currentValue.getByKey(sumKey));
    }

    findModelByKey(key: string, value: any) {
        return this._data.find((entry) => {
            return entry.getByKey(key) === value;
        });
    }

    length() {
        return this._data.length;
    }
}

export default BaseCollection;