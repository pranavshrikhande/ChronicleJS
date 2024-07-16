import React from 'react';
//import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import store from './store';
// ReactDOM.render(
//   <React.StrictMode>
//     <Router>
//       <Routes>
//         <Route path="/*" element={<App />} />
//       </Routes>
//     </Router>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// ReactDOM.render(
//   <React.StrictMode>
//     <Router>
//       <Routes>
//         <Route path="/*" element={<App />} />
//       </Routes>
//     </Router>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
    </StoreProvider>
  </React.StrictMode>
);