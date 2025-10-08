import React from "react";
import Error from "../pages/Error/Error";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <Error message={this.state.error?.message || "Something went wrong!"} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
