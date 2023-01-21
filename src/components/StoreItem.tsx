import { Fragment, useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";
import {

  useShoppingCart,
} from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { About } from "./About";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};
export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);
  console.log(quantity)

  return (
    <Fragment>
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{
          objectFit: "cover",
        }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2"><Link to={`/product/${id}`}>{name}</Link></span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button onClick={()=>increaseCartQuantity(id)} className="w-100">+ Add to Cart</Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={()=>decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button onClick={()=>increaseCartQuantity(id)}>+</Button>
              </div>
              <Button onClick={()=>removeFromCart(id)} variant="danger" size="sm">
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
    </Fragment>
  );
}
