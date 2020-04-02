import React from 'react';
import BaseModel, { BaseModelData } from '../../data/BaseModel';
import { formatBytes } from '../../utils';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '../../utils';
import classnames from 'classnames';

const sortingQueryKey = 'sort';

type SortingConfig = { label: string, value: string }[];

const sortingConfig: SortingConfig = [{
    label: 'Name',
    value: 'file_name'
}, {
    label: 'Size',
    value: 'file_size'
}, {
    label: 'Modified',
    value: 'last_modified'
}];

const Sorters = ({ sortingValue }: { sortingValue: string | null }) => (
    <div className="btn-group flex-align-end ml-auto" role="group">
        {
            sortingConfig.map((sort) => {
                const className = sort.value === sortingValue ? 'btn-dark' : 'btn-light';
                return (
                    <Link to={`?${sortingQueryKey}=${sort.value}`} key={sort.value}>
                        <button type="button" className={classnames('btn btn-sm', className)}>{ sort.label }</button>
                    </Link>
                );
            })
        }
    </div>
);

export interface PagePhotosInterface {
    model: BaseModel
}

const PagePhotos: React.FunctionComponent<PagePhotosInterface> = ({ model }) => {
    const location = useLocation();
    const queryParams = useQuery(location.search);
    const sortingValue = queryParams.get(sortingQueryKey);
    const data = sortingValue && (model.data.data.length && model.data.data.length()) ? model.data.data.sortByKey(sortingValue) : model.data.data;
    return (
        <>
            <div className="row m-0 mb-4">
                <div className="col-12 col-sm-6 pl-0">
                    <div className="row m-0">
                        <div className="mr-1">
                            <button className="border-0 p-2 bg-transparent" title="Upload 1">
                                <i className="fa fa-lg fa-file-image-o"></i>
                            </button>
                        </div>
                        <div className="mr-1">
                            <button className="border-0 p-2 bg-transparent" title="Upload 2">
                                <i className="fa fa-lg fa-folder-o"></i>
                            </button>
                        </div>
                        <div className="mr-1">
                            <button className="border-0 p-2 bg-transparent" title="Upload 3">
                                <i className="fa fa-upload"></i>
                            </button>
                        </div>
                        <div className="mr-1">
                            <button className="border-0 p-2 bg-transparent" title="Upload 4">
                                <i className="fa fa-lg fa-trash-o"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-6 pr-0 d-flex">
                    <Sorters sortingValue={sortingValue} />
                </div>
            </div>
            <div className="row m-0">
                <div className="container-fluid p-0">
                    <div className="row m-0">
                        {data.map((entry: BaseModelData) => {
                            const style = {
                                background: `url(${entry.getByKey('url')}) no-repeat center center`,
                                backgroundSize: 'cover',
                                width: '100%',
                                height: '100%'
                            };
                            return (
                                <div className="card photo-card p-0 col border-0" key={entry.getByKey('file_name')}>
                                    <div style={style}></div>
                                    <div className="card-footer pl-0 pr-0">
                                        <p className="m-0"><small className="text-muted"><strong>{entry.getByKey('file_name')}</strong></small></p>
                                        <p className="m-0"><small className="text-muted">{formatBytes(entry.getByKey('file_size'))}</small></p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PagePhotos;