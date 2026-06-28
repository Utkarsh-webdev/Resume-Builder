import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";

const Signup = ({ setCurrentPage }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace this with your API call
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Password:", password);

      navigate("/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <span className="auth-eyebrow">START YOUR DRAFT</span>

      <h3 className="auth-title">Create your account</h3>

      <p className="auth-subtext">
        Free to start. No credit card required.
      </p>

      <form onSubmit={handleSignup} className="auth-form">
        <Input
          label="Full name"
          type="text"
          name="name"
          placeholder="Jordan Lee"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Min 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" disabled={loading} className="auth-submit">
          {loading ? "Creating account..." : "Create account →"}
        </button>

        <p className="auth-switch">
          Already have an account?{" "}
          <button
            type="button"
            className="auth-link"
            onClick={() => setCurrentPage("login")}
          >
            Log in
          </button>
        </p>
      </form>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@800;900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');

        .auth-wrap { width: 100%; }

        .auth-eyebrow {
          font-family: var(--font-mono, "JetBrains Mono", monospace);
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: var(--signal, #ff4f1f);
        }

        .auth-title {
          font-family: var(--font-display, "Archivo", sans-serif);
          font-weight: 900;
          font-size: 1.9rem;
          color: var(--ink, #16140f);
          margin: 10px 0 6px;
          letter-spacing: -0.01em;
        }

        .auth-subtext {
          color: var(--graphite, #6b6862);
          margin: 0 0 28px;
          font-size: 0.98rem;
        }

        .auth-form { display: flex; flex-direction: column; gap: 22px; }

        .auth-error {
          background: var(--signal-dim, #ffe4d8);
          border: 1px solid var(--signal, #ff4f1f);
          color: #9a2c10;
          padding: 11px 14px;
          border-radius: 10px;
          font-size: 0.88rem;
          margin: 0;
        }

        .auth-submit {
          font-family: var(--font-body, "Inter", sans-serif);
          font-weight: 700;
          font-size: 1rem;
          padding: 14px;
          border: none;
          border-radius: 10px;
          background: var(--ink, #16140f);
          color: var(--paper, #faf7f0);
          cursor: pointer;
          transition: transform 0.15s ease, background 0.15s ease;
        }
        .auth-submit:hover:not(:disabled) { background: var(--signal, #ff4f1f); }
        .auth-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .auth-submit:focus-visible { outline: 3px solid var(--violet, #6c4fff); outline-offset: 2px; }

        .auth-switch {
          text-align: center;
          font-size: 0.9rem;
          color: var(--graphite, #6b6862);
          margin: 4px 0 0;
        }

        .auth-link {
          background: none;
          border: none;
          font-weight: 700;
          color: var(--ink, #16140f);
          text-decoration: underline;
          text-decoration-color: var(--signal, #ff4f1f);
          text-underline-offset: 3px;
          cursor: pointer;
          padding: 0;
        }
      `}</style>
    </div>
  );
};

export default Signup;