export function Button({ className = "", children, variant = "default", ...props }) {
  const base = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition";
  const styles = variant === "secondary"
    ? "bg-white/10 text-white hover:bg-white/20"
    : "bg-indigo-600 text-white hover:bg-indigo-700";
  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}
