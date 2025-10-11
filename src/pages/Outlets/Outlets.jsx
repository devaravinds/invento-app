import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../common";
import Error from "../Error/Error";
import Tile from "../../components/tile/Tile";
import "./outlets.css";
import { Paths } from "../../constants/Paths";

const Outlets = () => {
  const navigate = useNavigate();
  const [outlets, setOutlets] = useState([]);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
      fetchData(
        navigate, 
        setOutlets, 
        setHasError, 
        Paths.Outlets, 
        { 'organization-id': sessionStorage.getItem('currentOrganizationId') }
      );
  }, [navigate])
  if (hasError) return <Error />;
  return (
    <div className="outlets-page">
      <h2 className="outlets-title">Outlets</h2>
      <div className="outlets-grid">
        {outlets.length > 0 ? (
          outlets.map((outlet) => (
            <Tile
              key={outlet.id}
              image="https://ncfa.co.in/wp-content/uploads/2024/02/Areca-nut-fibre.jpg"
              name={outlet.name}
              description={outlet.description}
            />
          ))
        ) : (
          <p className="no-outlets">No outlets available.</p>
        )}
      </div>
    </div>
  );
};

export default Outlets;
