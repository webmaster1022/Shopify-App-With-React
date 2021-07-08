import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { CssBaseline } from '@material-ui/core';
import { BASE_URL } from '../../../api/Variables.api';


import { BreadCrumb } from './component/BreadCrumb.component';

import { StoreHeader } from '../../../components/index.components';
import { Toolbar } from '@material-ui/core'

import { InputNumber } from './component/InputNumber.component';
import { withRouter } from 'react-router-dom';
import { getOneProduct } from '../../../api/API';
import { Markup } from 'interweave';

import { SimpleRating } from '../../../components/index.components'
import { connect } from 'react-redux';
import { addProductToCart, deleteCart } from '../../../redux/actions';





const useStyles = makeStyles({
  root: {
    // display:'flex',
    // flexDirection:'column',
    maxWidth: '100%',
    // minHeight:'100%',
    minHeight: 610,
    padding: 15,
    margin: 20,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  topContent: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    cursor: 'unset',
    marginBottom: 20

  },
  image: {
    width: 360,
    height: 360,
    // margin: '0px 20px 0 20px'
  },
  leftContent: {
    display: 'flex',
    // justifyContent:'space-evenly'
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-start',

  },
  inputNumber: {
    marginLeft: 20,
    width: 60
  },
  bottomContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 20,
    color: '#777'

  },
  rateContainer: {
    display: 'flex',
    // flexDirection:'column '
  }
});



function ProductDetailsss(props) {
  const classes = useStyles();

  const [product, setProduct] = useState([{}])
  const [number = 1, setNumber] = useState()

  const getDataWithParams = async () => {
    try {
      const { group, id } = props.match.params
      const { data: product } = await getOneProduct(group, id)
      await setProduct(product)
    }
    catch (error) {
      console.log(error.messege)
    }
  }



  useEffect(async () => {
    await getDataWithParams()
  }, [])


  const addToBuyList = () => {
    const { id, name, group, price,subgroup } = product
    const orderId = props.cart.length + 1

    const data = {
      productId: id,
      productName: name,
      group: group,
      subgroup:subgroup,
      number: parseInt(number) ,
      id: orderId,
      productPrice: price
    }

    props.addProductToCart(data)
    console.log(props.cart)


  }



  return (
    <StoreHeader style={{ flexDirection: 'column' }}>
      <Toolbar />
      <CssBaseline />
      <Card className={classes.root} raised={true}>
        <div className={classes.topContent} >

          <CardMedia className={classes.image}
            component="img"
            alt={product.name}
            height="140"
            image={`${BASE_URL}${product.image}`}
            title={product.name}
          />


          <CardContent className={classes.leftContent} >
            <Typography gutterBottom variant="h5" component="h2" >
              {product.name}
            </Typography>

            <BreadCrumb {...product} />


            <div className={classes.rateContainer}>
              <Typography variant="body2" color="textSecondary" component="p">
                <p>
                  امتیاز محصول
                </p>
                <SimpleRating />

              </Typography>
            </div>

            <div className={classes.buttonContainer} >
              <InputNumber className={classes.inputNumber} onChange={(number) => setNumber(number)} />
              <Button variant='contained' color="secondary" onClick={addToBuyList} >
                افزودن به سبد خرید
              </Button>

            </div>
          </CardContent>

        </div>


        <Divider variant='middle' />
        <CardActions className={classes.bottomContent}>

          <Typography gutterBottom variant="h6" component="h6" >
            توضیحات محصول
          </Typography>

          <Markup content={product.information} />

        </CardActions>


      </Card>
    </StoreHeader>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart
})

const mapDispatchToProps = (dispatch) => {
  return {
    addProductToCart: (payload) => dispatch(addProductToCart(payload)),
    deleteCart: () => dispatch(deleteCart())
  }
}



const ProductDetails = withRouter(ProductDetailsss)
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)












