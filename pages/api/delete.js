import { ObjectId } from 'mongodb'
import clientPromise from '../../lib/mongodb'

export default async (req,res)=>{
    try {
        const client = await clientPromise
        const db = client.db('product')
        const {id} = req.query
        const product = await db.collection('product').deleteOne({
            _id:ObjectId(id)
        })
        res.json(product)
    } catch (err) {
        console.error(err)
        throw new Error(err).message
    }
    }
