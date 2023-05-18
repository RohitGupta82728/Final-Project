import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as Yup from "yup";
import { signInUser } from "../../redux/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../../app/store";

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email("This is not valid email")
    .required("This field is required"),
  password: Yup.string()
    .required("This field is required")
    .test(
      "len",
      "Password is too long - should be 8 characters maximum.",
      (value: any) => value !== undefined && value.length >= 8
    ),
});

const theme = createTheme();
type AppDispatch = ThunkDispatch<any, any, AnyAction>;
export default function SignIn() {

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { control, handleSubmit, getValues } = useForm({
    resolver: yupResolver(signInSchema),
    mode: "onChange",
  });

  const { loading, error }:any = useSelector((state: RootState) => {
    return state.user;
  });
  const token = useSelector((state: RootState) => state.user.token);

  // const validationSchema = Yup.object().shape({
  //   email: Yup.string()
  //     .email("Invalid email address")
  //     .required("Email is required"),
  //   password: Yup.string().required("Password is required"),
  // });

  const onSubmit = () => {
    const data = { ...getValues() };
    // console.log(data, "data");
    //@ts-ignore
    const {email,password}=data;
    dispatch(signInUser({email,password}));
  };

  React.useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 18,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
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
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    value={value}
                    onChange={onChange}
                    autoFocus
                    error={!!error?.message}
                    helperText={error?.message}
                  />
                </>
              )}
            />
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
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    value={value}
                    onChange={onChange}
                    autoComplete="current-password"
                    error={!!error?.message}
                    helperText={error?.message}
                  />
                </>
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, fontSize: "18px", height: "46px" }}
            >
              Sign In
            </Button>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Typography variant="body2" component="div">
                  <NavLink
                    to="/"
                    style={{ textDecoration: "none", color: "blue" }}
                  >
                    {"Don't have an account? Sign Up"}
                  </NavLink>
                </Typography>
              </Grid>
            </Grid>
           
            {error === "User logged in successfully" ? (
            <Typography sx={{ color: "green" }}>{error}</Typography>
            ) : (
            <Typography sx={{ color: "red" }}>{error}</Typography>
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
// import Link from '@mui/material/Link';
// import { NavLink, useNavigate } from 'react-router-dom';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import * as Yup from 'yup';
// import { signInUser } from '../../redux/authReducer'; 
// import { useDispatch,useSelector } from 'react-redux';
// import { ThunkDispatch } from "redux-thunk";
// import { AnyAction } from "redux";
// import { RootState } from '../../app/store';


// const theme = createTheme();
// type AppDispatch = ThunkDispatch<any, any, AnyAction>;
// export default function SignIn() {
//   const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});
//   const [email,setEmail] = React.useState<string>("");
//   const [password,setPassword] = React.useState<string>("");
//   const dispatch:AppDispatch = useDispatch();
//   const navigate = useNavigate();
  
  
//   const {loading,error} = useSelector((state:RootState)=>{
//     return state.user
//     });
//     const token = useSelector((state: RootState) =>state.user.token);
    
    

//   const validationSchema = Yup.object().shape({
//     email: Yup.string().email('Invalid email address').required('Email is required'),
//     password: Yup.string().required('Password is required'),
//   });

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);
//     const formDataObj = Object.fromEntries(formData.entries());
//     try {
//       await validationSchema.validate(formDataObj, { abortEarly: false });
//       setFormErrors({});
//       dispatch(signInUser({email,password}));

//       console.log('Form submitted successfully');
//     } catch (error:any) {
//       const errors: { [key: string]: string } = {};
//       error.inner.forEach((e:any) => {
//         errors[e.path] = e.message;
//       });
//       setFormErrors(errors);
//     }
//   };

//   React.useEffect(()=>{
//     if(token){
//       navigate('/dashboard');
//     }
//   },[token])

//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 18,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               value={email}
//               onChange={(e)=>setEmail(e.target.value)}
//               autoFocus
//               error={!!formErrors.email}
//               helperText={formErrors.email}
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e)=>setPassword(e.target.value)}
//               autoComplete="current-password"
//               error={!!formErrors.password}
//               helperText={formErrors.password}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2,fontSize:'18px',height:'46px'}}
//             >
//               Sign In
//             </Button>
//             <Grid container spacing={6}>
//               <Grid item xs={12} >
//               <Typography variant="body2" component="div">
//                 <NavLink to="/" style={{ textDecoration: 'none',color:"blue" }}>
//                  {"Don't have an account? Sign Up"}
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