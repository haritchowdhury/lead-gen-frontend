type FixtureEnvironment = Partial<
  Pick<NodeJS.ProcessEnv, "NODE_ENV" | "STORESIGNAL_DESIGN_FIXTURES">
>;

export function designFixtureEnabled(environment: FixtureEnvironment = process.env): boolean {
  return (
    (environment.NODE_ENV === "development" || environment.NODE_ENV === "test") &&
    environment.STORESIGNAL_DESIGN_FIXTURES === "1"
  );
}
