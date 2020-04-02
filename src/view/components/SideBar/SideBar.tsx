import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import classnames from 'classnames';
import './styles.scss';

const urlIconMap: { [key: string]: JSX.Element } = {
    '/files': <i className="fa fa-file-text-o"></i>,
    '/photos': <i className="fa fa-file-image-o"></i>,
    '/sharing': <i className="fa fa-share-alt"></i>,
    '/links': <i className="fa fa-link"></i>,
    '/events': <i className="fa fa-clock-o"></i>,
    '/get_started': <i className="fa fa-envelope-square"></i>
};

export interface SideBarDataEntry {
    url: string;
    label: string;
    endAdornment?: React.ReactElement;
}

export interface SideBarProps {
    data: SideBarDataEntry[];
}

const ListItem: React.FunctionComponent<SideBarDataEntry> = ({ url, label, endAdornment }) => {
    const icon: React.ReactElement = urlIconMap[url];
    const isMatch = !!useRouteMatch(url);
    return (
        <Link to={url} className="list-group-item-link">
            <li className={classnames('list-group-item d-flex', isMatch && 'active')}>
                { icon }<label>{ label }</label><span className="ml-auto">{ endAdornment }</span>
            </li>
        </Link>
    );
};

const SideBar: React.FunctionComponent<SideBarProps> = ({ data }) => {
    return (
        <div className="sidebar h-100">
            <div className="logo text-center">
                <i className="fa fa-dropbox"></i>
            </div>
            <div className="content">
                <ul className="list-group list-group-flush">
                    {
                        data.map((entry) => (
                            <ListItem
                                url={entry.url}
                                label={entry.label}
                                endAdornment={entry.endAdornment}
                                key={entry.url}
                            />
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default SideBar;