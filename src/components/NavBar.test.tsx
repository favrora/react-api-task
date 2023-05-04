import { render, screen } from "@testing-library/react";
import { Router } from "wouter";

import NavBar from "./NavBar";

describe("Given i want to render the application bar", function () {
  it("should render the app name", function () {
    render(
      <Router>
        <NavBar />
      </Router>
    );

    expect(screen.getByText("Faraway - test task")).toBeInTheDocument();
  });

  it("the app name should link to the application root", function () {
    render(
      <Router>
        <NavBar />
      </Router>
    );

    expect(screen.getByTestId("appbar-linkto-root")).toBeInTheDocument();
  });
});
