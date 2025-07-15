// src/pages/SignIn.tsx
import { useState } from "react";
import { supabase } from "@/lib/supabaseclient";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) setError(error.message);
    else alert("Magic link sent to your email.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <input
        type="email"
        value={email}
        placeholder="you@example.com"
        onChange={(e) => setEmail(e.target.value)}
        className="input input-bordered w-full max-w-xs"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button onClick={handleSignIn} className="btn btn-primary mt-4">
        Send Magic Link
      </button>
    </div>
  );
}
