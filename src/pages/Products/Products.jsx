import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleApiRequest } from "../../common";
import Error from "../Error/Error";
import Tile from "../../components/tile/Tile";
import "./products.css";
import { Paths } from "../../constants/Paths";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState({ message: null, statusCode: null });  
  useEffect(() => {
      handleApiRequest(
        navigate, 
        setProducts, 
        setError, 
        Paths.Products, 
        { 'organization-id': sessionStorage.getItem('currentOrganizationId') }
      );
  }, [navigate])

  if (error.statusCode) return <Error message={error.message} />;
  return (
    <div className="products-page">
      <h2 className="products-title">Products</h2>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <Tile
              key={product.id}
              image="https://ncfa.co.in/wp-content/uploads/2024/02/Areca-nut-fibre.jpg"
              name={product.name}
              description={product.description}
            />
          ))
        ) : (
          <p className="no-products">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
