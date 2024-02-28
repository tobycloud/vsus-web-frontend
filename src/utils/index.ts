export const setDocumentTitle = (title: string) => {
  document.title = `${title} - vSuS Dashboard`;
};

export function base64toFile(base64: string): File | null {
  const match = base64.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);

  if (!match) {
    console.error("Invalid base64 string format");
    return null;
  }

  const contentType = match[1];
  const byteCharacters = atob(match[2]);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  const blob = new Blob([byteArray], { type: contentType });

  const fileName = `${Math.random().toString(36).substring(2, 8)}`;

  return new File([blob], fileName, { type: contentType });
}

export const countryCodes = [
  { code: "US", number: "1" },
  { code: "CA", number: "1" },
  { code: "VN", number: "84" },
];

export function formatPhoneNumber(phoneNumber: string): string {
  if (phoneNumber.length === 3) return `${phoneNumber} `;
  if (phoneNumber.length === 7) return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(4, 7)} `;
  return phoneNumber;
}

export const borderLine = "calc(0.0625rem * var(--mantine-scale)) solid var(--app-shell-border-color)";
