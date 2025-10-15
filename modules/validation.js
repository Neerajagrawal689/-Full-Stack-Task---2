export function validateTaskInput(value) {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    alert("Task cannot be empty.");
    return false;
  }
  if (trimmed.length > 100) {
    alert("Task too long (max 100 characters).");
    return false;
  }
  return true;
}

// Prevent XSS
export function escapeHTML(str) {
  return str.replace(/[&<>"']/g, tag => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[tag]
  ));
}
