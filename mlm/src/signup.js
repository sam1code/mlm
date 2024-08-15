import React, { useState, useEffect } from "react";
import {
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Snackbar,
  Grid,
  Paper,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signup } from "./api/interceptor"; // Import your signup API method
import { AuthContext } from "./context/AuthContext";

const Signup = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: "50vw",
    margin: "20px auto",
    maxWidth: "400px",
  };
  const avatarStyle = { backgroundColor: "#333" };
  const btnstyle = { margin: "8px 0" };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [referralToken, setReferralToken] = useState("");
  const [joiningAmount, setJoiningAmount] = useState(100);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authInfo.isAuthenticated) {
      return navigate("/");
    }
  }, []);

  const { authInfo, updateAuthInfo } = React.useContext(AuthContext);

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setLoading(true);
      const userData = {
        email,
        password,
        name,
        referralToken,
        joiningAmount,
      };
      const response = await signup(userData);
      console.log(response.tokens);
      localStorage.setItem("token", response.tokens?.token);
      localStorage.setItem("refreshToken", response.tokens?.refreshToken);
      updateAuthInfo();
      navigate("/");
      navigate("/"); // Redirect to home page or login page after successful signup
    } catch (error) {
      console.error("Signup error:", error);
      setOpen(true);
      setMessage(
        "Failed to signup. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "lightgrey",
      }}
    >
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center" mb={2}>
          <h2>MLM</h2>
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
        </Grid>
        <Box mb={2}>
          <TextField
            label="Email"
            placeholder="Enter Email"
            variant="outlined"
            fullWidth
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Password"
            placeholder="Enter Password"
            variant="outlined"
            fullWidth
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Name"
            placeholder="Enter Name"
            variant="outlined"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Referral Token"
            placeholder="Enter Referral Token"
            variant="outlined"
            fullWidth
            value={referralToken}
            onChange={(e) => setReferralToken(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Joining Amount"
            placeholder="Enter Joining Amount"
            variant="outlined"
            fullWidth
            type="number"
            value={joiningAmount}
            onChange={(e) => setJoiningAmount(e.target.value)}
          />
        </Box>
        <Button
          type="submit"
          color="#000"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={handleSignup}
          disabled={!email || !password || !name || loading}
        >
          Sign Up
        </Button>
        <Typography>
          <Link
            style={{
              textDecoration: "none",
              color: "black",
              fontSize: "15px",
            }}
            href="#"
          >
            Forgot password ?
          </Link>
        </Typography>
        <Typography
          style={{
            textDecoration: "none",
            color: "black",
            fontSize: "15px",
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          Already have an account?{" "}
          <Link
            style={{
              color: "black",
              fontSize: "15px",
              textDecoration: "underline",
            }}
            href="/login"
          >
            Sign In
          </Link>
        </Typography>
      </Paper>
      <Snackbar open={open} autoHideDuration={6000} message={message} />
    </Grid>
  );
};

export default Signup;
