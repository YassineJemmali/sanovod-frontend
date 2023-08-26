import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavHeader from "./Components/NavHeader";
import Footer from "./Components/Footer";

function App() {
  return (
    <div>
      <NavHeader />
      <ToastContainer />
      <Container className="my-2">
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
