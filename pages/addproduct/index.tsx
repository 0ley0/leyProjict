import Layout from "../../components/Layout";
import React,{useState} from "react";
import styled from '../../components/styles/Nav.module.css'


const index =() =>{

    const [productname ,setProductsname] = useState('')
    const [productdetail , setProductdetail] = useState('')
    const [stock , setStock] = useState('')
    const [error , setError] = useState('')
    const [massage , setMassage] = useState('')

    const handleSubmit =async (e:any) => {
        e.preventDefault();

        if(productname && productdetail && stock){
            try {
                let res = await fetch('http://localhost:3000/api/add' , 
                {method:'POST' , body: JSON.stringify({productname,productdetail,stock}),
                headers: {
                    Accept: 'application/json, test/plain, */*',
                    "Content-Type" : "application/json"
                }
            })
            res = await res.json();
            setProductsname('')
            setProductdetail('')
            setStock('')
            setError('')
            setMassage('add success')
            } catch (errMessage : any) {
                setError(errMessage)
            }
        }
    }

    return(
        <div>
            <Layout/>
            <div className={styled.container}>
              <form onSubmit={handleSubmit}>

                <div className={styled.col_3}>
                    <input type="text"
                    name="productname"
                    placeholder="Product Name"
                    onChange={(e)=>setProductsname(e.target.value)}
                    value={productname}></input>
                    <span className={styled.highlight}></span>
                    <span className={styled.bar}></span>
                    <label htmlFor="productname"></label>
                </div>

                <div className={styled.col_3}>
                    <input name="productdatail"
                    placeholder="Product Detail"
                    onChange={(e)=>setProductdetail(e.target.value)}
                    value={productdetail}
                    type='text'></input>
                    <span className={styled.highlight}></span>
                    <span className={styled.bar}></span>
                    <label htmlFor="productdetail"></label>
                </div>

                <div className={styled.col_3}>
                    <input type="number"
                    name="stock"
                    placeholder="Stock"
                    onChange={(e)=>setStock(e.target.value)}
                    value={stock}></input>
                    <span className={styled.highlight}></span>
                    <span className={styled.bar}></span>
                    <label htmlFor="stock"></label>
                </div>

                <div><button>Add Product</button>

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
export default index;