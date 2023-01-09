import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import Layout from '../components/Layout'
import { useState } from 'react'
import React from "react";


type Props = {
  products : [Product]
}

type searcha = {
  searcha : [Searcha]
}

type Searcha = {
  productname :String,
  productdetail :String,
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
  const [searchreProduct,setSearchProduct] = useState('')
  const [error , setError] = useState('')
  const [ressearch , setRessearch] = useState([])


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

  const handSearch = async (searchProduct:String) => {
     let res = await fetch('http://localhost:3000/api/Search' ,
     {method:'POST' , body:JSON.stringify({searchProduct}) , 
     headers: {
      Accept: 'application/json, test/plain, */*',
      "Content-Type" : "application/json"
  }})
  let searcha = await res.json();
  setSearchProduct('')
  setRessearch(searcha)
  console.log(searcha)
  } 
  
   
  return(
<div>
  <Layout/>
  <div>
   <input type='text'
   placeholder='SearchProductname'
   onChange={(e)=>setSearchProduct(e.target.value)}
   value={searchreProduct}>
   </input>
   <button onClick={()=>{handSearch(searchreProduct as String)}}>Search</button>
    </div>
    
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
    <div>
      {ressearch.map((reew:any , index:any)=>{
        return (<ul key={index}>
          <li>{reew.productname}</li>
          <li>{reew.productdetail}</li>
          <li>{reew.stock}</li>
        </ul>)
      })}
    </div>
</div>

  )
}

export default Home;
