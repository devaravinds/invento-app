import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleApiRequest } from "../../common";
import Error from "../Error/Error";
import InventoryTile from "../../components/inventoryTile/InventoryTile";
import "./inventory.css";
import { Paths } from "../../constants/Paths";

const Inventory = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState({ message: null, statusCode: null });  useEffect(() => {
      handleApiRequest(
        navigate, 
        setInventory, 
        setError,
        Paths.Inventory, 
        { 'organization-id': sessionStorage.getItem('currentOrganizationId') }
      );
  }, [navigate])
  if (error.statusCode) return <Error message={error.message} />;
  return (
    <div className="inventory-page">
      <h2 className="inventory-title">Inventory</h2>
      <div className="inventory-grid">
        {inventory.length > 0 ? (
          inventory.map((item) => (
            <InventoryTile
              key={item.id}
              image="https://ncfa.co.in/wp-content/uploads/2024/02/Areca-nut-fibre.jpg"
              name={item.name}
              quantityAvailable={item.quantityAvailable[0].count + " " + item.quantityAvailable[0].unitName}
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
