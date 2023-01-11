import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import Layout from '../components/Layout'
import { useState } from 'react'
import React from "react";
import style from '../components/styles/Nav.module.css'


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
  <div className={style.col_3}>
   <input type='text'
   onChange={(e)=>setSearchProduct(e.target.value)}
   value={searchreProduct}
   placeholder='Search Product'>
   </input>
   <span className={style.highlight}></span>
   <span className={style.bar}></span>
   <label htmlFor='searchproduct'></label>
   <div className={style.btn_btn_1} onClick={()=>{handSearch(searchreProduct as String)}}><span>Search</span></div>
   {/* <button onClick={()=>{handSearch(searchreProduct as String)}}>Search</button> */}
    </div>

    <div className={style.container_table}>
    <table className={style.style_table}>
      <tbody>
        <tr>
          <th>Product Name</th>
          <th>Product Detail</th>
          <th>Product Stock</th>
          <th></th>
          <th></th>
        </tr>
          {ressearch?.length > 0 ? <>{ressearch.map((search:any , index:any)=>{
            return (<tr key={index}>
              <td>{search.productname}</td>
              <td>{search.productdetail}</td>
              <td>{search.stock} ea.</td>
              <td><a href={`/edit/${search._id}`}>Edit</a></td>
              <td><button onClick={()=>{handleDelete(search._id)}}>Delete</button></td>
            </tr>)
          })}</> : <>{products.map((products , index)=>{
            return (<tr key={index}>
              <td>{products.productname}</td>
              <td>{products.productdetail}</td>
              <td>{products.stock} ea.</td>
              <td><a href={`/edit/${products._id}`}>Edit</a></td>
              <td><button onClick={()=>{handleDelete(products._id)}}>Delete</button></td>
            </tr>)
          })}</>}
      </tbody>
    </table>
    </div>
</div>

  )
}

export default Home;
