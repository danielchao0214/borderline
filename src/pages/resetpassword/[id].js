import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import { TextField, Button } from "@mui/material";
import styles from "@/pages/resetpassword/ResetPassword.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  const [resetError, setResetError] = useState("");
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    console.log(id);
  }, [router.query]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the passwords match
    if (newPassword !== newPasswordRepeat) {
      setResetError("Passwords do not match");
      return;
    }

    try {
      // Send a request to your backend API to update the password
      const response = await fetch("/api/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: id, // Retrieve the token from the URL query parameters
          newPassword: newPassword,
        }),
      });

      if (response.status === 200) {
        // Password reset successful
        router.push("/login"); // Redirect to the login page or any other page you want
      } else {
        setResetError("Password reset failed. Please try again."); // Set the error message
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setResetError("Password reset failed. Please try again."); // Set the error message
    }
  };

  return (
    <>
      <main className={styles.main}>
        <div className={styles.squircle}>
          <div id={styles.text}>
            <div className={styles.heading}>
              <p>New Password</p>
            </div>
            <div className={styles.description}>
              <p>Enter your new password below</p>
            </div>
            {resetError && <p style={{ color: "red" }}>{resetError}</p>}{" "}
            {/* Error message */}
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextField
              label="Password"
              className={styles.formTextField}
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              margin="normal"
              variant="outlined"
              type="password"
            />
            <TextField
              label="Confirm Password"
              className={styles.formTextField}
              value={newPasswordRepeat}
              onChange={(event) => setNewPasswordRepeat(event.target.value)}
              margin="normal"
              variant="outlined"
              type="password"
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                className={styles.submitbutton}
                type="submit"
                variant="contained"
              >
                Reset
              </Button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
