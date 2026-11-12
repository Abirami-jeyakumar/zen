"use client";
import { useState, type FormEvent } from "react";

export function MediaUploader() {
  const [message, setMessage] = useState(""); const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/media", { method: "POST", body: form });
    const data = await response.json(); setBusy(false);
    if (!response.ok) { setMessage(data.error || "Upload failed."); return; }
    setMessage("Uploaded. Refresh the page to see it in the library."); event.currentTarget.reset();
  }
  return <form className="upload-form" onSubmit={submit}><label>Choose a file<input name="file" type="file" accept="image/jpeg,image/png,image/webp,image/avif,video/mp4,video/webm" required/></label><label>Title<input name="title" placeholder="Optional name" maxLength={120}/></label><label>Section<select name="section"><option value="general">General</option><option value="about">About</option><option value="services">Services</option><option value="locations">Centres</option></select></label><button disabled={busy}>{busy ? "Uploading…" : "Upload to library ↗"}</button>{message && <p aria-live="polite">{message}</p>}<style>{`.upload-form{border:1px solid var(--line);padding:20px;display:grid;grid-template-columns:1.5fr 1fr 1fr auto;gap:16px;align-items:end;margin-top:30px}.upload-form label{font-size:9px;text-transform:uppercase;letter-spacing:.7px}.upload-form input,.upload-form select{display:block;width:100%;border:0;border-bottom:1px solid var(--line);background:transparent;padding:11px 0;font-size:11px}.upload-form input[type=file]{font-size:10px}.upload-form button{border:0;background:var(--ink);color:white;padding:14px;font-size:10px;cursor:pointer}.upload-form p{grid-column:1/-1;font-size:11px;color:var(--accent);margin:0}@media(max-width:700px){.upload-form{grid-template-columns:1fr 1fr}.upload-form label:first-child{grid-column:1/-1}}`}</style></form>;
}
