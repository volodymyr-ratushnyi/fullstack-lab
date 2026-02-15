"use client";

import {registerUser} from "@/actions/user/userActions";
import {IRegisterFormData} from "@/types/formData";
import {Button, Form, Input} from "@heroui/react";
import React, {useState} from "react";

interface IProps {
  onClose: () => void;
}

const RegistrationForm = ({ onClose }: IProps) => {
  const [formData, setFormData] = useState<IRegisterFormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await registerUser(formData);
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
      validate={(value) => validateEmail(value) ? null : "Invalid email"}
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
      validate={(value) => value.length < 6 ? "Password is too short, need 6 symbols" : null}
    />
    <Input
      aria-label={"Confirm password"}
      isRequired
      name={"confirmPassword"}
      placeholder={"Confirm password"}
      type={"password"}
      value={formData.confirmPassword}
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm focus:outline-none "
      }}
      onChange={({target}) => setFormData((data) => ({...data, confirmPassword: target.value}))}
      validate={(value) => formData.password !== value ? "Password dosen't match" : null}
    />
    <div className={"flex w-full gap-4 items-center pt-4 justify-end"}>
      <Button variant={"light"} onPress={onClose}>
        Cancel
      </Button>
      <Button color={"primary"} type={"submit"}>
        Sign up
      </Button>
    </div>
  </Form>;
};

export default RegistrationForm;
