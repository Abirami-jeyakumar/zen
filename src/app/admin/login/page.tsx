"use client";

import { signIn } from "next-auth/react";
import { useState, type FormEvent } from "react";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const form = new FormData(event.currentTarget);
    const result = await signIn("credentials", { email: form.get("email"), password: form.get("password"), callbackUrl: "/admin", redirect: false });
    setBusy(false);
    if (result?.error) { setError("Those details did not match an admin account."); return; }
    window.location.assign(result?.url || "/admin");
  }
  return <main className="login-page"><a className="wordmark" href="/">zen<span>steps</span><i>®</i></a><section><p className="eyebrow">ZEN STEPS / CONTENT DESK</p><h1>Welcome<br/>back.</h1><p>Sign in to manage the Zen Steps website.</p><form onSubmit={submit}><label>Email<input name="email" type="email" autoComplete="username" required/></label><label>Password<input name="password" type="password" autoComplete="current-password" required/></label>{error && <p role="alert">{error}</p>}<button disabled={busy}>{busy ? "Signing in…" : "Sign in ↗"}</button></form></section><style>{`.login-page{min-height:100vh;padding:32px 7vw;background:#e9e5db}.login-page>section{max-width:390px;margin:10vh auto}.login-page h1{font:72px/.88 var(--display);font-weight:400;margin:0}.login-page section>p:not(.eyebrow){color:var(--muted);font-size:13px;margin:20px 0 35px}.login-page form{display:flex;flex-direction:column;gap:20px}.login-page label{font-size:10px;text-transform:uppercase;letter-spacing:1px}.login-page input{display:block;width:100%;background:none;border:0;border-bottom:1px solid #aaa69d;padding:12px 0;outline:none}.login-page button{border:0;background:var(--ink);color:white;text-align:left;padding:16px;font-size:11px;text-transform:uppercase;letter-spacing:1px;cursor:pointer}.login-page [role=alert]{color:#a44832;font-size:12px}`}</style></main>;
}
