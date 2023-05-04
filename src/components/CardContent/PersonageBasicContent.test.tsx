import { render, screen } from "@testing-library/react";

import PersonageBasicContent from "./PersonageBasicContent";

describe("Given i want to render personage basic content", function () {
  it("should render the informations passed to the component", function () {
    render(
      <PersonageBasicContent
        location={"Citadel of Ricks"}
        gender={"Male"}
        status={"Alive"}
        species={"Human"}
      />
    );

    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
    expect(
      screen.getByText("The description for Morty Smith")
    ).toBeInTheDocument();
  });

  it("should fallback to the default description if not provided", function () {
    render(<PersonageBasicContent />);

    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
    expect(
      screen.getByText("The description for this personage is not available")
    ).toBeInTheDocument();
  });
});
