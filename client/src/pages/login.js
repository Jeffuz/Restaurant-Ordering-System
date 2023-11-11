import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    console.log("handleLogin");
    e.preventDefault();

    // Perform authentication or API call here
    console.log("email:", email, "password:", password);

    try {
      // Sign in with email and password
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);

      // Successfully logged in
      console.log("User logged in:", email);

      // Reset the form after successful login
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login error:", error.message);
    }

    // Reset the form after submission
    setEmail("");
    setPassword("");
  };

  const handleSignup = async (e) => {
    console.log("handleSignup");
    e.preventDefault();

    // Perform authentication or API call here
    console.log("email:", email, "password:", password);

    try {
      // Create a new user with email and password
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);

      // Successfully signed up
      console.log("User signed up:", email);

      // Reset the form after successful signup
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Signup error:", error.message);
    }

    // Reset the form after submission
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <h2>Login</h2>
      <br />
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      <form onSubmit={handleSignup}>
        <div>
          <button type="submit">Signup</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
