import React from 'react';


const LoadingCmpt = () => {
    return (
        <div className="row">
            <div className="valign-wrapper" style={{ minHeight: "400px" }}>
                <div className="col s12 center-align">
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoadingCmpt;

