import React from 'react';
import './styles.scss';

const UpgradeAccount = () => {
    return (
        <div className="upgrade-account">
            <button type="button" className="btn btn-outline-primary w-100">
                &uarr;<span>Upgrade account</span>
            </button>
        </div>
    );
};

export default UpgradeAccount;