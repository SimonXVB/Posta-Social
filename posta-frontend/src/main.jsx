import { createRoot } from 'react-dom/client'
import { Router } from './router'
import { GlobalPopup } from './context/globalPopupContext';

createRoot(document.getElementById('root')).render(
    <GlobalPopup>
        <Router />
    </GlobalPopup>
);