import { useEffect, useState } from "react"
import { getAllProducts } from "../services/product";
import { toast } from "react-toastify";
import ProductCard from "./ProductCard";


const ProductScreen = () => {
    const [products, setProducts] = useState([]);
    
    async function loadAllProducts() {
        try{
        const productlist = await getAllProducts();
        setProducts(productlist);
        }catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    }

    useEffect(() => {
        loadAllProducts();
    }, []);
    return (
        <div>
            <h1>
                PRODUCT LIST
                 </h1>
            {products.map((p) => (
  <ProductCard key={`product-${p.id}`} product={p} />
))}

           
        </div>
    )
}

 export default ProductScreen;