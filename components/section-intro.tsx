import type { ReactNode } from "react";

export function SectionIntro({
  eyebrow,
  title,
  copy,
  inverse = false,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  copy?: ReactNode;
  inverse?: boolean;
}) {
  return (
    <div className={`marketing-heading${inverse ? " is-inverse" : ""}`}>
      {eyebrow !== undefined ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2>{title}</h2>
      {copy !== undefined ? <p>{copy}</p> : null}
    </div>
  );
}
