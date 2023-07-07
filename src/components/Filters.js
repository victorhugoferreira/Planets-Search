import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import StarWarsLogo from '../Star_Wars_Logo.svg.png';
import './Filters.css';


const columnFilter = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export default function Filters() {
  const {
    filterInput, setFilterInput,
    filterType, setFilterType,
    nameSearched, setNameSearched } = useContext(PlanetsContext);

  const handleClick = () => {
    setFilterInput([...filterInput, filterType]);
    setFilterType({
      column: columnFilter[0],
      operator: 'maior que',
      input: 0,
    });
  };

  const handleOptions = (option) => !filterInput
    .find((filter) => option === filter.column);

  const handleChange = ({ target }) => {
    setFilterType({ ...filterType, [target.name]: target.value });
  };

  const removeFilter = ({ target }) => {
    const filterClicked = filterInput
      .filter((filter) => filter.column !== target.parentNode.firstChild.id);
    setFilterInput(filterClicked);
  };

  const removeAllFilters = () => {
    setFilterInput([]);
  };

  return (
    <div className="App">
      <div className="Image">
        <img alt= "Star Wars Logo" src={StarWarsLogo}/>
      </div>
      <form className="TheRest">
        <div className="InputName">
          <input
            type="text"
            name="name"
            value={ nameSearched }
            placeholder="Pesquise por nome"
            data-testid="name-filter"
            onChange={ (e) => { setNameSearched(e.currentTarget.value); } }
          />
        </div>
        <div className="Form">
        <div>
          <label htmlFor="column-filter">
            <select
              name="column"
              data-testid="column-filter"
              value={ filterType.column }
              onChange={ handleChange }
              >
              {columnFilter.filter(handleOptions).map((column) => (
                <option value={ column } key={ column }>
                  {column}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <select
            name="operator"
            data-testid="comparison-filter"
            value={ filterType.operator }
            onChange={ handleChange }
            >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </div>
        <div className="InputNumber">
          <input
            type="number"
            name="input"
            value={ filterType.input }
            data-testid="value-filter"
            onChange={ handleChange }
            />
          </div>
          <div>
          <button
            type="button"
            data-testid="button-filter"
            onClick={ handleClick }
            >
            Filtrar
          </button>
        </div>
          </div>
        <div className="Filters">
          {filterInput.map((item, i) => (
            <div className="Filter"
            key={ i }
            data-testid="filter"
            >
              <div>
              <p id={ item.column }>
                {`${item.column} ${item.operator} ${item.input}`}
              </p>
              </div>
              <div>
              <button
                type="button"
                onClick={ removeFilter }
                >
                X
              </button>
              </div>
            </div>
          ))}
          <div className="RemoveFilters">
            <button
              type="button"
              data-testid="button-remove-filters"
              onClick={ removeAllFilters }
              >
              REMOVER FILTROS
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
