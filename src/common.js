export const applyColorVariables = (colorVars) => {
    const root = document.documentElement;
    Object.entries(colorVars).forEach(([property, value]) => {
        if (value) {
            root.style.setProperty(property, value);
        }
    });
};

export const handleApiRequest = async (navigate, setData, setError, path, headers) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    navigate('/login');
  }
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...headers
      }
    });
    const responseJson = await response.json();
    if (response.status == 401) {
      localStorage.removeItem('authToken');
      navigate('/login');
    }
    if (response.status !== 200) {
      setError({ message: responseJson.message, statusCode: response.status });
    }
    setData(responseJson.data);
  }
  catch (error) {
    console.error(`Error fetching ${path}`, error);
    setError({ message: error.message, statusCode: error.status });
  }
};