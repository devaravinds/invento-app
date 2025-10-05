import { useState, useEffect } from 'react';
import './login.css';
import { ColorVariables } from '../../constants/ColorVariables.jsx';
import { applyColorVariables, handleFormSubmit, handleInputChange } from './login.js';
const LoginPage = () => {
    const [formData, setFormData] = useState({
        phone: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        applyColorVariables(ColorVariables)
    }, []);

    const handleChange = (e) => handleInputChange(e, setFormData, errors, setErrors);
    const handleSubmit = (e) => handleFormSubmit(e, formData, setErrors, setIsLoading)

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1 className="login-title">Welcome Back</h1>
                    <p className="login-subtitle">Please sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="phone" className="form-label">
                            Phone Number
                        </label>
                        <input
                            type="phone"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`form-input ${errors.phone ? 'error' : ''}`}
                            placeholder="Enter your phone"
                        />
                        {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`form-input ${errors.password ? 'error' : ''}`}
                            placeholder="Enter your password"
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>

                    <div className="form-options">
                        <label className="checkbox-container">
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                            Remember me
                        </label>
                        <a href="#" className="forgot-password">Forgot Password?</a>
                    </div>

                    <button
                        type="submit"
                        className={`login-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="login-footer">
                    <p>Don't have an account? <a href="#" className="signup-link">Sign up</a></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
