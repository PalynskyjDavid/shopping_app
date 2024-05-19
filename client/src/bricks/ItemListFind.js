import { React, useState } from 'react'

const products = [
    {
      "Id": "foodsid2",
      "Name": "Burger",
      "Brand": "McDonald's",
      "Price": 4.99
    },
    {
      "Id": "foodsid3",
      "Name": "Salad",
      "Brand": "Fresh & Co",
      "Price": 7.99
    }
  ]

function ItemListFind(props) {
    return (
        products.map((p) => {
            return (
                <table>
                <body>
                    <td>{p.Name}-</td>
                    <td>{p.Brand}-</td>
                    <td>{p.Price}</td>
                </body>
                </table>
            )        
        })
    )
}

export default ItemListFind
