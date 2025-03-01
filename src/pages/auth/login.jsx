import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Grid2, Card, TextField, Button, Typography, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "./api/auth";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

const defaultValues = {
  email: "",
  password: "",
};

const Login = () => {
  
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login Success:", data);
      localStorage.setItem("token", data.token); // Store token if needed
      navigate("/dashboard"); // Redirect after login
    },
    onError: (error) => {
      console.error("Login Failed:", error.response?.data?.message || "Something went wrong");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Grid2 container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }} >
      <Grid2 item xs={12} sm={8} md={4}>
        <Card sx={{ padding: 3, width: "100%", maxWidth: 350, mx: "auto" }}>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField 
                  {...field} 
                  label="Email" 
                  variant="outlined" 
                  fullWidth 
                  margin="normal" 
                  error={!!errors.email} 
                  helperText={errors.email?.message} 
                  size="small" 
                />
              )}
            />
            
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  size="small" 
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
          </form>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account? <a href="/register">Register Now</a>
          </Typography>
        </Card>
      </Grid2>
    </Grid2>
  );
};

export default Login;
