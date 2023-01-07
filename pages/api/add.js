import clientPromise from "../../lib/mongodb";

export default async (req,res)=>{
    try {
        const client = await clientPromise;
        const db = client.db('product')
        const {productname , productdetail , stock} = req.body
        const product = await db.collection('product').insertOne({
            productname , productdetail , stock
        })
        res.json(product)
    } catch (err) {
        console.error(err)
        throw new Error(err).message
    }
}