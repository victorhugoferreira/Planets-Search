import React, { useMemo, useEffect, useState } from 'react';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [search, setSearch] = useState([]);
  const [nameSearched, setNameSearched] = useState('');
  const [filterType, setFilterType] = useState({
    name: '',
    column: 'population',
    operator: 'maior que',
    input: 0,
  });
  const [filterInput, setFilterInput] = useState([]);

  useEffect(() => {
    async function fetchAPI() {
      try {
        const fetchInfo = await fetch('https://swapi.dev/api/planets');
        const response = await fetchInfo.json();
        const data = response.results;
        const planetsData = data.map((planet) => {
          delete planet.residents;
          return planet;
        });
        setPlanets(planetsData);
        setSearch(planetsData);
      } catch (e) {
        throw new Error(e);
      }
    }
    fetchAPI();
  }, []);

  useEffect(() => {
    function filterClick() {
      let filterName = planets.filter((element) => element.name.toUpperCase()
        .includes(nameSearched.toUpperCase()));

      filterInput.forEach((filter) => {
        const { column, operator, input } = filter;
        if (operator === 'maior que') {
          filterName = filterName.filter((element) => +element[column] > +input);
        }
        if (operator === 'menor que') {
          filterName = filterName.filter((element) => +element[column] < +input);
        }
        if (operator === 'igual a') {
          filterName = filterName
            .filter((element) => +element[column] === +input);
        }
      });

      setSearch(filterName);
    }
    filterClick();
  }, [filterInput, planets, filterType, nameSearched]);

  const values = useMemo(() => ({
    planets,
    setPlanets,
    search,
    nameSearched,
    setNameSearched,
    filterInput,
    setFilterInput,
    filterType,
    setFilterType,
  }), [planets, nameSearched, setNameSearched, search,
    filterInput, setFilterInput, filterType]);

  return (
    <PlanetsContext.Provider value={ values }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  // children: PropTypes.shape().isRequired,
}.isRequired;

export default PlanetsProvider;