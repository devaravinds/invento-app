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

export const fetchPartner = async (partnerId, setFormData) => {
  const token = localStorage.getItem('authToken');
  const organizationId = sessionStorage.getItem('currentOrganizationId')
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/partners/${partnerId}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "organization-id": organizationId
      }
    });

    if (res.ok) {
      const data = (await res.json()).data;
      console.log(data)
      setFormData({
        name: data.name || "",
        description: data.description || "",
        phone: data.phone || "",
      });
    } else {
      alert("Failed to fetch partner data");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong while fetching partner data!");
  }
};