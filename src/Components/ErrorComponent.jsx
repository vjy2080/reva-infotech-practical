import React from 'react';

const ErrorComponent = ({ message }) => {
    return (
        <div className="d-flex justify-content-end me-3">
            <span className='error'>{message}</span>
        </div>
    );
};

export default ErrorComponent;
