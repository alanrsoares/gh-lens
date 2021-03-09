import { Maybe } from "graphql/generated";

export type Some<T extends Maybe<any>> = Exclude<T, null | undefined>;

/**
 * Type-guard function to unfold Maybe<T> into Some<T>
 *
 * @param value
 */
export function isSome<T>(value: Maybe<T>): value is Some<T> {
  return value !== null && value !== undefined;
}
