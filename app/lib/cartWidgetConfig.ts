let storefrontToken = "";

export function setStorefrontToken(token: string): void {
  storefrontToken = token;
}

export function getStorefrontToken(): string {
  return storefrontToken;
}
