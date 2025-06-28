"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useRegisterUserModal } from "@/hooks/useRegisterUser";
import React, { useEffect, useState } from "react";
type ROLE = "ADMIN";

interface FormData {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
  role: ROLE;
}

const AdminForm = ({ handleClose }: { handleClose: () => void }) => {
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    role: "ADMIN",
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
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^(?:\+8801|01)[3-9]\d{8}$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid";
    }
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

  const { mutate: register, isPending, isSuccess } = useRegisterUserModal();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const payload = {
        firstName: formData?.firstname,
        lastName: formData?.lastname,
        email: formData?.email,
        phoneNumber: formData?.phone,
        password: formData?.password,
        role: formData?.role,
      };
      register(payload);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      handleClose();
      setFormData({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        password: "",
        role: "ADMIN",
      });
    }
  }, [isSuccess]);

  return (
    <>
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
      <div className="flex justify-end space-x-3">
        <Button
          variant="secondary"
          onClick={handleSubmit}
          size="sm"
          className="px-4 py-2"
          isLoading={isPending}
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default AdminForm;
