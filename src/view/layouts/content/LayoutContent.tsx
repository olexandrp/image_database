import React from 'react';
import BaseComponent from '../../components/BaseComponent';
import DataManager from '../../../data/DataManager';
import BaseCollection from '../../../data/BaseCollection';
import { BaseModelData } from '../../../data/BaseModel';
import Spinner from '../../components/Spinner';
import './styles.scss'

export interface ContentLayoutProps {
    sectionName: string;
}

export interface ContentLayoutState {
    data: BaseModelData | null;
    PageContent: any | null;
}

class LayoutContent extends BaseComponent<ContentLayoutProps, ContentLayoutState> {
    protected _sectionModel?: BaseCollection | any;

    constructor(props: ContentLayoutProps) {
        super(props);
        this.state = {
            PageContent: null,
            data: null
        };
        this.init();
    }

    init() {
        const { sectionName } = this.props;
        this._sectionModel = DataManager.getByUrl(`/${sectionName}`);
        this.unSubscribe();
        this.initSubscriptions(
            this._sectionModel,
            {
                change: this.handleChange
            }
        );
        this.getComponent(sectionName);
        this._sectionModel && this._sectionModel.fetch();
    }

    handleChange = (data: BaseModelData) => {
        this.updateState({
            ...this.state,
            data
        });
    };

    getComponent = async (sectionName: string) => {
        let pageContentComponent: { default: null | React.ReactComponentElement<any> } = { default: null };
        try {
            pageContentComponent = await import(`../../pages/${sectionName}`);
        } catch(e) {
            console.error(`No page component <${sectionName}>`);
        }
        this.updateState({
            ...this.state,
            PageContent: pageContentComponent.default
        });
    };

    componentDidUpdate(prevProps: ContentLayoutProps) {
        if (this.props.sectionName !== prevProps.sectionName) {
            this.init();
        }
    }

    render() {
        const { PageContent } = this.state;
        if (!PageContent || !this._sectionModel) {
            return <Spinner />;
        }
        const label = this._sectionModel.getByKey('label');
        return (
            <div className="layout-content container-fluid h-100 p-0">
                <div className="row m-0">
                    <div className="col-12 col-sm-6 pl-0">
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text border-0 bg-transparent">
                                    <i className="fa fa-search"></i>
                                </div>
                            </div>
                            <input type="text" className="form-control border-0 pl-0" id="inlineFormInputGroup" placeholder="Search..." />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 ml-auto row justify-content-end">
                        <div><i className="fa fa-bell-o"></i></div>
                        <div className="ml-2">Eddie Lobanovsky</div>
                    </div>
                </div>
                <div className="row m-0 mt-4 mb-4">
                    <h5>{ label }</h5>
                </div>
                { PageContent && <PageContent model={this._sectionModel} /> }
            </div>
        );
    }
}

export default LayoutContent;