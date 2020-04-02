import React from 'react';
import { formatBytes } from '../../../utils';
import './styles.scss';

const DataAmount = ({ dataAmount = 0 }: { dataAmount: number }) => {
    const totalAmount = 31457280;
    const amount = formatBytes(dataAmount, 1);
    const total = formatBytes(totalAmount, 1);
    const percentage = dataAmount * 100 / totalAmount;
    return (
        <div className="data-amount">
            <div className="data-amount-text container-fluid">
                <div className="row d-flex">
                    <div className="storage-amount">{ amount } / { total }</div>
                    <div className="ml-auto">
                        <a href="#">
                            <span className="plus-icon"><span>+</span></span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="data-amount-progress container-fluid p-0 m-0">
                <div className="row p-0 m-0 w-100">
                    <div className="progress w-100">
                        <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataAmount;