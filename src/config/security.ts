/**
 * SERVER-ONLY SECURITY VAULT
 */
const PROJECT_SECRETS: Record<string, string | undefined> = {
  "ikea-design-systems": process.env.PASSWORD_IKEA,
};

/**
 * Smart lookup function: 
 * Returns the specific password if it exists, otherwise falls back to the global password.
 */
export function getPasswordForProject(slug: string): string | undefined {
  const specificPassword = PROJECT_SECRETS[slug];
  return specificPassword || process.env.PASSWORD_GLOBAL;
}