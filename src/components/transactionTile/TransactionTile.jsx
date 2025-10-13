import { TransactionStatus, TransactionType } from "../../constants/Transaction";
import "./transactionTile.css";

const TransactionTile = ({ transactionStatus, transactionType, amount }) => {
  const isCompleted = transactionStatus === TransactionStatus.COMPLETED;
  const isPurchase = transactionType === TransactionType.PURCHASE;

  const statusClass = isCompleted ? "status-completed" : "status-pending";
  const typeClass = isPurchase ? "type-purchase" : "type-sale";

  const formattedAmount = amount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });

  return (
    <div className={`transaction-tile ${statusClass}`}>
      <div className="transaction-info">
        <span className={`transaction-type ${typeClass}`}>
          {transactionType}
        </span>
        <span className="transaction-status">{transactionStatus}</span>
      </div>
      <div className="transaction-amount">{formattedAmount}</div>
    </div>
  );
};

export default TransactionTile;
