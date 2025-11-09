import "./inventoryTile.css";

const InventoryTile = ({ image, name, quantityAvailable }) => {
  return (
    <div className="tile">
      <img src={image} alt={name} className="tile-image" />
      <div className="tile-content">
        <h3 className="tile-name">{name}</h3>
        <p className="tile-quantity-available">{quantityAvailable}</p>
      </div>
    </div>
  );
};

export default InventoryTile;
