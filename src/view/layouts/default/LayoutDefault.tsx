import React from 'react';
import DataManager from '../../../data/DataManager';
import BaseCollection from '../../../data/BaseCollection';
import BaseModel from '../../../data/BaseModel';
import BaseComponent from '../../components/BaseComponent';
import { match } from 'react-router';
import { History } from 'history';
import Spinner from '../../components/Spinner';
import SideBar, { SideBarDataEntry } from '../../components/SideBar';
import DataAmount from '../../components/DataAmount';
import UpgradeAccount from '../../components/UpgradeAccount';
import LayoutContent from '../content/LayoutContent';
import './styles.scss';

export interface RouteParams {
    sectionName: string;
}

export interface LayoutDefaultProps {
    history: History;
    match: match<RouteParams>;
}

export interface LayoutDefaultState {
    data: BaseModel[]
}

class LayoutDefault extends BaseComponent<LayoutDefaultProps, LayoutDefaultState> {
    protected _collection: BaseCollection;

    constructor(props: LayoutDefaultProps) {
        super(props);
        this._collection = DataManager.getRoot();
        this.state = {
            data: this._collection.data
        };
    }

    componentDidMount() {
        super.componentDidMount();
        this.initSubscriptions(
            this._collection,
            {
                change: this.handleChange
            }
        );
        this._collection.fetch()
    }

    handleChange = (data: BaseModel[]) => {
        this.updateState({ data });
    };

    initialRedirect = () => {
        this.props.history.replace('/photos');
    };

    render() {
        const { match } = this.props;
        const sectionName = match.params.sectionName;
        const { data } = this.state;
        const sectionModel = this._collection.findModelByKey('url', `/${sectionName}`);
        const dataAmount = sectionModel && sectionModel.getByKey('data_amount');
        if (!data.length) {
            return <Spinner />;
        }
        if (!sectionName) {
            // no entry in the router because we suppose that we have no idea about main sections
            setTimeout(() => {
                this.initialRedirect();
            }, 0);
        }
        const sideBarData = this._collection.map<SideBarDataEntry>((model) => {
            return {
                url: model.url,
                label: model.getByKey('label'),
                endAdornment: (
                    model.url === '/get_started'
                        ? <span className="badge">3</span>
                        : void 0
                )
            };
        });
        return (
            <div className="layout-default container-fluid h-100">
                <div className="row h-100">
                    <div className="layout-default-sidebar col d-flex flex-column">
                        <SideBar data={sideBarData} />
                        {
                            dataAmount && <DataAmount dataAmount={dataAmount} />
                        }
                        <UpgradeAccount />
                    </div>
                    <div className="layout-default-content col">
                        <LayoutContent sectionName={sectionName} />
                    </div>
                </div>
            </div>
        );
    }
}

export default LayoutDefault;