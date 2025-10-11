import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../common";
import Error from "../Error/Error";
import Tile from "../../components/tile/Tile";
import "./inventory.css";
import { Paths } from "../../constants/Paths";

const Inventory = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
      fetchData(
        navigate, 
        setInventory, 
        setHasError,
        Paths.Inventory, 
        { 'organization-id': sessionStorage.getItem('currentOrganizationId') }
      );
  }, [navigate])
  if (hasError) return <Error />;
  return (
    <div className="inventory-page">
      <h2 className="inventory-title">Inventory</h2>
      <div className="inventory-grid">
        {inventory.length > 0 ? (
          inventory.map((item) => (
            <Tile
              key={item.id}
              image="https://ncfa.co.in/wp-content/uploads/2024/02/Areca-nut-fibre.jpg"
              name={item.name}
              description={item.description}
            />
          ))
        ) : (
          <p className="no-inventory">No inventory available.</p>
        )}
      </div>
    </div>
  );
};

export default Inventory;
