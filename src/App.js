import React from 'react';
import './App.css';
import Filters from './components/Filters';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <div className="App-logo">
        <Filters />
        <Table />
      </div>
    </PlanetsProvider>
  );
}

export default App;
