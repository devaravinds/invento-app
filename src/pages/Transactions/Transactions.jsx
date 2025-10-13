import { useEffect, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { fetchData } from "../../common";
import Error from "../Error/Error";
import "./transactions.css";
import { Paths } from "../../constants/Paths";
import TransactionTile from "../../components/transactionTile/TransactionTile";
import { AddNewButton } from "../../components/addNewButton/AddNewButton";
import { handleAddNewClick } from "./handlers";

const Transactions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [transactions, setTransactions] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isOutletActive, setIsOutletActive] = useState(false);

  useEffect(() => {
      fetchData(
        navigate, 
        setTransactions, 
        setHasError,
        Paths.Transactions, 
        { 'organization-id': sessionStorage.getItem('currentOrganizationId') }
      );
  }, [navigate])

  useEffect(() => {
    setIsOutletActive(
      location.pathname.includes(Paths.AddTransaction)
    );
  }, [location.pathname]);

  if (hasError) return <Error />;
  return (
    <div className="transactions-page">
      <div className="transactions-header">
        <h2 className="transactions-title">Transactions</h2>
        <AddNewButton
          text= "+ Add New"
          onClick={() => handleAddNewClick(navigate)}
        />
      </div>
      <div className="transactions-grid">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <TransactionTile
              key={transaction.id}
              transactionStatus={transaction.transactionStatus}
              transactionType={transaction.transactionType}
              amount={transaction.amount}
            />
          ))
        ) : (
          <p className="no-transactions">No transactions available.</p>
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

export default Transactions;
