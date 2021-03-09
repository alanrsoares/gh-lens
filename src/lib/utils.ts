export const unique = <T>(xs: T[]) => [...new Set(xs)];

export const padSingleDigit = (x: number) => String(x).padStart(2, "0");
