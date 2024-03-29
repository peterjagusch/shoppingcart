import React from 'react'
import { Form, Button } from 'react-bootstrap'
import Rating from './Rating'
import styles from './styles.css'
import { CartState } from '../context/Context'

export const Filter = () => {

    const {
        productDispatch,
        productState: { byStock, byFastDelivery, sort, byRating },
      } = CartState();
    
    return (
        <div className='filters'>
            <span className='title'></span>
            <span>
                <Form.Check
                    inline
                    label="Ascending"
                    name="group1"
                    type="radio"
                    id={'inline-1'}
                    onChange={() =>
                        productDispatch({
                            type: "SORT_BY_PRICE",
                            payload: "lowToHigh"
                        })
                    }
                    checked={sort === "lowToHigh" ? true : false}
                />
            </span>
            <span>
                <Form.Check
                    inline
                    label="Descending"
                    name="group1"
                    type="radio"
                    id={'inline-2'}
                    onChange={() =>
                        productDispatch({
                            type: "SORT_BY_PRICE",
                            payload: "highToLow"
                        })
                    }
                    checked={sort === "highToLow" ? true : false}
                />
            </span>
            <span>
                <Form.Check
                    inline
                    label="Include out of stock"
                    name="group1"
                    type="checkbox"
                    id={'inline-3'}
                    onChange={(i) =>
                        productDispatch({
                            type: "FILTER_BY_STOCK",
                        })
                    }
                    checked={byStock}
                />
            </span>
            <span>
                <Form.Check
                    inline
                    label="Fast delivery only"
                    name="group1"
                    type="checkbox"
                    id={'inline-4'}
                    onChange={(i) =>
                        productDispatch({
                            type: "FILTER_BY_DELIVERY",
                        })
                    }
                    checked={byFastDelivery}

                />
            </span>
            <span>
                <label style={{ paddingRight: 10 }}> Rating</label>
                <Rating
                    rating={byRating}
                    onClick={(i) =>
                        productDispatch({
                            type: "FILTER_BY_RATING",
                            payload: i + 1
                        })
                    }
                    style={{ cursor: 'pointer' }} />
            </span>
            <Button
                variant="light"
                onClick={() =>
                    productDispatch({
                        type: "CLEAR_FILTERS",
                    })
                }
            >
                Clear Filters
            </Button>
        </div>
    )
}

export default Filter
