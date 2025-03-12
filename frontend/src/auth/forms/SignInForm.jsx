import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "../../hooks/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { signInUser } from "../../redux/user/userSlice";

const formSchema = z.object({
  email: z.string().min({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const SignInForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      setLoading(true);
      setErrMessage(null);

      // Wait for the API call to finish and get the result
      const result = await dispatch(signInUser(values));

      setLoading(false);

      if (result.success === false) {
        // toast({title: "Sign in failed! Please try again."})
        return setErrMessage(result.message);
      }

      // toast({title: "Sign in Successful"})
      navigate("/");
    } catch (error) {
      setErrMessage(error.message);
      setLoading(false);
      // toast({title: "Something went wrong! Please try again."})
    }
  }

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl sm:max-w-5xl mx-auto flex-col md:flex-row md:item-center gap-5">
        <div className="flex-1">
          <Link
            to={"/"}
            className="font-bold text-2xl sm:text-4xl flex flex-wrap"
          >
            <span className="text-slate-500">Morning</span>
            <span className="text-slate-900">Dispatch</span>
          </Link>
          <h2 className="text-[24px] md:text-[30px] font-bold leading-[140%] tracking-tighter pt-5 sm:pt-12">
            Sign in to your account.
          </h2>
          <p className="text-slate-500 text-[14px] font-medium leading-[140%] md:text-[16px] md:font-normal mt-2">
            Welcome back, Please provide your details
          </p>
        </div>

        <div className="flex-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="xyz@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-blue-500 w-full"
                disabled={loading}
              >
                {loading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : (
                  <span>Sign In</span>
                )}
              </Button>
            </form>
          </Form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to={"/sign-up"} className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errMessage && <p className="mt-5 text-red-500">{errMessage}</p>}
        </div>
      </div>
    </div>
  );
};
export default SignInForm;
