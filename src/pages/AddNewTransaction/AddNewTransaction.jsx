import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TransactionType } from "../../constants/Transaction";
import "./addNewTransaction.css";
import { fetchData } from "../../common";
import { Paths } from "../../constants/Paths";


const AddNewTransaction = () => {
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  const [products, setProducts] = useState([]);
  const [partners, setPartners] = useState([]);
  const [outlets, setOutlets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    product: "",
    partner: "",
    rate: "",
    outlet: "",
    quantity: "",
    transactionType: TransactionType.PURCHASE
  });

  const baseUrl = process.env.REACT_APP_API_URL;

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
    setLoading(false)
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Failed to add transaction");

      alert("Transaction added successfully!");
      navigate("/transactions");
    } catch (err) {
      console.error(err);
      alert("Error adding transaction");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="add-transaction-container">
      <h2>Add New Transaction</h2>
      <form onSubmit={handleSubmit} className="add-transaction-form">
        <label>
          Product:
          <select
            name="product"
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
            name="partner"
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
            name="outlet"
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
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
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

        <button type="submit" className="submit-btn">
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddNewTransaction;
