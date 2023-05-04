import { fireEvent, render, screen } from "@testing-library/react";

import PersonageCard from "./PersonageCard";

describe("Given i want to render the personage table", function () {
  it("should render the empty state correctly", function () {
    render(
      <PersonageCard
        data={[]}
        rowsPerPage={10}
        page={1}
        searchMode={false}
        onFavorite={jest.fn()}
        onClick={jest.fn()}
        onPageChange={jest.fn()}
        onRowsPerPageChange={jest.fn()}
      />
    );

    expect(screen.getByText("No data found")).toBeInTheDocument();
  });

  it("should render the table when data is provided", function () {
    render(
      <PersonageCard
        data={[
          {
            id: "1",
            name: "Rick Sanchez",
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            favorite: false,
          },
        ]}
        rowsPerPage={10}
        page={0}
        searchMode={false}
        onFavorite={jest.fn()}
        onClick={jest.fn()}
        onPageChange={jest.fn()}
        onRowsPerPageChange={jest.fn()}
      />
    );

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("star_outline")).toBeInTheDocument();
  });

  it("should call the onFavorite on icon click", function () {
    const onFavorite = jest.fn();

    render(
      <PersonageCard
        data={[
          {
            id: "1",
            name: "Rick Sanchez",
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            favorite: false,
          },
        ]}
        rowsPerPage={10}
        page={0}
        searchMode={false}
        onFavorite={onFavorite}
        onClick={jest.fn()}
        onPageChange={jest.fn()}
        onRowsPerPageChange={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText("star_outline"));

    expect(onFavorite).toHaveBeenCalledTimes(1);
  });

  it("should render the table footer only if enough data is provided", function () {
    render(
      <PersonageCard
        data={[
          {
            name: "test1",
            id: "1",
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            favorite: true,
          },
          {
            name: "test2",
            id: "2",
            image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
            favorite: true,
          },
          {
            name: "test3",
            id: "3",
            image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
            favorite: true,
          },
        ]}
        rowsPerPage={10}
        page={0}
        searchMode={false}
        onFavorite={jest.fn()}
        onClick={jest.fn()}
        onPageChange={jest.fn()}
        onRowsPerPageChange={jest.fn()}
      />
    );

    expect(screen.getByText("Rows per page:")).toBeInTheDocument();
  });
});
