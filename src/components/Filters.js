import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {

  const {
    filters: {
      text,
      company,
      colors,
      category,
      price,
      min_price,
      max_price,
      shipping
    },
    all_products,
    updateFilter,
    clearFilter,
  } = useFilterContext()


  const categories = getUniqueValues(all_products, 'category')
  const companies = getUniqueValues(all_products, 'company')
  const color = getUniqueValues(all_products, 'colors')
  // console.log(categories)

  return <Wrapper>
    <form onSubmit = {(e) => e.preventDefault()}>
      {/* Search */}
      <div className = "form-control">
        <input 
          type = "text"
          name = "text"
          placeholder = "search"
          className = "search-input"
          value = {text}
          onChange = {updateFilter}
        />
      </div>
      {/*End Search */}

      {/* Category */}
      <div className = "form-control">
        <h5>Category</h5>
        <div>
          {categories.map((item, index) => {
            return (
              <button
                key = {index}
                name = "category"
                type = "button"
                onClick = {updateFilter}
                className = {`${category === item.toLowerCase() ? 'active' : null}`}
              >
                {item}
              </button>
            )
          })}
        </div>
      </div>
      {/* End Category */}

      {/* Company */}
      <div className = "form-control">
        <h5>Company</h5>
        <select 
        name = "company" 
        value = {company}
        className = "company"
        onChange = {updateFilter}
        > 
          {companies.map((item, index) => {
            return (
              <option value = {item} key = {index}>{item}</option>
            )
          })}
        </select>
      </div>
      {/* End Company */}

      {/* Colors */}
      <div className = "form-control">
        <h5>Colors</h5>
        <div className = "colors">
          {color.map((item, index) => {
            if(item === 'all'){
              return (
                <button
                  name = 'colors'
                  className = {`${colors === 'all' ? 'all-btn active' : 'all-btn'} `}
                  onClick = {updateFilter}
                  data-color = 'all'
                >
                  All
                </button>
              )
            }
            return (
              <button 
                key = {index}
                name = "colors"
                style = {{background: item}}
                className = {`${colors === item ? 'color-btn active' : 'color-btn'}`}
                data-color = {item}
                onClick = {updateFilter}
              >
                {colors === item ? <FaCheck /> : null}
              </button>
            )
          })}
        </div>
      </div>
      {/* End Colors */}

      {/* Price */}
      <div className = "form-control">
        <h5>Price</h5>
        <p className = "price">{formatPrice(price)}</p>
        <input 
          type = "range"
          name = 'price'
          min = {min_price}
          max = {max_price}
          value = {price}
          onChange = {updateFilter}
        />
      </div>
      {/* End Price */}

      {/* Shipping */}
      <div className = "form-control shipping">
        <label htmlFor = "shipping">Free Shipping</label>
        <input 
          type = "checkbox"
          name = "shipping"
          id = "shipping"
          onChange = {updateFilter}
          checked = {shipping}
        />
      </div>
      {/* End Shipping */}
    </form>
    {/* Clear */}
     <button type = "button" className = "clear-btn" onClick = {clearFilter}>
          {" "}
          Clear Filter
     </button>
    {/* End Clear */}
  </Wrapper>
}

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
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
