import React from 'react';
import CreateDevForm from './CreateDevForm';

const Sidebar = ({ addDev }) => {
    return (
        <div className="sidebar">
            <h1>Cadastrar</h1>
            <CreateDevForm addDev={addDev} />
        </div>
    );
};

export default Sidebar;