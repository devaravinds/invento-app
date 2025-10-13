import { Paths } from "../../constants/Paths";

export const handleChange = (e, setFormData) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

export const handleSubmit = async (e, partnerId, formData, navigate) => {
  const token = localStorage.getItem('authToken');
  const organizationId = sessionStorage.getItem('currentOrganizationId')
  e.preventDefault();

  const url = partnerId
      ? `${process.env.REACT_APP_API_URL}/partners/${partnerId}`
      : `${process.env.REACT_APP_API_URL}/partners`;

  const method = partnerId ? "PUT" : "POST";

  try {
    const response = await fetch(url, {
      method: method,
      headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "organization-id": organizationId
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Partner created successfully!");
      navigate(`/dashboard/${organizationId}/partners`);
    } else {
      alert("Failed to create partner");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong!");
  }
};

export const fetchPartner = async (partnerId, setFormData, setError) => {
  const token = localStorage.getItem('authToken');
  const organizationId = sessionStorage.getItem('currentOrganizationId')
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}${Paths.Partners}/${partnerId}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "organization-id": organizationId
      }
    });

    const responseJson = await response.json();

    if (responseJson.statusCode == 200) {
      const data = responseJson.data
      setFormData({
        name: data.name || "",
        description: data.description || "",
        phone: data.phone || "",
      });
    } else {
      setError(response.message)
    }
  } catch (error) {
    console.error(error);
    setError(error.message)
  }
};