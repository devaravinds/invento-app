import { RouterProvider } from 'react-router-dom';
import './App.css';
import { Router } from './config/routes';


function App() {
  return (
    <div className="App">
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
