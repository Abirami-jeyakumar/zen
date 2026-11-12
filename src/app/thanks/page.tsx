import Link from "next/link";
export default function ThankYouPage() {
  return <main className="thanks"><p className="eyebrow">ZEN STEPS / ENQUIRY RECEIVED</p><h1>Thank you.<br/><em>We’ll be in touch.</em></h1><p>A member of the team will follow up using the details you shared.</p><Link className="text-link" href="/">Return to Zen Steps <span>↗</span></Link><style>{`.thanks{min-height:100vh;padding:18vh 12vw;background:#f5f2eb}.thanks .eyebrow{color:var(--accent)}.thanks h1{font:clamp(58px,8vw,100px)/.9 var(--display);font-weight:400;letter-spacing:-2px;margin:0}.thanks h1 em{font-weight:400;color:var(--accent)}.thanks>p:not(.eyebrow){font-size:13px;color:var(--muted);margin:25px 0 32px}`}</style></main>;
}
