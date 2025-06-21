"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { useLogin } from "@/hooks/useLogin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface FormData {
  email: string;
  password: string;
}

const LoginScreen = () => {
  const router = useRouter();
  const { isAuthenticated } = useUser();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    if (isAuthenticated) router.push("/");
  }, [isAuthenticated]);

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

  const { mutate: login, isPending } = useLogin();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const payload = {
        email: formData?.email,
        password: formData?.password,
      };
      login(payload);
    }
  };

  return (
    !isAuthenticated && (
      <div className="h-screen flex justify-center items-center max-w-md mx-auto">
        <div className="w-full p-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-center items-center font-bold text-4xl text-sky mb-3">
            <h2>Login</h2>
          </div>

          <div>
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
              isLoading={isPending}
            >
              Login
            </Button>
          </div>

          <div className="relative border-t border-custom-border py-2">
            <span className="absolute left-1/2 -top-2 -translate-x-1/2 bg-custom-border px-1 text-xs rounded-xs">
              DON"T HAVE AN ACCOUNT
            </span>
          </div>

          <Link href={"/signup"}>
            <Button
              variant="outline"
              size="sm"
              className="w-full cursor-pointer text-blue"
            >
              Signup
            </Button>
          </Link>
        </div>
      </div>
    )
  );
};

export default LoginScreen;
