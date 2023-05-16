import React, { useState } from "react";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import { TextField, Button } from "@mui/material";
import styles from "@/pages/resetpasswordemail/ResetPasswordEmail.module.css";
import { sendResetEmail } from "../../../lib/api";

const inter = Inter({ subsets: ["latin"] });

export default function ResetPasswordEmail() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [submitEnabled, setSubmitEnabled] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboardmaps");
    }
  }, [isLoggedIn]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      return; // Prevent submitting when the email is empty
    }

    console.log(`Submitted: ${email}`);
    setSubmitEnabled(true);
    await sendResetEmail(email);
  };

  return (
    <main className={styles.main}>
      <div className={styles.squircle}>
        <div id={styles.text}>
          <div className={styles.heading}>
            <p>Reset Password</p>
          </div>
          <div className={styles.description}>
            <p>Enter your email address below</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <TextField
            label="Email Address"
            className={styles.formTextField}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            margin="normal"
            variant="outlined"
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              className={styles.submitbutton}
              type="submit"
              variant="contained"
              disabled={submitEnabled}
            >
              Send Reset Link
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
