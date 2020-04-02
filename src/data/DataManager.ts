import DataSource from '../data_source';
import BaseCollection from './BaseCollection';
import EventEmmiter from 'eventemitter3';

class DataManager {
    private _dataSource: DataSource;
    private _data: BaseCollection;
    private _events: EventEmmiter;

    constructor() {
        this._dataSource = new DataSource();
        this._data = new BaseCollection('/');
        this._events = new EventEmmiter();
    }

    init() {
        this._data.fetch();
    }

    on(eventName: string, callback: (arg0?: any) => void) {
        this._events.on(eventName, callback);
    }

    off(eventName: string, callback?: (arg0?: any) => void) {
        this._events.off(eventName, callback);
    }

    getRoot() {
        if (!this._data.isEmpty()) {
            this.fetchRoot();
        }
        return this._data;
    }

    fetchRoot() {
        this._data.fetch();
    }

    getByUrl(url: string) {
        return this._data.findModelByKey('url', url);
    }
}

// fake singleton
export default new DataManager();