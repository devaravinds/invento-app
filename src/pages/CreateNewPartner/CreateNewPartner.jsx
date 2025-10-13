import { useState, useEffect } from "react";
import { useNavigate, useParams  } from "react-router-dom";
import "./createNewPartner.css";
import { handleChange, handleSubmit, fetchPartner } from "./handlers";
import Error from "../Error/Error";
import SubmitButton from "../../components/submitButton/SubmitButton";

const CreateNewPartner = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    phone: "",
  });
  const [error, setError] = useState(null);
  const { partnerId } = useParams();
  const token = localStorage.getItem('authToken');
  const organizationId = sessionStorage.getItem('currentOrganizationId')

  useEffect(() => {
    if (partnerId) {
      fetchPartner(partnerId, setFormData, setError);
    }
  }, [partnerId, token, organizationId]);

  if (error) return <Error message={error} />;

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

        <SubmitButton
          text= {partnerId ? "Update Partner" : "Create Partner"}
        />
      </form>
    </div>
  );
};

export default CreateNewPartner;
