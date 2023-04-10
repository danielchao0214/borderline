import React, { useState } from "react";
import { useRouter } from 'next/router'
import { Inter } from 'next/font/google'
import { TextField, Button } from '@mui/material';
import styles from '@/pages/resetpassword/ResetPassword.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Submitted: ${email} ${password}`);
    router.push('/'); // this should be changed to whatever
    // handle submit logic here
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
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextField
              label="Password"
              className={styles.formTextField}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Confirm Password"
              className={styles.formTextField}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              margin="normal"
              variant="outlined"
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button className={styles.submitbutton} type="submit" variant="contained">
                Reset
              </Button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}