import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import { TextField, Button } from "@mui/material";
import styles from "@/pages/createaccount/CreateAccount.module.css";
import AuthContext from "@/components/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountCreationError, setAccountCreationError] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboardmaps");
    }
  }, [isLoggedIn]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let url = "/api/auth";
    const res = await fetch(url, {
      method: "Post",
      body: JSON.stringify({
        firstName,
        lastName,
        username,
        email,
        password,
        confirmPassword,
      }),
      headers: {
        "content-type": "application/json",
      },
    }).catch((e) => console.log(e));

    // Wait for the response from the request and get the body
    const data = await res.json();

    // If status code returns an error, set the account creation error flag
    if (res.status === 400) {
      setAccountCreationError(true);
      console.log(data.errorMessage);
    }

    // If the route is successful, log the results and redirect the user to the login screen
    if (res.status === 200) {
      console.log(data.message);
      router.push("/login");
    }
  };

  return (
    <>
      <main className={styles.main}>
        <div className={styles.squircle}>
          <div id={styles.text}>
            <div className={styles.heading}>
              <p>Create Account</p>
            </div>
            <div className={styles.description}>
              <p>Enter your information below</p>
            </div>
            {accountCreationError && (
              <p className={styles.errorText}>
                Account creation failed. Please try again.
              </p>
            )}
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextField
              id="firstName"
              label="First Name"
              className={styles.formTextField}
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="lastName"
              label="Last Name"
              className={styles.formTextField}
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="email"
              label="Email"
              className={styles.formTextField}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="username"
              label="Username"
              className={styles.formTextField}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              className={styles.formTextField}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              className={styles.formTextField}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              margin="normal"
              variant="outlined"
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                className={styles.submitbutton}
                type="submit"
                variant="contained"
              >
                Create Account
              </Button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
