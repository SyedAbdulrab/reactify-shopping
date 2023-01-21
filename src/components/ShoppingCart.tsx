import { Fragment } from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { CartItem, useShoppingCart } from "../context/ShoppingCartContext";
import { CartItemm } from "./CartItemm";
import actualItems from '../data/items.json'
import { formatCurrency } from "../utilities/formatCurrency";

type ShoppingCartProps = {
    isOpen : boolean
    cartItems : CartItem[]
}

export const ShoppingCart = ({isOpen,cartItems}:ShoppingCartProps) => {
    const {closeCart} = useShoppingCart();
    const totalPrice = cartItems.reduce(
        (accumulator,item)=>
         accumulator + (item.quantity * (actualItems.find(it=>it.id===item.id)!.price||0)),0  
    )
    console.log(totalPrice,'TOTALPRICEEEEEEEE')
    return (
    <Fragment>
      <Offcanvas onHide={closeCart} placement="end" show={isOpen}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
                {cartItems.map(item=>{
                    return <CartItemm key={item.id} {...item}/>
                })}
                <div className="ms-auto" style={{fontWeight:'bold',fontSize:'1.22rem'}}>Total: {formatCurrency(totalPrice)}</div>
            </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </Fragment>
  );
};
