import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useFilterContext } from '../context/filter_context';
import { getUniqueValues, formatPrice } from '../utils/helpers';
import { FaCheck } from 'react-icons/fa';

const Filters: React.FC = () => {
  const [showMoreFiltersButton, setShowMoreFiltersButton] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const {
    all_products,
    filters: {
      text,
      company,
      category,
      color,
      min_price,
      max_price,
      price,
      shipping,
    },
    updateFilters,
    clearFilters,
  } = useFilterContext();

  const categories = getUniqueValues(all_products, 'category');
  const companies = getUniqueValues(all_products, 'company');
  const colors = getUniqueValues(all_products, 'colors');

  // This function handles button clicks and creates a synthetic event with relevant data, then calls the 'updateFilters' function with the synthetic event.
  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    const syntheticEvent = {
      target: {
        name: event.currentTarget.name,
        value: event.currentTarget.value,
        dataset: {
          color: event.currentTarget.dataset.color,
          category: event.currentTarget.dataset.category,
        },
      },
    } as any;
    updateFilters(syntheticEvent);
  };

  // This useEffect handles window resize events, toggling the visibility of the 'More Filters'
  // button and additional filters based on the screen size. It sets up the event listener,
  // handles the initial setup, and cleans up the listener when the component unmounts.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setShowMoreFiltersButton(true);
        setShowFilters(false);
      } else {
        setShowMoreFiltersButton(false);
        setShowFilters(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMoreFiltersClick = () => {
    setShowFilters(!showFilters);
  };

  return (
    <Wrapper>
      <div className="content">
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
          className="form-container"
        >
          <div className="input-container">
            {/* search input */}
            <div className="form-control">
              <input
                type="text"
                name="text"
                placeholder="search"
                className="search-input"
                value={text}
                onChange={updateFilters}
              />
            </div>
            {/* end of search input */}

            {/* Show/hide filters button */}
            {showMoreFiltersButton && (
              <button
                type="button"
                className="more-filters-btn btn filters-btn"
                onClick={handleMoreFiltersClick}
              >
                {showFilters ? 'Less Filters' : 'More Filters'}
              </button>
            )}
          </div>

          {/* Filter controls */}
          {showFilters && (
            <div className="filter-controls">
              {/* categories */}
              <div className="form-control">
                <h5>category</h5>
                <div>
                  {categories.map((c, index) => {
                    return (
                      <button
                        type="button"
                        key={index}
                        name="category"
                        data-category={c.toLowerCase()}
                        className={`${
                          category === c.toLowerCase() ? 'active' : null
                        }`}
                        onClick={handleButtonClick}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* end of categories */}
              {/* companies */}
              <div className="form-control">
                <h5>company</h5>
                <select
                  name="company"
                  className="company"
                  value={company}
                  onChange={updateFilters}
                >
                  {companies.map((c, index) => {
                    return (
                      <option key={index} value={c}>
                        {c}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* end of companies */}
              {/* colors */}
              <div className="form-control">
                <h5>colors</h5>
                <div className="colors">
                  {colors.map((c, index) => {
                    if (c === 'all') {
                      return (
                        <button
                          key={index}
                          name="color"
                          onClick={handleButtonClick}
                          data-color="all"
                          className={`${
                            color === 'all' ? 'all-btn active' : 'all-btn'
                          }`}
                        >
                          all
                        </button>
                      );
                    }
                    return (
                      <button
                        type="button"
                        key={index}
                        name="color"
                        style={{ background: c }}
                        className={`${
                          color === c ? 'color-btn active' : 'color-btn'
                        }`}
                        data-color={c}
                        onClick={handleButtonClick}
                      >
                        {color === c ? <FaCheck /> : null}
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* ens of colors */}
              {/* price input */}
              <div className="form-control">
                <h5>price</h5>
                <p className="price">{formatPrice(price)}</p>
                <input
                  type="range"
                  name="price"
                  onChange={updateFilters}
                  min={min_price}
                  max={max_price}
                  value={price}
                />
              </div>
              {/* end of price input */}
              {/* shipping */}
              <div className="form-control shipping">
                <label htmlFor="shipping">free shipping</label>
                <input
                  type="checkbox"
                  name="shipping"
                  id="shipping"
                  onChange={updateFilters}
                  checked={shipping}
                />
              </div>
              {/* end of shipping */}
            </div>
          )}

          <button type="button" className="clear-btn" onClick={clearFilters}>
            Clear Filters
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  .filters-btn {
    display: flex;
    align-items: center;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
    margin-bottom: 1.75rem;
    margin-left: 1rem;
  }
  .form-container {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
  }

  .input-container {
    display: flex;
    align-items: center;
    margin-right: 1rem;
  }

  .filter-controls {
    flex-basis: 100%;
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
    @media (max-width: 768px) {
      .form-control:not(:first-child) {
        display: none;
      }
      .more-filters-btn {
        display: block;
      }
      .form-container {
        align-content: center;
      }
      .form-control:first-child {
        margin-bottom: 0;
      }
    }
  }
`;

export default Filters;
