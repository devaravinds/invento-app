import "./error.css";

const Error = ({ message = "Something went wrong!" }) => {
  return (
    <div className="error-container">
      <h2 className="error-title">Error</h2>
      <p className="error-message">{message}</p>
    </div>
  );
};

export default Error;
