"use client";
import Form from "../../src/components/Form";
import "./register.css";
// login page
export default function Register() {
  return (
    <div className="form-div">
      <Form
        route="/api/user/register/"
        method="register"
      />
    </div>
  );
}
