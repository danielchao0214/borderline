import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import { TextField, Button } from "@mui/material";
import styles from "@/pages/login/Login.module.css";
import Link from "next/link";
import AuthContext from "@/components/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [loginError, setLoginError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboardmaps");
    }
  }, [isLoggedIn]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let url = "/api/authLogin";
    const res = await fetch(url, {
      method: "Post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "content-type": "application/json",
      },
    }).catch((e) => console.log(e));

    // wait for the response from request and get the body
    const data = await res.json();

    // If status code returns error, set login error flag
    if (res.status === 401) {
      setLoginError(true);
      console.log(data.errorMessage);
    }

    //If route is good then log the results and route the user to the dashboard
    if (res.status === 200) {
      const { firstName, lastName, username } = data.user;
      setIsLoggedIn(true);
      document.cookie = `token=${res.token}; path=/;`;
      router.push("/dashboardmaps");
    }
  };

  return (
    <>
      <div className={styles.loginPage}>
        <main className={styles.main}>
          <div className={styles.squircle}>
            <div id={styles.text}>
              <div className={styles.heading}>
                <p>Sign in</p>
              </div>
              <div className={styles.description}>
                <p>Enter your information below</p>
              </div>
              {loginError && (
                <p className={styles.errorText}>
                  Login failed. Please try again.
                </p>
              )}
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <TextField
                label="Email"
                className={styles.formTextField}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Password"
                className={styles.formTextField}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                margin="normal"
                variant="outlined"
              />
              <Link href="/resetpasswordemail" id={styles.forgotpassword}>
                Forgot password?
              </Link>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  className={styles.submitbutton}
                  type="submit"
                  variant="contained"
                >
                  Log in
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
