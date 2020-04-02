import data from './data';

class DataSource {
    private _data = data;

    request<T>(url: string) {
        return new Promise<T>((resolve) => {
            const delay = this.getRandomDelay();
            let result: any;
            switch (url) {
                case '/':
                    result = this._data.map(entry => {
                        return {
                            ...entry,
                            data: []
                        }
                    });
                    break;
                default:
                    result = this._data.find((entry) => entry.url === url);
                    break;
            }
            setTimeout(() => {
                resolve(result);
            }, delay);
        })
    }

    get<T>(url: string) {
        return this.request<T>(url);
    }

    getRandomDelay(min = 999, max = 2999) {
        return Math.random() * (max - min) + min;
    }
}

export default DataSource;