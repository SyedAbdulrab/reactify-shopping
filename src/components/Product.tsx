import { Fragment } from "react";
import { Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import allProducts from '../data/items.json'
import { formatCurrency } from "../utilities/formatCurrency";
export function Product(){
    const {id} = useParams()
    const item = allProducts.find(item=>item.id === +id!)
    return (<Fragment>
       <Container className="d-flex justify-content-center">
       <Card style={{width:'430px'}}>
            <Card.Header>
                <Card.Title>{item!.name}</Card.Title>
            </Card.Header>
            <Card.Body>
                <Card.Img src={`${item?.imgUrl}`} style={{width:'400px',height:'300px',objectFit:'cover'}}></Card.Img>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between" >
            <span className="text-muted" style={{fontSize:'1.2rem',fontWeight:'bold'}}>{formatCurrency(item!.price)}
            </span>
           <span  style={{fontSize:'1.2rem'}}>⭐⭐⭐⭐</span>
           </Card.Footer>
           <Card.Footer>
           <Card.Text className="text-muted">
                <span style={{fontWeight:'bold',color:'rgb(20,20,80)'}}>Description: </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore voluptate asperiores aut. Magnam explicabo tenetur quisquam est voluptatum. Deleniti quaerat itaque reiciendis nisi. 
            </Card.Text>
            </Card.Footer>
        </Card>
       </Container>
    </Fragment>)
}