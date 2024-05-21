"use client";
import Form from "../../src/components/Form";
import "./login.css";
// login page
export default function Login() {
  return (
    <div className="form-div">
      <Form
        route="/api/token/"
        method="login"
      />
    </div>
  );
}
