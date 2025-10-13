import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TransactionType } from "../../constants/Transaction";
import "./addNewTransaction.css";
import { fetchData } from "../../common";
import { Paths } from "../../constants/Paths";
import { handleSubmit } from "./handlers";
import SubmitButton from "../../components/submitButton/SubmitButton";


const AddNewTransaction = () => {
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  const [products, setProducts] = useState([]);
  const [partners, setPartners] = useState([]);
  const [outlets, setOutlets] = useState([]);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    productId: "",
    partnerId: "",
    rate: "",
    outletId: "",
    quantity: {
      count: "", 
      unit: ""
    },
    transactionType: TransactionType.PURCHASE
  });

  useEffect(() => {
    fetchData(
      navigate,
      setProducts,
      setHasError,
      Paths.Products,
      { 'organization-id': sessionStorage.getItem('currentOrganizationId') }
    )
    fetchData(
      navigate,
      setPartners,
      setHasError,
      Paths.Partners,
      { 'organization-id': sessionStorage.getItem('currentOrganizationId') }
    )
    fetchData(
      navigate,
      setOutlets,
      setHasError,
      Paths.Outlets,
      { 'organization-id': sessionStorage.getItem('currentOrganizationId') }
    )
    fetchData(
      navigate,
      setUnits,
      setHasError,
      Paths.Units,
      { 'organization-id': sessionStorage.getItem('currentOrganizationId') }
    )
    setLoading(false)
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the change is for nested quantity fields
    if (name === "count" || name === "unit") {
      setFormData((prev) => ({
        ...prev,
        quantity: {
          ...prev.quantity,
          [name]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="add-transaction-container">
      <h2>Add New Transaction</h2>
      <form onSubmit={(e) => handleSubmit(e, navigate, formData, setHasError)} className="add-transaction-form">
        <label>
          Product:
          <select
            name="productId"
            value={formData.product}
            onChange={handleChange}
            required
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Partner:
          <select
            name="partnerId"
            value={formData.partner}
            onChange={handleChange}
            required
          >
            <option value="">Select Partner</option>
            {partners.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Outlet:
          <select
            name="outletId"
            value={formData.outlet}
            onChange={handleChange}
            required
          >
            <option value="">Select Outlet</option>
            {outlets.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Rate:
          <input
            type="number"
            name="rate"
            value={formData.rate}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Quantity:
          <input
            type="number"
            name="count"
            value={formData.quantity.count}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Unit:
          <select
            name="unit"
            value={formData.quantity.unit}
            onChange={handleChange}
            required
          >
            <option value="">Select Unit</option>
            {units.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Transaction Type:
          <select
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
          >
            <option value={TransactionType.PURCHASE}>Purchase</option>
            <option value={TransactionType.SALE}>Sale</option>
          </select>
        </label>

        <SubmitButton
          text= "Add Transaction"
        />
      </form>
    </div>
  );
};

export default AddNewTransaction;
