import "./tile.css";

const Tile = ({ image, name, description, onEdit }) => {
  return (
    <div className="tile">
      <img src={image} alt={name} className="tile-image" />
      <div className="tile-content">
        <h3 className="tile-name">{name}</h3>
        <p className="tile-description">{description}</p>
      </div>
      <button className="edit-button" onClick={onEdit}>
        Edit
      </button>
    </div>
  );
};

export default Tile;
