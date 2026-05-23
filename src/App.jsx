import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/routes";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { ResetCodeProvider } from "./context/ResetCodeContext";
const App = () => {
  return (
    <ResetCodeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </ResetCodeProvider>
  );
};

export default App;
