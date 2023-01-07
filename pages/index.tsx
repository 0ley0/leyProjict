import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import { InferGetServerSidePropsType } from 'next'
import Layout from '../components/Layout'
import { useState } from 'react'
import { Table } from '@nextui-org/react'


type Props = {
  products : [Product]
}

type Product = {
  _id :String,
  productname :String,
  productdetail :String
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
  return(
<div>
  <Layout/>

</div>

  )
}

export default Home;
