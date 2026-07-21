export function isTrialActive(
  trialEndsAt: string | null,
): boolean {

  if (!trialEndsAt) {
    return false;
  }

  const date = new Date(trialEndsAt);

  return (
    !Number.isNaN(date.getTime()) &&
    date.getTime() > Date.now()
  );
}


export function formatTrialDate(
  trialEndsAt: string | null,
  locale = "en",
): string | null {

  if (!trialEndsAt) {
    return null;
  }

  const date = new Date(trialEndsAt);

  if (Number.isNaN(date.getTime())) {
    return null;
  }


  return date.toLocaleDateString(
    locale === "uk"
      ? "uk-UA"
      : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );
}
