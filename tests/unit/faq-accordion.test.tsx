import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FaqAccordion } from "@/components/content/faq-accordion";

const items = [
  { id: "one", question: "What is outsourced HR?", answer: "Answer one." },
  { id: "two", question: "Can you help with recruitment?", answer: "Answer two." },
];

describe("FaqAccordion", () => {
  it("renders only the first answer open by default, reading as a genuine accordion", () => {
    render(<FaqAccordion items={items} />);

    const firstButton = screen.getByRole("button", { name: items[0].question });
    expect(firstButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(items[0].answer)).toBeVisible();

    const secondButton = screen.getByRole("button", { name: items[1].question });
    expect(secondButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText(items[1].answer)).not.toBeVisible();
  });

  it("collapses and re-expands an answer on click, toggling aria-expanded", async () => {
    const user = userEvent.setup();
    render(<FaqAccordion items={items} />);

    const button = screen.getByRole("button", { name: items[0].question });
    const answer = screen.getByText(items[0].answer);

    expect(answer).toBeVisible();

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(answer).not.toBeVisible();

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(answer).toBeVisible();
  });

  it("toggles each FAQ independently", async () => {
    const user = userEvent.setup();
    render(<FaqAccordion items={items} />);

    await user.click(screen.getByRole("button", { name: items[1].question }));

    expect(screen.getByRole("button", { name: items[0].question })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByRole("button", { name: items[1].question })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });
});
