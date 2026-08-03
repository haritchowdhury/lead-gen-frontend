import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

type Tone = "neutral" | "signal" | "positive" | "warning" | "danger";
type ButtonVariant = "primary" | "secondary" | "inverse";

export function Button({ className, type = "button", variant = "primary", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button className={classes("ds-button", `ds-button--${variant}`, className)} type={type} {...props} />;
}

export function IconButton({ className, type = "button", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={classes("ds-icon-button", "ds-button--secondary", className)} type={type} {...props} />;
}

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <section className={classes("ds-card", className)} {...props} />;
}

export function InsetGroup({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={classes("ds-inset", className)} {...props} />;
}

export function Badge({ className, tone = "neutral", ...props }: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return <span className={classes("ds-badge", tone !== "neutral" && `ds-badge--${tone}`, className)} {...props} />;
}

export function Notice({ className, tone = "neutral", ...props }: HTMLAttributes<HTMLDivElement> & { tone?: Exclude<Tone, "signal"> }) {
  return <div className={classes("ds-notice", tone !== "neutral" && `ds-notice--${tone}`, className)} role={tone === "danger" ? "alert" : "status"} {...props} />;
}

export function Field({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={classes("ds-field", className)} {...props} />;
}

export function Metric({ label, value, detail, className }: { label: ReactNode; value: ReactNode; detail?: ReactNode; className?: string }) {
  return <div className={classes("ds-metric", className)}><span className="ds-metric__label">{label}</span><strong className="ds-metric__value">{value}</strong>{detail !== undefined && detail !== null ? <span className="ds-metric__detail">{detail}</span> : null}</div>;
}

export function SectionHeader({ eyebrow, title, description, action, className }: { eyebrow?: ReactNode; title: ReactNode; description?: ReactNode; action?: ReactNode; className?: string }) {
  return <header className={classes("ds-section-header", className)}><div className="ds-section-header__copy">{eyebrow ? <p className="ds-eyebrow">{eyebrow}</p> : null}<h2>{title}</h2>{description ? <p>{description}</p> : null}</div>{action}</header>;
}

export function Disclosure({ className, summary, children, ...props }: DetailedHTMLProps<HTMLAttributes<HTMLDetailsElement>, HTMLDetailsElement> & { summary: ReactNode }) {
  return <details className={classes("ds-disclosure", className)} {...props}><summary>{summary}</summary><div className="ds-disclosure__body">{children}</div></details>;
}

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div aria-hidden="true" className={classes("ds-skeleton", className)} {...props} />;
}

export function EmptyState({ title, description, action, className }: { title: ReactNode; description: ReactNode; action?: ReactNode; className?: string }) {
  return <div className={classes("ds-empty", className)}><h3>{title}</h3><p>{description}</p>{action}</div>;
}
