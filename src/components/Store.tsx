import { Fragment } from 'react'
import { Col, Row } from 'react-bootstrap'
import storeItems from '../data/items.json'
import { StoreItem } from './StoreItem'
export function Store(){
    return (
        <Fragment>
            <Row md={2} xs={1} l={3} className='g-3'>
                {
                    storeItems.map(item =>(
                        <Col key={item.id}><StoreItem {...item}/></Col>
                    ))
                }   
            </Row>
        </Fragment>

    )
}