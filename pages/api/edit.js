import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async (req ,res)=>{
    try {
        const client = await clientPromise;
        const db = client.db('product')
        const {id} = req.query
        const {productname , productdetail ,stock} = req.body
        const product = await db.collection('product').updateOne({
           _id:ObjectId(id)
        },{
            $set: {
                    productname:productname,
                    productdetail:productdetail,
                    stock:stock
            }
        }) 
        res.json(product)
    } catch (err) {
        console.error(err)
        throw new Error(err).message
    }
}