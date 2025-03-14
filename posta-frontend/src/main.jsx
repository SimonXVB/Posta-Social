import { createRoot } from 'react-dom/client'
import { Router } from './router'
import { GlobalError } from './context/globalErrorContext';

createRoot(document.getElementById('root')).render(
  <GlobalError>
      <Router />
  </GlobalError>
);