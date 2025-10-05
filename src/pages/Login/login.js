const validateForm = (formData) => {
    const newErrors = {};

    if (!formData.phone) {
        newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.password) {
        newErrors.password = 'Password is required';
    } else if (formData.password.length < 3) {
        newErrors.password = 'Password must be at least 3 characters';
    }

    return newErrors;
};

export const handleInputChange = (e, setFormData, errors, setErrors) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
    }
};

export const applyColorVariables = (colorVars) => {
    const root = document.documentElement;
    Object.entries(colorVars).forEach(([property, value]) => {
        if (value) {
            root.style.setProperty(property, value);
        }
    });
};

export const handleFormSubmit = async (e, formData, setErrors, setIsLoading) => {
    e.preventDefault();

    const newErrors = validateForm(formData);
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }

    setIsLoading(true);

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const responseData = await response.json();
        if (response.ok) {
            const data = responseData.data;
            const token = data.token;
            const user = data.user;
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));

        } else {
            setErrors({ api: responseData.message || 'Login failed' });
        }
    } catch (error) {
        setErrors({ api: 'Network error. Please try again.' });
    } finally {
        setIsLoading(false);
    }
};