export function getStoredAuth(): { accessToken?: string; refreshToken?: string; user?: unknown } {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = localStorage.getItem("cg-auth");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function setStoredAuth(value: { accessToken?: string; refreshToken?: string; user?: unknown }) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem("cg-auth", JSON.stringify(value));
}

export function clearStoredAuth() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem("cg-auth");
}
