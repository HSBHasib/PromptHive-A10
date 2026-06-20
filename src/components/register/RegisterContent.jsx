"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, TextField, Label, Button } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { FiUpload } from "react-icons/fi";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { uploadImageToImgBB } from "@/lib/core/ImageBB";

const RegisterContent = () => {
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_Logo_API;

  const onSubmit = async (formDataValues) => {
    const { name, email, password } = formDataValues;
    try {
      // Image Url SetUp
      const fileList = formDataValues.photoFile;

      if (!fileList || fileList.length === 0) {
        toast.warning("Please select a valid image file first!");
        return;
      }

      const imageFile = fileList[0];
      const uploadedPhotoURL = uploadImageToImgBB(imageFile);

      if (!uploadedPhotoURL) {
        toast.error("Image upload failed. Please try again.");
        return;
      }

      // BetterAuth Sign Up call
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: uploadedPhotoURL,
        role: "user",
        status: "active",
        plan: "free"
      });

      // If Any error catch
      if (error) {
        console.error("BetterAuth Error Details: ", error);
        toast.error(error.message || "Failed to create account.");
        return;
      }

      // After successfully register
      if (data) {
        console.log("success data is - ", data);
        toast.success("Account created successfully!");
      }
    } catch (error) {
      console.error("Catch Block Error: ", error);
      toast.error("Something went wrong during the registration process.");
    }
  };

  // Handle Google SignIn Func
  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      toast.error("Google login failed.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center bg-[#F5EBEB] px-4 py-12">
      <div className="w-full max-w-lg bg-[#E4D0D0]/50 backdrop-blur-md border border-[#E4D0D0] rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="text-center mb-7 space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-[#867070]">
            Create Account
          </h2>
          <p className="text-sm text-[#867070]">
            Join the community-driven AI marketplace
          </p>
        </div>

        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full"
        >
          {/* Full Name Field */}
          <TextField isInvalid={!!errors.name} className="w-full">
            <Label className="text-[#867070] text-sm font-medium mb-1">
              Full Name
            </Label>
            <input
              type="text"
              placeholder="Enter your Name"
              className="w-full h-11 px-4 bg-[#F5EBEB] border border-[#D5B4B4] focus:border-[#867070] focus:outline-none rounded-xl text-[#867070] placeholder:text-[#867070]/60 text-sm transition-colors"
              {...register("name", {
                required: "Name is required",
                validate: {
                  onlyLetters: (value) =>
                    /^[A-Za-z\s]+$/.test(value) ||
                    "Name can only contain letters and spaces",
                  minLengthThree: (value) =>
                    value.trim().length >= 3 ||
                    "Name must contain at least 3 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1 pl-1">
                {errors.name.message}
              </p>
            )}
          </TextField>

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

          {/* Image Input Field */}
          <TextField isInvalid={!!errors.photoFile} className="w-full">
            <Label className="text-[#867070] text-sm font-medium mb-1">
              Profile Image
            </Label>
            <div className="relative flex items-center w-full h-11 bg-[#F5EBEB] border border-[#D5B4B4] rounded-xl text-[#867070] text-sm overflow-hidden group focus-within:border-[#867070] transition-colors">
              <input
                type="file"
                accept="image/*"
                className="w-full h-full px-4 pt-2 cursor-pointer opacity-100 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#867070] file:text-white hover:file:bg-[#867070]/90 text-sm text-[#867070]/70"
                {...register("photoFile", {
                  required: "Profile image is required",
                })}
              />
              <FiUpload className="absolute right-4 text-[#867070]/60 pointer-events-none group-hover:text-[#867070]" />
            </div>
            {errors.photoFile && (
              <p className="text-xs text-red-500 mt-1 pl-1">
                {errors.photoFile.message}
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
                minLength: {
                  value: 6,
                  message: "Must be at least 6 characters",
                },
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
            {isSubmitting ? "Creating Account..." : "Register"}
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
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-[#867070] hover:underline"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterContent;

