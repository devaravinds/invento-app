import { useState, useEffect } from "react";
import { useNavigate, useParams  } from "react-router-dom";
import "./createNewPartner.css";
import { handleChange, handleSubmit, fetchPartner } from "./handlers";

const CreateNewPartner = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    phone: "",
  });
  const { partnerId } = useParams();
  const token = localStorage.getItem('authToken');
  const organizationId = sessionStorage.getItem('currentOrganizationId')

  useEffect(() => {
    if (partnerId) {
      fetchPartner(partnerId, setFormData);
    }
  }, [partnerId, token, organizationId]);

  return (
    <div className="create-partner-container">
      <h2>Create New Partner</h2>
      <form className="create-partner-form" onSubmit={(e) => handleSubmit(e, partnerId, formData, navigate)}>
        <div className="form-group">
          <label htmlFor="name">Partner Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter partner name"
            value={formData.name}
            onChange={(e) => handleChange(e, setFormData)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter description"
            value={formData.description}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>

        <button type="submit" className="submit-btn">
            {partnerId ? "Update Partner" : "Create Partner"}
        </button>
      </form>
    </div>
  );
};

export default CreateNewPartner;
