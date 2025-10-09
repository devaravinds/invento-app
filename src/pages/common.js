export const applyColorVariables = (colorVars) => {
    const root = document.documentElement;
    Object.entries(colorVars).forEach(([property, value]) => {
        if (value) {
            root.style.setProperty(property, value);
        }
    });
};

export const fetchData = async (navigate, setData, setHasError, path, headers) => {
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
    if (!response.ok) {
      setHasError(true);
    }
    const responseJson = await response.json();
    setData(responseJson.data);
  }
  catch (error) {
    console.error(`Error fetching ${path}`, error);
    setHasError(true);
  }
};