"use client";

import {Button, Form, Input} from "@heroui/react";
import {FormEvent, useState} from "react";

interface IProps {
  onClose: () => void;
}

const LoginForm = ({ onClose }: IProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login form submitted", formData)
    onClose();
  }

  return <Form className={"w-full"} onSubmit={handleSubmit}>
    <Input
      aria-label={"Email"}
      isRequired
      name={"email"}
      placeholder={"Input email"}
      type={"email"}
      value={formData.email}
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm focus:outline-none "
      }}
      onChange={({target}) => setFormData((data) => ({...data, email: target.value}))}
      validate={(value) => !value ? "Email is required" : !validateEmail(value) ? "Invalid email" : null}
    />
    <Input
      aria-label={"Password"}
      isRequired
      name={"password"}
      placeholder={"Input password"}
      type={"password"}
      value={formData.password}
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm focus:outline-none "
      }}
      onChange={({target}) => setFormData((data) => ({...data, password: target.value}))}
      validate={(value) => !value ? "Password is required" : null}
    />
    <div className={"flex w-full gap-4 items-center pt-4 justify-end"}>
      <Button variant={"light"} onPress={onClose}>
        Cancel
      </Button>
      <Button color={"primary"} type={"submit"}>
        Sign in
      </Button>
    </div>
  </Form>;
};

export default LoginForm;
