"use client";

import { useEffect, useRef, useState } from "react";

type BYANLogoProps = {
isDark?: boolean;
size?: "sm" | "md" | "lg";
rotate?: boolean;
};

const PHRASES = [
"Know Now",
"Need to Know",
"No Surprises",
"Notice",
"Know Your Rights",
];

const SIZES = {
sm: { fontSize: "1.1rem", badge: 22, pad: "0 6px" },
md: { fontSize: "1.4rem", badge: 28, pad: "0 8px" },
lg: { fontSize: "2.2rem", badge: 42, pad: "0 12px" },
};

export default function BYANLogo({
isDark = false,
size = "md",
rotate = true,
}: BYANLogoProps) {
const [active, setActive] = useState(false);
const [phraseIndex, setPhraseIndex] = useState(0);

const reducedMotion = useRef(
typeof window !== "undefined" && window.matchMedia
? window.matchMedia("(prefers-reduced-motion: reduce)").matches
: false
);

useEffect(() => {
if (!rotate) return;

const interval = setInterval(() => {
setPhraseIndex((i) => (i + 1) % PHRASES.length);
}, 3200);

return () => clearInterval(interval);
}, [rotate]);

const s = SIZES[size];

const textColor = isDark ? "#f1f1f1" : "#1e293b";
const badgeBg = isDark ? "#f1f1f1" : "#1e3a5f";
const badgeText = isDark ? "#1e293b" : "#ffffff";
const phrase = PHRASES[phraseIndex];

return (
<button
type="button"
onMouseEnter={() => setActive(true)}
onMouseLeave={() => setActive(false)}
onFocus={() => setActive(true)}
onBlur={() => setActive(false)}
aria-label={`BYAN — Before You Agree. ${phrase}.`}
style={{
display: "inline-flex",
flexDirection: "row",
alignItems: "center",
direction: "ltr",
unicodeBidi: "isolate",
border: "none",
background: "transparent",
cursor: "pointer",
padding: 0,
fontFamily: "Segoe UI, Arial, sans-serif",
fontWeight: 700,
fontSize: s.fontSize,
color: textColor,
outline: "none",
}}
>
{/* Keep BYAN visually LTR even when the page is Arabic */}
<span
dir="ltr"
style={{
direction: "ltr",
unicodeBidi: "isolate",
letterSpacing: "-0.02em",
}}
>
BYA
</span>

<span
dir="ltr"
style={{
display: "inline-flex",
flexDirection: "row",
alignItems: "center",
justifyContent: "center",
height: s.badge,
minWidth: s.badge,
padding: s.pad,
marginLeft: 2,
borderRadius: 6,
background: badgeBg,
color: badgeText,
overflow: "hidden",
whiteSpace: "nowrap",
direction: "ltr",
unicodeBidi: "isolate",
transition: reducedMotion.current
? "opacity 200ms ease"
: "all 320ms cubic-bezier(0.4, 0, 0.2, 1)",
}}
>
<span
style={{
display: "inline-grid",
gridTemplateColumns: active ? "0fr" : "1fr",
transition:
"grid-template-columns 300ms cubic-bezier(0.4,0,0.2,1)",
}}
>
<span
style={{
overflow: "hidden",
minWidth: 0,
direction: "ltr",
}}
>
N
</span>
</span>

<span
style={{
display: "inline-grid",
gridTemplateColumns: active ? "1fr" : "0fr",
transition:
"grid-template-columns 300ms cubic-bezier(0.4,0,0.2,1) 60ms",
}}
>
<span
style={{
overflow: "hidden",
whiteSpace: "nowrap",
fontSize: size === "lg" ? "1rem" : "0.75rem",
fontWeight: 600,
direction: "ltr",
}}
>
{phrase}
</span>
</span>
</span>
</button>
);
}
