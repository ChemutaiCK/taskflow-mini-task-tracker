import { IconCheckCircle, IconAlertCircle } from "./Icons";

export default function Toast({ message, variant = "success" }) {
  const isSuccess = variant === "success";
  const Icon = isSuccess ? IconCheckCircle : IconAlertCircle;
  const styles = isSuccess ? "bg-success text-white" : "bg-danger text-white";

  return (
    <div
      role="status"
      className={`fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium shadow-card ${styles}`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {message}
    </div>
  );
}
