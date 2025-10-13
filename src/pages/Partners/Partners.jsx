import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { fetchData } from "../../common";
import Error from "../Error/Error";
import Tile from "../../components/tile/Tile";
import "./partners.css";
import "../../styles/modal.css"
import { Paths } from "../../constants/Paths";
import { AddNewButton } from "../../components/addNewButton/AddNewButton";
import { handleAddNewClick } from "./handlers";

const Partners = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [partners, setPartners] = useState([]);
  const [error, setError] = useState(null);
  const [isOutletActive, setIsOutletActive] = useState(false);

  useEffect(() => {
    fetchData(
      navigate,
      setPartners,
      setError,
      Paths.Partners,
      { 'organization-id': sessionStorage.getItem('currentOrganizationId') }
    );
  }, [navigate, location.pathname]);

  useEffect(() => {
    setIsOutletActive(
      location.pathname.includes(Paths.EditPartner) ||
      location.pathname.includes(Paths.AddPartner)
    );
  }, [location.pathname]);

  if (error) return <Error message={error} />;

  return (
    <div className="partners-page">
      <div className="partners-header">
        <h2 className="partners-title">Partners</h2>
        <AddNewButton
          text= "+ Add New"
          onClick={() => handleAddNewClick(navigate)}
        />
      </div>
      <div className="partners-grid">
        {partners.length > 0 ? (
          partners.map((partner) => (
            <Tile
              key={partner.id}
              image="https://img.freepik.com/free-photo/front-view-indian-man-posing-studio_23-2150692695.jpg?semt=ais_hybrid&w=740&q=80"
              name={partner.name}
              description={partner.description}
              onEdit={() => navigate(`${partner.id}${Paths.EditPartner}`)}
            />
          ))
        ) : (
          <p className="no-partners">No partners available.</p>
        )}
      </div>

      {isOutletActive && (
        <div className="outlet-modal-overlay" onClick={() => navigate(-1)}>
          <div className="outlet-modal-content" onClick={(e) => e.stopPropagation()}>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default Partners;