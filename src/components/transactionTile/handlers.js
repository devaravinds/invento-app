export const handleToggleStatusClick = async (transactionId, setError) => {
    const organizationId = localStorage.getItem("organizationId");
    const token = localStorage.getItem("authToken");
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions/${transactionId}/toggle-status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                'organization-id': organizationId
            }
        });
        const responseJson = await response.json();
        if (responseJson.statusCode !== 200) {
            setError(responseJson.message)
        }
    }
    catch (err) {
        setError(err.message);
    }   
}

export const handleDeleteClick = async (transactionId, navigate, setError) => {
    const organizationId = localStorage.getItem("organizationId");
    const token = localStorage.getItem("authToken");
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions/${transactionId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                'organization-id': organizationId
            }
        });
        const responseJson = await response.json();
        if (responseJson.statusCode === 200) {
            navigate(0);
        } else {
            setError(responseJson.message);
        }
    } catch (err) {
        setError(err.message);
    }
}