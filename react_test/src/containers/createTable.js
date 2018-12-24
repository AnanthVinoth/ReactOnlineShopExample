import React, { Component } from 'react';
import { Table, Input, Button} from 'reactstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
import { itemActions } from '../action';

class CreateTable extends Component {
    constructor(props){
        super(props)
        this.state = {
            courierPrice: 0,
            order:[]
        }
        
        this.onSelectItem = this.onSelectItem.bind(this);
        this.onPlaceOrderItem = this.onPlaceOrderItem.bind(this);
        this.getCourierPrice = this.getCourierPrice.bind(this);
    }

    getCourierPrice(totalWeight){
        if ( totalWeight <=200){
            return "$5"
        }else if (totalWeight <=500 ){
            return "$10"
        
        }else if( totalWeight <=1000 ){
            return "$15"
        }else if (totalWeight <=5000 ){
            return "$20"
        }else{
            return "$25"
        }
    }

    onSelectItem(item) {
        const orderItems = this.state.order;
        if(_.isEmpty(orderItems))
            {
                orderItems.push({packageName:'Package 1',items:[item.name],courierPrice: this.getCourierPrice(item.weight), totalWeight:item.weight,totalPrice:item.price})
          }else
          {
            var itemPrice = item.price;
            for (let i=0;i<orderItems.length;i++)
                {
                const addPrice = orderItems[i].totalPrice;
                const totalPackagePrice = addPrice+itemPrice;
                if(totalPackagePrice<=250)
                {
                    const addWeight=item.weight+orderItems[i].totalWeight;
                    orderItems[i].totalWeight=addWeight;
                    orderItems[i].items.push(item.name)
                    orderItems[i].totalPrice=totalPackagePrice;
                    orderItems[i].courierPrice=this.getCourierPrice(addWeight);
                    return;
                }
            }
            const countPackage = orderItems.length+1;
            const addPackages =  orderItems.push({packageName:'Package '+countPackage,items:[item.name],courierPrice: this.getCourierPrice(item.weight), totalWeight:item.weight,totalPrice:item.price})
            this.setState({ orderItems: addPackages })
        }
    }

    onPlaceOrderItem(e) {
        const { dispatch } = this.props;
        dispatch(itemActions.placeOrderItems(this.state.order))   
        this.setState({ order: [] });
        document.getElementById("orderForm").reset();        
    }

    render() {
        return (
            <form id="orderForm">
                <Table bordered>
                    <thead>
                        <tr>
                            <th>Select Item</th>
                            <th>Name</th>
                            <th>Price($)</th>
                            <th>Weight(g)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.items.map((item,index) => {
                            return (
                                <tr key={index}>
                                    <td align="center"><Input type="checkbox" className="case" name="case[]" onChange={() => this.onSelectItem(item)}/></td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.weight}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>

                <div className="text-center">
                    <Button className="btn btn-lg place-order" color="success" onClick={this.onPlaceOrderItem}>Place Order</Button>
                </div>

                {this.props.placeOrderItems !==  undefined && this.props.placeOrderItems.length !==0 &&
                    <div className="row order-items">
                        {this.props.placeOrderItems.map((placeItem, index) => {
                            var packageItems= _.toString(placeItem.items);
                            return (
                                <div key={index} className="col-sm-6">
                                    <Panel bsStyle="primary">
                                        <Panel.Heading>
                                            <Panel.Title componentClass="h3">{placeItem.packageName}</Panel.Title>
                                        </Panel.Heading>
                                        <Panel.Body>
                                            <h3>Items : {packageItems}</h3>
                                            <h3>Total Weight : {placeItem.totalWeight}g</h3>
                                            <h3>Total Price : ${placeItem.totalPrice}</h3>
                                            <h3>Courier Price : {placeItem.courierPrice}</h3>
                                        </Panel.Body>
                                    </Panel>
                                </div>
                            )
                        })}
                    </div>
                }
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        items: Object.keys(state.items).map(key => state.items[key]),
        placeOrderItems: state.placeOrderItems
    }
}
  
export default connect(mapStateToProps)(CreateTable);   




