import React from "react";
import { Popover } from "@headlessui/react";
import { Filter as FilterIcon } from "react-feather";

interface FilterProps {
  reset: () => void;

  status: string;
  setStatus: (value: string) => void;
}
const Filter = ({ reset, status, setStatus }: FilterProps) => {
  return (
    <Popover className="relative">
      <Popover.Button
        aria-label="Filter Policies"
        className="bg-blue-100 p-2 rounded"
      >
        <FilterIcon aria-hidden="true" className="text-blue-800" />
      </Popover.Button>

      <Popover.Panel className="absolute z-10 right-0 w-60 bg-white shadow-2xl rounded-md border border-gray-200 py-4 px-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="space-y-4"
        >
          <label>
            <span className="block"> Status</span>

            <select
              value={status}
              onChange={(e) => {
                const val = e.target.value;

                setStatus(val);
              }}
            >
              <option value={""}>All</option>
              <option value={"ACTIVE"}>Active</option>
              <option value={"PENDING"}>Pending</option>
            </select>
          </label>

          <button
            className="block text-red-800 border border-transparent px-3 py-1 rounded-md hover:border-red-800 transition-colors"
            onClick={() => reset()}
          >
            Reset
          </button>
        </form>
      </Popover.Panel>
    </Popover>
  );
};

export default Filter;
