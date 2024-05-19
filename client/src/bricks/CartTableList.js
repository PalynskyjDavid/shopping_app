import React from "react";
import { Table } from "react-bootstrap";
import Icon from '@mdi/react';
import { mdiCogOutline } from '@mdi/js';
import { useState } from "react";

const productList = [
    {
        "Id": "1",
        "Name": "Flour",
        "Brand": "McDonald's",
        "Price": 4.99
    },
    {
        "Id": "2",
        "Name": "Eggs",
        "Brand": "Fresh & Co",
        "Price": 7.99
    },
    {
        "Id": "3",
        "Name": "Cheese",
        "Brand": "McDonald's",
        "Price": 4.99
    }
]

const joint = [
    {
        "cId": "cartsid2",
        "iId": "1"
    },
    {
        "cId": "cartsid2",
        "iId": "1"
    },
    {
        "cId": "cartsid3",
        "iId": "3"
    }
]

const items = [
    {
        Name: "Flour",
        Price: 4.99
    },
    {
        Name: "Eggs",
        Price: 7.99
    },
    {
        Name: "Cheese",
        Price: 4.99
    },
]

function CartTableList(props) {

    const [cartDetail, setCartDetail] = useState(false);

    return (
        props.cartList.map((cart) => {
            return <Table key={cart.Id}>
                <thead onClick={() => setCartDetail(!cartDetail)}>
                    <tr>
                        <th class="th1">{cart.Name}</th>
                        <th class="th2">{cart.TotalPrice}</th>
                        <Icon path={mdiCogOutline} size={3} class="icon" />
                    </tr>
                </thead>
                {cartDetail ?
                    <tbody>
                        <tr>
                            <td class="td1">Chleba</td>
                            <td class="td2">50</td>
                            <Icon path={mdiCogOutline} size={2} class="icon" />
                        </tr>
                    </tbody>
                    : null}
            </Table>
        })
    )
};

export default CartTableList;