import React from "react";

interface SearchProps {
  setSearch: (value: string) => void;
}
const Search = ({ setSearch }: SearchProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        // @ts-ignore
        const elements = e.target.elements;
        const { search } = elements as { search: HTMLInputElement };

        // We also want to handle the case where the user presses enter
        // but does not blur the input.
        setSearch(search.value);
      }}
    >
      <label>
        <span className="block">Search</span>
        <input
          name="search"
          type="text"
          placeholder="Search for providers or names"
          onBlur={(e) => {
            const val = e.target.value;

            setSearch(val);
          }}
          className="border border-gray-300 rounded-md py-2 px-4"
        />
      </label>
    </form>
  );
};
export default Search;
