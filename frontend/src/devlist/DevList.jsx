import React, { useState, useEffect } from 'react';
import DevItem from './DevItem';

const DevList = ({ devs }) => {

    return (
        <main>
            <ul className="dev-list">
                {devs.map(dev => <DevItem key={dev._id} {...dev} />)}
            </ul>
        </main>
    );
};

export default DevList;