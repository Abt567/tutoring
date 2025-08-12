export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-indigo-400 ${className}`}
      {...props}
    />
  );
}
