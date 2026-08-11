export default function Toast({ message, variant = "success" }) {
  const styles =
    variant === "success"
      ? "bg-emerald-600 text-white"
      : "bg-red-600 text-white";

  return (
    <div
      role="status"
      className={`fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-md px-4 py-2.5 text-sm font-medium shadow-lg ${styles}`}
    >
      {message}
    </div>
  );
}
