import React, { useState, useEffect } from 'react';

import './global.css';
import './main.css';
import Sidebar from './sidebar/Sidebar';
import DevList from './devlist/DevList';

const App = () => {

  const [devs, setDevs] = useState([]);

  useEffect(() => {
    const getDevs = async () => {
      const response = await fetch('http://localhost:3333/devs');
      const data = await response.json();

      setDevs([...devs, ...data]);
    }

    getDevs();
  }, []);

  const addDev = (newDev) => {
    console.log(newDev);
    setDevs([...devs, newDev]);
  }

  return (
    <div className="content">
      <Sidebar addDev={addDev} />
      <DevList devs={devs} />
    </div>
  );
}

export default App;
