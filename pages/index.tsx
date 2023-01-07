import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import Layout from '../components/Layout'
import { useState } from 'react'
import React from "react";


type Props = {
  products : [Product]
}

type Product = {
  _id :String,
  productname :String,
  productdetail :String,
  stock:String
}
export async function getServerSideProps() {
  try {
    let res = await fetch('http://localhost:3000/api/getproducts')
    let products = await res.json();
    return {
      props: {products : JSON.parse(JSON.stringify(products))}
    }
  } catch (err) {
    console.error(err)
  }
}



const Home = (props:Props)=>{
  const [products , setpProducts] = useState<[Product]>(props.products)

  const handleDelete = async(productid:String)=>{
    try {
      let res = await fetch('http://localhost:3000/api/delete?id=' + productid ,
      {
        method : 'POST' ,
        headers: {
          Accept:"application/json, text/plain, */*",
                    "Content-Type" : "application/json"
        }
      })
        res = await res.json();
        window.location.reload();
    } catch (err) {
      console.log(err + 'not delete')
    }
  }
  return(
<div>
  <Layout/>
    <table>
      <tbody>
        <tr>
          <th>Product Name</th>
          <th>Product Detail</th>
          <th>Product Stock</th>
          <th></th>
          <th></th>
        </tr>
        {products.map((product , index)=>{
          return (
            <tr key={index}>
              <td>{product.productname}</td>
              <td>{product.productdetail}</td>
              <td>{product.stock}</td>
              <td><a href={`/edit/${product._id}`}>Edit</a></td>
              <td><button onClick={()=>{handleDelete(product._id as String)}}>Delete</button></td>
            </tr>
          )
        })}
      </tbody>
    </table>
</div>

  )
}

export default Home;
