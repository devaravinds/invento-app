import { useState } from "react";
import { TransactionStatus, TransactionType } from "../../constants/Transaction";
import DropdownMenu from "../dropdownMenu/DropdownMenu"; 
import { handleDeleteClick, handlePrintClick, handleToggleStatusClick } from "./handlers";
import "./transactionTile.css";
import Error from "../../pages/Error/Error";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants/Paths";

const TransactionTile = ({ transactionId, transactionStatus: initialStatus, transactionType, amount, paidOn: initialPaidOn, dueDate: initialDueDate }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [status, setStatus] = useState(initialStatus);
  const [paidOn, setPaidOn] = useState(initialPaidOn);
  const [dueDate, setDueDate] = useState(initialDueDate);

  const isCompleted = status === TransactionStatus.COMPLETED;
  const isPending = status === TransactionStatus.PENDING;
  const isPurchase = transactionType === TransactionType.PURCHASE;

  const statusClass = isCompleted ? "status-completed" : "status-pending";
  const typeClass = isPurchase ? "type-purchase" : "type-sale";

  const formattedAmount = amount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const toggleStatusOptions = 
    {
      text: isPending ? "Mark as Completed" : "Mark as Pending",
      onClick: async () => {
        try {
          await handleToggleStatusClick(transactionId, setError);

          setStatus(prev => {
            const newStatus = prev === TransactionStatus.PENDING ? TransactionStatus.COMPLETED : TransactionStatus.PENDING;

            if (newStatus === TransactionStatus.COMPLETED) {
              setPaidOn(new Date().toISOString());
              setDueDate(null);
            } else {
              setPaidOn(null);
              setDueDate(new Date().toISOString());
            }

            return newStatus;
          });

        } catch (err) {
          setError(err.message || "Something went wrong");
        }
      },
    }

  const dropDownOptions = [
    {
      text: "Edit",
      onClick: () => {
        navigate(`${transactionId}${Paths.EditTransaction}`);
      }
    },
    {
      text: "Delete",
      onClick: () => {
        handleDeleteClick(transactionId, navigate, setError);
      }
    },
    toggleStatusOptions,
    {
      text: "Generate Invoice",
      onClick: () => {
        handlePrintClick(transactionId, setError);
      }
    }
  ]

  if (error) return <Error message={error} />;

  return (
    <div className={`transaction-tile ${statusClass}`}>
      <div className="transaction-info">
        <span className={`transaction-type ${typeClass}`}>
          {transactionType}
        </span>
        <span className="transaction-status">
          {status}
          {isPending && dueDate && (
            <span className="transaction-date"> • Due on {formatDate(dueDate)}</span>
          )}
          {isCompleted && paidOn && (
            <span className="transaction-date"> • Paid on {formatDate(paidOn)}</span>
          )}
        </span>
      </div>

      <div className="transaction-actions">
        <div className="transaction-amount">{formattedAmount}</div>
        <DropdownMenu options={dropDownOptions} />
      </div>
    </div>
  );
};

export default TransactionTile;
