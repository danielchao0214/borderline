import { useEffect } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import jwtDecode from "jwt-decode";

export const withAuth = (Page) => {
  const Auth = (props) => {
    const router = useRouter();

    useEffect(() => {
      const { token } = parseCookies();
      if (!token) {
        // Redirect to login page if token is not present
        router.push("/login");
        return;
      }

      try {
        // Verify token
        const decodedToken = jwtDecode(token);
        const { exp } = decodedToken;
        if (exp < new Date().getTime() / 1000) {
          // Token expired, redirect to login page
          throw new Error("Token expired");
        }
      } catch (err) {
        console.error(err);
        router.push("/login");
        return;
      }
    }, []);

    return <Page {...props} />;
  };

  return Auth;
};
