import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

function Greeting() {
  return <h1>Welcome to Shopivo</h1>;
}

describe("Shopivo frontend", () => {
  it("displays the welcome message", () => {
    render(<Greeting />);

    expect(
      screen.getByRole("heading", { name: "Welcome to Shopivo" }),
    ).toBeInTheDocument();
  });
});
