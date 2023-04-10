import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from "react";
import { Inter } from 'next/font/google'
import { TextField, Button } from '@mui/material';
import styles from '@/styles/Login.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Submitted: ${email} ${password}`);
    // handle form submission logic here
  };
  return (
    <>
      <main className={styles.main}>
        <div className={styles.squircle}>
          <div className={styles.heading}>
            <p>Sign in</p>
          </div>
          <div className={styles.description}>
            <p>Enter your information below</p>
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextField
              label="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              margin="normal"
              variant="outlined"
              className={styles.formTextField}
            />
            <TextField
              label="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              margin="normal"
              variant="outlined"
              className={styles.formTextField}
            />
            <a href="/forgot-password" id={styles.forgotpassword}>Forgot password?</a>
            <Button type="submit" variant="contained" style={{ backgroundColor: '#BFBFBF', color: 'black' }}>
              Log in
            </Button>
          </form>
        </div>
      </main>
    </>
  )
}