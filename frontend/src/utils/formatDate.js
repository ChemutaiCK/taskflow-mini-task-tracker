export function formatDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString.endsWith("Z") ? isoString : `${isoString}Z`);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
