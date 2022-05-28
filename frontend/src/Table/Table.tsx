import React from "react";
import { Policy } from "../lib/policies";
import TableHead from "./Head";
import TableRow from "./Row";

export interface IProps {
  policies: Policy[];
}
const Table = ({ policies }: IProps) => (
  <table className="min-w-full">
    <TableHead />

    <tbody>
      {policies.map((policy, index: number) => {
        return <TableRow key={policy.id} index={index} {...policy} />;
      })}

      {/* TODO: aria-label (or something else) to make sure the notice is read? */}
      {policies.length === 0 && (
        <tr className="border-b">
          <td
            colSpan={5}
            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
          >
            No policies found. Try changing your search and filter settings. Or
            reset the filter to get all policies.
          </td>
        </tr>
      )}
    </tbody>
  </table>
);
export default Table;
