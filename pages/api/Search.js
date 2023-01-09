import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async (req ,res)=> {
        try {
            const client = await clientPromise;
            const db = client.db('product')
            const {searchProduct} = req.body
            const searchproduct = await db.collection('product').find({productname:searchProduct}).toArray();
            res.json(searchproduct)
        } catch (err) {
            console.error(err)
            throw new Error(err).message
        }
}