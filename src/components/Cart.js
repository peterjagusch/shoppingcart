import React, { useEffect, useState } from 'react'
import { CartState } from '../context/Context'
import { Button, ListGroup, Row, Col, FormControl, Image } from 'react-bootstrap'
import { AiFillDelete } from "react-icons/ai";

import Rating from './Rating'
const Cart = () => {

    const { state: { cart },
        dispatch,
    } = CartState()

    const [total, setTotal] = useState(0);


    useEffect(() => {
        setTotal(cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0))
    }, [cart])

    return (
        <div className='home'>

            <div className='productContainer'>
                <ListGroup >
                    {cart.map((prod) => (

                        <ListGroup.Item key={prod.id}>
                            <Row>
                                <Col md={2}>
                                    <Image src={prod.image} alt={prod.name} fluid rounded />
                                </Col>
                                <Col md={2}>
                                    <span> {prod.name}</span>
                                </Col>
                                <Col md={2}>
                                    <span> {prod.price}</span>
                                </Col>
                                <Col md={2}>
                                    <Rating rating={prod.ratings}
                                        onClick={(e) =>
                                            dispatch({
                                                type: "ADD_RATING_TO_PRODUCT",
                                                payload: prod.ratings = e + 1,
                                            })
                                        }
                                    />
                                </Col>
                                <Col md={2}>
                                    <FormControl
                                        as="select"
                                        value={prod.qty}
                                        onChange={(e) =>
                                            dispatch({
                                                type: "CHANGE_CART_QTY",
                                                payload: {
                                                    id: prod.id,
                                                    qty: e.target.value
                                                }
                                            })
                                        }
                                    >
                                        {[...Array(prod.inStock).keys()].map((x) => (
                                            <option key={x + 1}>{x + 1}</option>
                                        )
                                        )}
                                    </FormControl>
                                </Col>
                                <Col md={2}>
                                    <AiFillDelete
                                        fontSize="20px"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() =>
                                            dispatch({
                                                type: "REMOVE_FROM_CART",
                                                payload: prod,
                                            })
                                        }
                                    />
                                </Col>
                            </Row>
                        </ListGroup.Item>

                    ))}
                </ListGroup>

            </div>
            <div className='filters summary'>
                <span className='title'>Subtotal ({cart.length} items)</span>
                <span style={{ fontWeight: 600, fontSize: 20 }}> Total £{total}</span>
                <Button type="button" disabled={cart.length === 0}>Proceed to checkout</Button>
            </div>

        </div>
    )
}

export default Cart