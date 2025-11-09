import { useState, useEffect } from 'react';
import './login.css';
import { ColorVariables } from '../../constants/ColorVariables';
import { handleFormSubmit, handleInputChange } from './login.js';
import { applyColorVariables } from '../../common.js';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../constants/Paths.jsx';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        phone: '',
        password: ''
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        if(localStorage.getItem('authToken')) {
            navigate(Paths.Dashboard)
        }
        applyColorVariables(ColorVariables)
    }, [navigate]);

    const handleChange = (e) => handleInputChange(e, setFormData, errors, setErrors);
    const handleSubmit = (e) => handleFormSubmit(e, formData, setErrors, setIsLoading, navigate )

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
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>

                    <div className="form-options">
                        <label className="checkbox-container">
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                            Remember me
                        </label>
                        <a href="www.example.com" className="forgot-password">Forgot Password?</a>
                    </div>

                    <button
                        type="submit"
                        className={`login-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
