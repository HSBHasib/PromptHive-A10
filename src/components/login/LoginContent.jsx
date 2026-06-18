"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, TextField, Label, Button } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const LoginContent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // 💡 Email and Password Sign In Handler
  const onSubmit = async (formDataValues) => {
    const { email, password } = formDataValues;
    
    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password.");
        return;
      }

      if (data) {
        toast.success("Welcome back! Logged in successfully.");
        router.push("/"); 
      }
    } catch (error) {
      toast.error("Something went wrong during login.");
    }
  };

  // 💡 Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Google Auth Error:", error);
      toast.error("Google Sign-In failed.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center bg-[#F5EBEB] px-4 py-12">
      <div className="w-full max-w-lg bg-[#E4D0D0]/50 backdrop-blur-md border border-[#E4D0D0] rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="text-center mb-7 space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-[#867070]">
            Welcome Back
          </h2>
          <p className="text-sm text-[#867070]">
            Log in to manage your AI marketplace account
          </p>
        </div>

        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full"
        >
          {/* Email Field */}
          <TextField isInvalid={!!errors.email} className="w-full">
            <Label className="text-[#867070] text-sm font-medium mb-1">
              Email Address
            </Label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full h-11 px-4 bg-[#F5EBEB] border border-[#D5B4B4] focus:border-[#867070] focus:outline-none rounded-xl text-[#867070] placeholder:text-[#867070]/60 text-sm transition-colors"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1 pl-1">
                {errors.email.message}
              </p>
            )}
          </TextField>

          {/* Password Field */}
          <TextField isInvalid={!!errors.password} className="w-full relative">
            <Label className="text-[#867070] text-sm font-medium mb-1">
              Password
            </Label>
            <input
              type={isVisible ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full h-11 px-4 bg-[#F5EBEB] border border-[#D5B4B4] focus:border-[#867070] focus:outline-none rounded-xl text-[#867070] placeholder:text-[#867070]/40 text-sm transition-colors"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <Button
              isIconOnly
              aria-label={isVisible ? "Hide password" : "Show password"}
              size="sm"
              variant="light"
              onPress={() => setIsVisible(!isVisible)}
              className="absolute right-2 top-8 text-[#867070]/70 hover:text-[#867070] min-w-8 w-8 h-8 rounded-lg"
            >
              {isVisible ? (
                <IoIosEye className="size-5" />
              ) : (
                <IoIosEyeOff className="size-5" />
              )}
            </Button>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1 pl-1">
                {errors.password.message}
              </p>
            )}
          </TextField>

          {/* Submit Button */}
          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full mt-2 bg-[#867070] hover:bg-[#867070]/90 text-white font-medium py-3 h-11 rounded-xl shadow-md transition-transform active:scale-[0.98]"
          >
            {isSubmitting ? "Logging In..." : "Log In"}
          </Button>
        </Form>

        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-[#867070]/20"></div>
          <span className="px-3 text-xs text-[#867070]/60 uppercase tracking-wider">
            Or
          </span>
          <div className="flex-1 border-t border-[#867070]/20"></div>
        </div>

        {/* Google Login */}
        <Button
          onPress={handleGoogleSignIn}
          variant="flat"
          className="w-full h-11 bg-[#F5EBEB] hover:bg-[#E4D0D0] text-[#867070] border border-[#D5B4B4] font-medium rounded-xl flex items-center justify-center gap-3 transition-colors text-sm"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </Button>

        <p className="text-center text-sm text-[#867070]/80 mt-6">
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-semibold text-[#867070] hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginContent;

