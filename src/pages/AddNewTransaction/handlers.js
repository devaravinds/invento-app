import { Paths } from "../../constants/Paths";

export const handleSubmit = async (e, transactionId, navigate, formData, setHasError) => {
  const token = localStorage.getItem('authToken');
  e.preventDefault();
  const url = transactionId
      ? `${process.env.REACT_APP_API_URL}/transactions/${transactionId}`
      : `${process.env.REACT_APP_API_URL}/transactions`;

  console.log("url:", url);

  const method = transactionId ? "PUT" : "POST";
  try {
    const response = await fetch(url, {
      method: method,
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

export const fetchTransaction = async (transactionId, setFormData, setError) => {
  const token = localStorage.getItem('authToken');
  const organizationId = sessionStorage.getItem('currentOrganizationId')
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}${Paths.Transactions}/${transactionId}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "organization-id": organizationId
      }
    });

    const responseJson = await response.json();

    if (responseJson.statusCode == 200) {
      const data = responseJson.data
      setFormData({
        productId: data.productId,
        partnerId: data.partnerId,
        rate: data.rate,
        outletId: data.outletId,
        quantity: {
          count: data.quantity.count,
          unit: data.quantity.unit,
        },
        transactionType: data.transactionType,
        transactionStatus: data.transactionStatus,
        dueDate: data.dueDate,
        paidOn: data.paidOn,
      });
    } else {
      setError(response.message)
    }
  } catch (error) {
    console.error(error);
    setError(error.message)
  }
};