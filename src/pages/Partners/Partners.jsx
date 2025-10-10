import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../common";
import Error from "../Error/Error";
import Tile from "../../components/tile/Tile";
import "./partners.css";
import { Paths } from "../../constants/Paths";

const Partners = () => {
  const navigate = useNavigate();
  const [partners, setPartners] = useState([]);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
      fetchData(
        navigate, 
        setPartners, 
        setHasError, 
        Paths.Partners, 
        { 'organization-id': sessionStorage.getItem('currentOrganizationId') }
      );
  }, [navigate])
  if (hasError) return <Error />;
  return (
    <div className="partners-page">
      <h2 className="partners-title">Partners</h2>
      <div className="partners-grid">
        {partners.length > 0 ? (
          partners.map((partner) => (
            <Tile
              key={partner.id}
              image="https://ncfa.co.in/wp-content/uploads/2024/02/Areca-nut-fibre.jpg"
              name={partner.name}
              description={partner.description}
            />
          ))
        ) : (
          <p className="no-partners">No partners available.</p>
        )}
      </div>
    </div>
  );
};

export default Partners;
