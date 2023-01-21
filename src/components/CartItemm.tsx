import { Fragment } from "react"
import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from '../data/items.json'
import { formatCurrency } from "../utilities/formatCurrency"

type CartItemmProps = {
    id : number 
    quantity:number
}

export const CartItemm = ({id,quantity}:CartItemmProps) => {
    console.log(quantity)
    const {removeFromCart} = useShoppingCart()
    const item = storeItems.find(itm=> itm.id === id )
    console.log(item)
    if (item === null ) return null
    return (
        <Fragment>
                <Stack className="d-flex align-items-center" direction="horizontal" gap={2}>
                    <img src={item?.imgUrl} style={{width:'125px',height:'75px',objectFit:'cover'}}/>
                <div className="me-auto">
                    <div>
                        {item?.name} {quantity> 1 && <span className="text-muted" style={{fontSize:'.80rem'}}>x{quantity}</span>}
                    </div>
                    <div className="text-muted" style={{fontSize:'.9rem'}}>{formatCurrency(item!.price)}</div>
                </div>
                <div>{formatCurrency(item!.price*quantity)}</div>
                <Button onClick={()=>removeFromCart(item!.id)} size='sm' variant="outline-danger">x</Button>
                </Stack>
        </Fragment>
    )
}