import React from 'react'
import { Container, Dropdown, FormControl, Navbar, Nav, Badge, Button } from 'react-bootstrap'
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { CartState } from '../context/Context';
import { AiFillDelete } from 'react-icons/ai';


const Header = () => {
    const {
        state: { cart },
        dispatch,
        productDispatch,
    } = CartState();


    return (
        <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
            <Container>
                <Navbar.Brand>
                    <Link to="/">Home</Link>
                </Navbar.Brand>
                <Navbar.Text className="search">
                    <FormControl
                        style={{ width: 500 }}
                        type="search"
                        placeholder="Search a product..."
                        className="m-auto"
                        aria-label="Search"
                        onChange={(e) => {
                            productDispatch({
                                type: "FILTER_BY_SEARCH",
                                payload: e.target.value,
                            });
                        }}
                    />
                </Navbar.Text>
                <Nav>
                    <Dropdown>
                        <Dropdown.Toggle variant='dark'>
                            <FaShoppingCart color="white" fontSize="25px" />
                            <Badge>{cart.length}</Badge>
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ minWidth: 370, right: 0, left: 'auto' }} >

                            {cart.length > 0 ? (
                                cart.map(prod => (
                                    <span className='cartitem' key={prod.id}>
                                        <img
                                            src={prod.image}
                                            className='cartItemImg'
                                            alt={prod.name} />
                                        <div className='cartItemDetail'>
                                            <span>
                                                {prod.name}
                                                £ {prod.price.split('.')[0]}
                                            </span>
                                        </div>

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
                                    </span>

                                ))
                            ) : (
                                <span style={{ padding: 10 }}>Cart is Empty!</span>
                            )
                            }
                            {cart.length > 0 && (
                            <Link to="/cart">
                                <Button style={{ width: "95%", margin: "0 10px" }} >
                                    Go to Cart
                                </Button>
                            </Link>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header