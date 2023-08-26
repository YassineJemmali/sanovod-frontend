import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../Components/FormContainer";
import { useDispatch } from "react-redux";
import { login } from "../Redux/userSlice";
import { toast } from "react-toastify";
import IM from "../IM";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Dispatch de l'action de connexion pour obtenir les informations de l'utilisateur
      await dispatch(login({ formValue, toast }));

      // Redirection en utilisant les informations de rôle directement depuis le composant IM
      const { roleConnected } = IM();

      if (roleConnected === "Admin") {
        // Rediriger vers la page d'administration
        navigate("/tdbadmin");
      } else if (roleConnected === "Modérateur") {
        // Rediriger vers la page de modérateur
        navigate("/tdbmoderateur");
      } else if (roleConnected === "Abonné") {
        // Rediriger vers la page d'abonné
        navigate("/tdbabonne");
      } else {
        // Rediriger vers la page par défaut (peut être personnalisée)
        navigate("/");
      }
    } catch (error) {
      // Gérer les erreurs ici (par exemple, afficher un message d'erreur)
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            onChange={changeHandler}
            type="email"
            placeholder="Enter Email"
            name="email"
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={changeHandler}
            type="password"
            placeholder="Enter your password"
            name="password"
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          Sign In
        </Button>
        <Row className="py-3">
          <Col>
            New User? <Link to="/register">Register</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default LoginPage;
