export const handleToggleStatusClick = async (transactionId, setError) => {
    const organizationId = sessionStorage.getItem('currentOrganizationId');
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
    const organizationId = sessionStorage.getItem('currentOrganizationId');
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

export const handlePrintClick = async (transactionId, setError) => {
    const organizationId = sessionStorage.getItem('currentOrganizationId');
    const token = localStorage.getItem("authToken");

    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/transactions/${transactionId}/pdf`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "organization-id": organizationId
                }
            }
        );

        if (response.ok) {
            const blob = await response.blob();

            const contentDisposition = response.headers.get("Content-Disposition");
            let filename = `invoice-${transactionId}.pdf`;

            if (contentDisposition && contentDisposition.includes("filename=")) {
                filename = contentDisposition
                    .split("filename=")[1]
                    .trim()
                    .replace(/["']/g, "");
            }

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } else {
            setError("Failed to generate PDF");
        }
    } catch (err) {
        setError(err.message);
    }
};

