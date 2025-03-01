import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Grid, Card, TextField, Button, Typography, IconButton, InputAdornment, FormControlLabel, Checkbox } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// Validation Schema
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  // type: yup.string().required("Type is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  isAdmin: yup.boolean(),
});

// Default Values
const defaultValues = {
  username: "",
  email: "",
  password: "",
  // type: "",
  isAdmin: false,
};

const RegisterUser = () => {
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

  // React Query Mutation for User Registration
  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post("http://localhost:3000/api/users/register", data);
      return response.data;
    },
    onSuccess: () => {
      alert("User registered successfully");
      navigate("/");
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Something went wrong");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data); // Call API using React Query mutation
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
      <Grid item xs={12} sm={8} md={4}>
        <Card sx={{ padding: 1, width: "100%", maxWidth: 350, mx: "auto" }}>
          <Typography variant="h5" align="center" gutterBottom>
            Register
          </Typography>

          {mutation.isError && (
            <Typography color="error" align="center">
              {mutation.error?.response?.data?.message || "Something went wrong"}
            </Typography>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField 
                  {...field} 
                  label="Username" 
                  variant="outlined" 
                  fullWidth 
                  margin="normal" 
                  error={!!errors.username} 
                  helperText={errors.username?.message} 
                  size="small" 
                />
              )}
            />

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

            {/* <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <TextField 
                  {...field} 
                  label="Type" 
                  variant="outlined" 
                  fullWidth 
                  margin="normal" 
                  error={!!errors.type} 
                  helperText={errors.type?.message} 
                  size="small" 
                />
              )}
            /> */}

            <Controller
              name="isAdmin"
              control={control}
              render={({ field }) => (
                <FormControlLabel 
                  control={<Checkbox {...field} checked={field.value} />} 
                  label="Is Admin" 
                />
              )}
            />

            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth 
              sx={{ mt: 2 }}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Registering..." : "Register"}
            </Button>
          </form>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account? <a href="/">Login Now</a>
          </Typography>
        </Card>
      </Grid>
    </Grid>
  );
};

export default RegisterUser;
