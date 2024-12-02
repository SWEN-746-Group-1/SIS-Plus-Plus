import { beforeEach, vi } from "vitest";
import { mockReset } from "vitest-mock-extended";

beforeEach(() => {
  mockReset(auth);
});

const auth = vi.fn();
export { auth };