export const handleSubmit = async (e, navigate, formData, setHasError) => {
  const token = localStorage.getItem('authToken');
  e.preventDefault();
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`,
         'organization-id': sessionStorage.getItem('currentOrganizationId') 
        },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      setHasError(true)
    }

    alert("Transaction added successfully!");
    navigate(-1);
} catch (err) {
    setHasError(true);
}
  };