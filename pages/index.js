
import ProductItem from "../components/ProductItem";
import productModel from "../models/Product";
import db from "../utils/db";



export default function Home({products}) {
 
  return (
   <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
    {
      products.map((product, id) => (
        <ProductItem product={product}  key={id} />
      ))
    }
   </div>
 
    )
}


export const getServerSideProps = async () => {
   await db.connect()
   const products = await productModel.find().lean()
   return{
    props:{
      products: products.map(i => db.converDocToObject(i) )
    }
   }
}
