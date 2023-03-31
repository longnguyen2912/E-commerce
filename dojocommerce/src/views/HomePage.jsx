import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Grid, Card, CardContent, Typography, CardMedia, CardActions } from '@mui/material'
import CartPage from './CartPage'


const HomePage = () => {
    const [displayProduct, setDisplayProduct] = useState([])
    const [randomProduct, setRandomProduct] = useState([])
    const [cart, setCart] = useState([])

    const addToCart = (product) => {
        setCart([...cart, product])
        console.log(cart)


    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/product')
            .then(response => {
                setDisplayProduct(response.data)
                const products = response.data
                const randomIndex = Math.floor(Math.random() * products.length)
                setRandomProduct(products[randomIndex])
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <Container>
            <h1>Featured Product</h1>
            <div className='featuredItem'>
                <img src={randomProduct.image} height="500px" width="500px" alt={randomProduct.name} />
                <ul>
                    <h3>{randomProduct.name}</h3>
                    <li>{randomProduct.description}</li>
                    <li>${randomProduct.price}</li>
                    <li>{randomProduct.category}</li>
                    <Link to='/test/cart'> Add Product to Cart </Link>
                </ul>
                <div className='cart'>
                    <h3>Cart content:</h3>
                    {
                        cart.map((eachProduct, idx) => (
                            <div key={idx}>
                                <ol >
                                    {eachProduct.name}: ${eachProduct.price}
                                </ol>
                            </div>
                        ))
                    }
                    <h4>Total amount: {cart.price}</h4>
                </div>
            </div>
            <div>
                <h2 className='featuredMessage'> Products Available: </h2>
            </div>
            <div>
                <Grid container spacing={4} sx={{ gap: "10px" }}>
                    {
                        displayProduct.map((eachProduct, idx) => (
                            <div key={idx}>
                                <Grid>
                                    <Grid item lg={12} >
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardMedia
                                                component="img"
                                                height="345px"
                                                img src={eachProduct.image}
                                                alt={eachProduct.name}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    <Link to={`/test/product/${eachProduct._id}`}>{eachProduct.name}</Link>
                                                </Typography>
                                                {eachProduct.category}
                                                <Typography variant="body2" color="text.secondary">
                                                    {eachProduct.description}
                                                </Typography>
                                                ${eachProduct.price}
                                            </CardContent>
                                            <CardActions>
                                                <Link to={`/test/cart`}>Go to cart</Link>
                                                <button onClick={() => addToCart(eachProduct)}>Add Product to Cart</button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </div>
                        ))
                    }
                </Grid>
                <CartPage cart={cart} />
            </div>
        </ Container >
    )
}

export default HomePage