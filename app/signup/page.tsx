"use client";
import React, { useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Link from "next/link";

interface FormData {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
}

const SignupScreen = () => {
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstname) newErrors.firstname = "First name is required";
    if (!formData.lastname) newErrors.lastname = "Last name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Form is valid, proceed with submission
      console.log("Form submitted:", formData);
      // Add your API call or form processing here
    }
  };
  return (
    <div className="h-screen flex justify-center items-center max-w-md mx-auto">
      <div className="w-full p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center items-center font-bold text-4xl text-sky mb-3">
          <h2>Signup</h2>
        </div>

        <div>
          <Input
            label="Firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="Azizul"
            error={errors.firstname}
          />
          <Input
            label="Lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Islam"
            error={errors.lastname}
          />
          <Input
            label="Phone number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+880 1785499284"
            error={errors.phone}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="test@gmail.com"
            error={errors.email}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="****"
            error={errors.password}
          />
        </div>

        <div className="w-full mb-4">
          <Button
            variant="primary"
            className="w-full cursor-pointer"
            type="submit"
            onClick={handleSubmit}
          >
            Register
          </Button>
        </div>

        <div className="relative border-t border-custom-border py-2">
          <span className="absolute left-1/2 -top-2 -translate-x-1/2 bg-custom-border px-1 text-xs rounded-xs">
            ALREADY HAVE AN ACCOUNT
          </span>
        </div>

        <Link href={"/login"}>
          <Button variant="outline" size="sm" className="w-full cursor-pointer">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SignupScreen;
