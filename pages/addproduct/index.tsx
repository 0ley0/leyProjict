import Layout from "../../components/Layout";
import React,{useState} from "react";


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
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="productname">Product Name</label>
                    <input type="text"
                    name="productname"
                    placeholder="Product Name"
                    onChange={(e)=>setProductsname(e.target.value)}
                    value={productname}></input>
                </div>
                <div>
                    <label htmlFor="productdetail">Product Detail</label>
                    <textarea name="productdatail"
                    placeholder="Product Name"
                    onChange={(e)=>setProductdetail(e.target.value)}
                    value={productdetail}></textarea>
                </div>
                <div>
                    <label htmlFor="stock">Stock</label>
                    <input type="text"
                    name="stock"
                    placeholder="Stock"
                    onChange={(e)=>setStock(e.target.value)}
                    value={stock}></input>
                </div>
                <div><button>Add Product</button>
                </div>
                <div>
                    {error ? error : <div>{error}</div>}
                    {massage ? massage : <div>{massage}</div>}
                </div>
            </form>
        </div>
    )
}
export default index;