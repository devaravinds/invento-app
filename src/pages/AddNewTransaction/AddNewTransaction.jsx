import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TransactionType, TransactionStatus } from "../../constants/Transaction";
import "./addNewTransaction.css";
import { fetchData } from "../../common";
import { Paths } from "../../constants/Paths";
import { fetchTransaction, handleSubmit } from "./handlers";
import SubmitButton from "../../components/submitButton/SubmitButton";
import Error from "../Error/Error";

const AddNewTransaction = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productId: "",
    partnerId: "",
    rate: "100",
    outletId: "",
    quantity: {
      count: "10",
      unit: "",
    },
    transactionType: TransactionType.PURCHASE,
    transactionStatus: TransactionStatus.PENDING,
    dueDate: new Date().toISOString().slice(0, 16),
    paidOn: new Date().toISOString().slice(0, 16)
  });
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [partners, setPartners] = useState([]);
  const [outlets, setOutlets] = useState([]);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  const { transactionId } = useParams();
  const token = localStorage.getItem("authToken");
  const organizationId = sessionStorage.getItem("currentOrganizationId");

  useEffect(() => {
    if (transactionId) {
      fetchTransaction(transactionId, setFormData, setError);
    }
  }, [transactionId, token, organizationId]);

  useEffect(() => {
    const orgId = sessionStorage.getItem("currentOrganizationId");

    fetchData(
      navigate,
      (prod) => {
        setProducts(prod);
        setFormData((prev) => ({
          ...prev,
          productId: prev.productId || (prod?.[0]?.id ?? ""),
        }));
      },
      setError,
      Paths.Products,
      { "organization-id": orgId }
    );

    fetchData(
      navigate,
      (part) => {
        setPartners(part);
        setFormData((prev) => ({
          ...prev,
          partnerId: prev.partnerId || (part?.[0]?.id ?? ""),
        }));
      },
      setError,
      Paths.Partners,
      { "organization-id": orgId }
    );

    fetchData(
      navigate,
      (out) => {
        setOutlets(out);
        setFormData((prev) => ({
          ...prev,
          outletId: prev.outletId || (out?.[0]?.id ?? ""),
        }));
      },
      setError,
      Paths.Outlets,
      { "organization-id": orgId }
    );

    fetchData(
      navigate,
      (unit) => {
        setUnits(unit);
        setFormData((prev) => ({
          ...prev,
          quantity: {
            ...prev.quantity,
            unit: prev.quantity.unit || (unit?.[0]?.id ?? ""),
          },
        }));
      },
      setError,
      Paths.Units,
      { "organization-id": orgId }
    );

    setLoading(false);
  }, [navigate]);

  if (error) return <Error message={error} />;
  if (loading) return <p>Loading...</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "count" || name === "unit") {
      setFormData((prev) => ({
        ...prev,
        quantity: {
          ...prev.quantity,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="add-transaction-container">
      <h2>{transactionId ? "Edit Transaction" : "Add New Transaction"}</h2>
      <form
        onSubmit={(e) => handleSubmit(e, transactionId, navigate, formData, setError)}
        className="add-transaction-form"
      >
        <label>
          Product:
          <select name="productId" value={formData.productId} onChange={handleChange} required>
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
          <select name="partnerId" value={formData.partnerId} onChange={handleChange} required>
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
          <select name="outletId" value={formData.outletId} onChange={handleChange} required>
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
          <input type="number" name="rate" value={formData.rate} onChange={handleChange} required />
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
          <select name="unit" value={formData.quantity.unit} onChange={handleChange} required>
            <option value="">Select Unit</option>
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
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

        <label>
          Transaction Status:
          <select
            name="transactionStatus"
            value={formData.transactionStatus}
            onChange={handleChange}
          >
            <option value={TransactionStatus.PENDING}>Pending</option>
            <option value={TransactionStatus.COMPLETED}>Completed</option>
            <option value={TransactionStatus.CANCELLED}>Cancelled</option>
          </select>
        </label>

        <label>
          Due Date:
          <input
            type="datetime-local"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            disabled={formData.transactionStatus === TransactionStatus.COMPLETED}
          />
        </label>

        <label>
          Paid On:
          <input
            type="datetime-local"
            name="paidOn"
            value={formData.paidOn}
            onChange={handleChange}
            disabled={formData.transactionStatus !== TransactionStatus.COMPLETED}
          />
        </label>

        <SubmitButton text={transactionId ? "Update Transaction" : "Create Transaction"} />
      </form>
    </div>
  );
};

export default AddNewTransaction;
