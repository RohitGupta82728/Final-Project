import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { NavLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as yup from "yup";
import { signUpUser } from "../../redux/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../../app/store";

const theme = createTheme();
type AppDispatch = ThunkDispatch<any, any, AnyAction>;

export default function SignUp() {
  const dispatch: AppDispatch = useDispatch();
  const { loading, error,successMessage } = useSelector((state: RootState) => {
    return state.user;
  });
  

  const signUpSchema = yup.object().shape({
    firstName: yup.string().required("FirstName is must"),
    lastName: yup.string().required("LastName is must"),
    email: yup
      .string()
      .email("Please Provide valid email")
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide valid email"
      )
      .required("Email is must"),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "Password must contain Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
      )
      .required("Password is must"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), " "], "Passwords must match")
      .required("Confirm-Password is must"),
  });

  const { control, handleSubmit, getValues } = useForm({
    resolver: yupResolver(signUpSchema),
    mode: "onChange",
  });

  const onSubmit = () => {
    const data = { ...getValues() };
    // console.log(data, "data");
    dispatch(signUpUser(data));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" sx={{ minHeight: "400px" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        // autoFocus
                        value={value}
                        onChange={onChange}
                        error={!!error?.message}
                        helperText={error?.message}
                      />
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <TextField
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        // autoFocus
                        value={value}
                        onChange={onChange}
                        error={!!error?.message}
                        helperText={error?.message}
                      />
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <TextField
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        // autoFocus
                        value={value}
                        onChange={onChange}
                        error={!!error?.message}
                        helperText={error?.message}
                      />
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <TextField
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={value}
                        onChange={onChange}
                        error={!!error?.message}
                        helperText={error?.message}
                      />
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="confirmPassword"
                  control={control}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <TextField
                        fullWidth
                        label="confirmPassword"
                        type="password"
                        id="confirmPassword"
                        autoComplete="new-password"
                        value={value}
                        onChange={onChange}
                        error={!!error?.message}
                        helperText={error?.message}
                      />
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ fontSize: "16px" }}>
                  By clicking Sign Up, you agree to our Terms, Privacy Policy
                  and Cookies Policy.
                </Typography>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height: "46px", fontSize: "18px" }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="body2" component="div">
                  <NavLink
                    to="/signin"
                    style={{ textDecoration: "none", color: "blue" }}
                  >
                    {"Already have an account? Sign In"}
                  </NavLink>
                </Typography>
              </Grid>
            </Grid>
            
            {successMessage!=="User created successfully proceed to sigin"
            ? (
            <Typography sx={{ color: "red" }}>{successMessage}</Typography>
            ) : (
            <Typography sx={{ color: "green" }}>{successMessage}</Typography>
            )}
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
































// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';

// import { NavLink } from 'react-router-dom';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import * as yup from 'yup';
// import { signUpUser } from '../../redux/authReducer'; 
// import { useDispatch, useSelector } from 'react-redux';
// import { ThunkDispatch } from "redux-thunk";
// import { AnyAction } from "redux";
// import { RootState } from '../../app/store';


// const theme = createTheme();
// type AppDispatch = ThunkDispatch<any, any, AnyAction>;

// export default function SignUp() {
//   const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});
//   const [firstName,setFirstName] = React.useState<string>("");
//   const [lastName,setLastName] = React.useState<string>("");
//   const [email,setEmail] = React.useState<string>("");
//   const [password,setPassword] = React.useState<string>("");
//   const [confirmPassword,setConfirmPassword] = React.useState<string>("");
//   const dispatch: AppDispatch = useDispatch();
//   const {loading,error} = useSelector((state:RootState)=>{
//   return state.user
//   });


//    const schema = yup.object().shape({
//     firstName: yup.string().required("FirstName is must"),
//     lastName: yup.string().required("LastName is must"),
//     email: yup.string().email('Please Provide valid email').matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Please provide valid email").required("Email is must"),
//     password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,"Password must contain Minimum eight characters, at least one uppercase letter, one lowercase letter and one number")
//     .required("Password is must"),
//     confirmPassword: yup
//       .string()
//       .oneOf([yup.ref('password'), ' '], 'Passwords must match')
//       .required("Confirm-Password is must"),
//   });


//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);
//     const formDataObj = Object.fromEntries(formData.entries());
//     try {
//       await schema.validate(formDataObj, { abortEarly: false });
//       setFormErrors({});
//       dispatch(signUpUser({firstName,lastName,email,password,confirmPassword}));
//       console.log('Form submitted successfully');
//       // alert("Form submitted successfully you can login now")
//     } catch (error:any) {
//       const errors: { [key: string]: string } = {};
//       error.inner.forEach((e:any) => {
//         errors[e.path] = e.message;
//       });
//       setFormErrors(errors);
//     }
//   };



//   return (
//     <ThemeProvider theme={theme}>
//     <Container component="main" maxWidth="sm" sx={{minHeight:'400px'}}>
//       <CssBaseline />
//       <Box
//         sx={{
//           marginTop: 8,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Sign up
//         </Typography>
//         <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 autoComplete="given-name"
//                 name="firstName"
//                 required
//                 fullWidth
//                 id="firstName"
//                 label="First Name"
//                 autoFocus
//                 value={firstName}
//                 onChange={(e)=>setFirstName(e.target.value)}
//                 error={!!formErrors.firstName}
//                 helperText={formErrors.firstName}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 required
//                 fullWidth
//                 id="lastName"
//                 label="Last Name"
//                 name="lastName"
//                 autoComplete="family-name"
//                 value={lastName}
//                 onChange={(e)=>setLastName(e.target.value)}
//                 error={!!formErrors.lastName}
//                 helperText={formErrors.lastName}
//               />
//             </Grid>
//             <Grid item xs={12} >
//               <TextField
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 value={email}
//                 onChange={(e)=>setEmail(e.target.value)}
//                 autoComplete="email"
//                 error={!!formErrors.email}
//                 helperText={formErrors.email}
//               />
//             </Grid>
//             <Grid item xs={12} >
//               <TextField
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e)=>setPassword(e.target.value)}
//                 autoComplete="new-password"
//                 error={!!formErrors.password}
//                 helperText={formErrors.password}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 required
//                 fullWidth
//                 name="confirmPassword"
//                 label="confirmPassword"
//                 type="password"
//                 id="confirmPassword"
//                 autoComplete="new-password"
//                 value={confirmPassword}
//                 onChange={(e)=>setConfirmPassword(e.target.value)}
//                 error={!!formErrors.confirmPassword}
//                 helperText={formErrors.confirmPassword}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Typography sx={{ fontSize: '16px' }}>
//                 By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy.
//               </Typography>
//             </Grid>
//           </Grid>
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2,height:'46px',fontSize:'18px' }}
//           >
//             Sign Up
//           </Button>
//             <Grid container justifyContent="flex-end">
//               <Grid item>
//               <Typography variant="body2" component="div">
//                 <NavLink to="/signin" style={{ textDecoration: 'none',color:"blue" }}>
//                  {"Already have an account? Sign In"}
//                 </NavLink>
//               </Typography>
//               </Grid>
//             </Grid>
//             <Typography sx={{color:"red"}}>
//                 {error}
//             </Typography>
//           </Box>
//         </Box>
       
//       </Container>
//     </ThemeProvider>
//   );
// }
