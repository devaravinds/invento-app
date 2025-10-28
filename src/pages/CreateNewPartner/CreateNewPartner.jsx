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
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      pin: ""
    },
    gstNumber: ""
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
        <div className="form-group">
          <label htmlFor="address.line1">Address Line 1</label>
          <input
            type="text"
            id="address.line1"
            name="address.line1"
            placeholder="Enter address line 1"
            value={formData.address.line1}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address.line2">Address Line 2</label>
          <input
            type="text"
            id="address.line2"
            name="address.line2"
            placeholder="Enter address line 2"
            value={formData.address.line2}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address.city">City</label>
          <input
            type="text"
            id="address.city"
            name="address.city"
            placeholder="Enter city"
            value={formData.address.city}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address.state">State</label>
          <input
            type="text"
            id="address.state"
            name="address.state"
            placeholder="Enter state"
            value={formData.address.state}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address.pin">PIN Code</label>
          <input
            type="text"
            id="address.pin"
            name="address.pin"
            placeholder="Enter PIN code"
            value={formData.address.pin}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gstNumber">GST Number</label>
          <input
            type="text"
            id="gstNumber"
            name="gstNumber"
            placeholder="Enter GST number"
            value={formData.gstNumber}
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
