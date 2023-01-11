import Layout from "../../components/Layout";
import React, { useState } from "react";
import { GetServerSidePropsResult, GetStaticPropsContext } from "next";
import styled from '../../components/styles/Nav.module.css'

type PageParams = {
  id:any
}
type ContentPageProps = {
  product : Product
}
type Product = {
  _id:String,
  productname:String,
  productdetail:String,
  stock:String
}

type ResFromServer = {
  _id:String,
  productname:String,
  productdetail:String,
  stock:String
}

export async function getStaticProps({
  params } : GetStaticPropsContext<PageParams>) : Promise<GetServerSidePropsResult<ContentPageProps>> {
    try {
      let res = await fetch('http://localhost:3000/api/getone?id=' + params?.id);
      let resFromServer:ResFromServer = await res.json();

      return {
        props : {
          product : {
            _id:resFromServer._id,
            productname:resFromServer.productname,
            productdetail:resFromServer.productdetail,
            stock:resFromServer.stock
          }
        }
      }
    } catch (err) {
      console.log(err +'err')
      return {
        props: {
          product : {
            _id:'',
            productname:'',
            productdetail:'',
            stock:''
          }
        }
      }
    }
}

export async function getStaticPaths() {
    let product = await fetch('http://localhost:3000/api/getproducts')
    let resFromServer:[Product] = await product.json()

    return {
      paths:resFromServer.map((product)=>{
        return {
          params : {
            id:product._id
          }
        }
      }),
      fallback:false
    }
}

const Edit = ({product:{_id , productname , productdetail ,stock }}: ContentPageProps)=>{
  const [postproductname , setPostproductname] = useState(productname);
  const [postproductdetail , setPostproductdetail] = useState(productdetail);
  const [poststock , setPoststock] = useState(stock)
  const [error , setError] = useState('')
  const [massage , setMassage] = useState('')

  const handleSubmit = async(e:any)=>{
    e.preventDefault();

    if(postproductname && postproductdetail && poststock){
       try {
          let res = await fetch('http://localhost:3000/api/edit?id='+_id , {
            method:'POST',
            body: JSON.stringify({
              productname:postproductname,
              productdetail:postproductdetail,
              stock:poststock
            }),
            headers:{
              Accept:"application/json, text/plain, */*",
              "Content-Type" : "application/json"
          }
          })
            res = await res.json();
            setPostproductname('')
            setPostproductdetail('')
            setPoststock('')
            setError('')
            setMassage('Success')

       } catch (errMessage : any) {
          setError(errMessage)
       }
    } else {return setError('all filnd required')}
  }
  return (
    <div>
        <Layout/>
        <div className={styled.container}>
        <form onSubmit={handleSubmit}>
                <div className={styled.col_3}>
                    <label htmlFor="productname"></label>
                    <input type="text"
                    name="productname"
                    placeholder="Product Name"
                    onChange={(e)=>setPostproductname(e.target.value)}
                    value={postproductname}></input>
                    <span className={styled.highlight}></span>
                    <span className={styled.bar}></span>

                </div>
                <div className={styled.col_3}>
                    <label htmlFor="productdetail"></label>
                    <input name="productdatail"
                    placeholder="Product Name"
                    onChange={(e)=>setPostproductdetail(e.target.value)}
                    value={postproductdetail}
                    type='text'></input>
                    <span className={styled.highlight}></span>
                    <span className={styled.bar}></span>
                </div>
                <div className={styled.col_3}>
                    <label htmlFor="stock"></label>
                    <input type="number"
                    name="stock"
                    placeholder="Stock"
                    onChange={(e)=>setPoststock(e.target.value)}
                    value={poststock}></input>
                    <span className={styled.highlight}></span>
                    <span className={styled.bar}></span>
                </div>
                <div><button>Update</button>
                </div>
                <div>
                    {error ? error : <div>{error}</div>}
                    {massage ? massage : <div>{massage}</div>}
                </div>
            </form>
            </div>
    </div>
  )
}
export default Edit;