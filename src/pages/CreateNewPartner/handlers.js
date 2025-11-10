import { Paths } from "../../constants/Paths";

export const handleChange = (e, setFormData) => {
  const { name, value } = e.target;
  setFormData((prev) => {
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      return {
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      };
    }

    return {
      ...prev,
      [name]: value,
    };
  });
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

    if (responseJson.statusCode === 200) {
      const data = responseJson.data
      setFormData({
        name: data.name || "",
        description: data.description || "",
        phone: data.phone || "",
        address: {
          line1: data.address?.line1 || "",
          line2: data.address?.line2 || "",
          city: data.address?.city || "",
          state: data.address?.state || "",
          pin: data.address?.pin || ""
        },
        gstNumber: data.gstNumber || ""
      });
    } else {
      setError({ message: responseJson.message, statusCode: response.status });
    }
  } catch (error) {
    console.error(error);
    setError({ message: error.message, statusCode: error.status });
  }
};