import { ToastContainer } from 'react-toastify';
import MyRoutes from './routes/MyRoutes';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <MyRoutes />
      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        position="bottom-center"
        newestOnTop={true}
        limit={3}
        style={{ width: '300px', fontSize: '12px' }}
      />
    </>
  );
}

export default App;
