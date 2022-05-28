import React from "react";
import { Policy } from "../lib/policies";

import Badge from "../Badge";
import ProfileImages from "../ProfileImages";

interface IProps extends Policy {
  index: number;
}

const TableRow = ({
  index,
  customer,
  members,
  provider,
  insuranceType,
  status,
}: IProps) => {
  return (
    <tr className="border-b">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {index}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {customer.firstName} {customer.lastName}
      </td>
      <td className="px-6">
        <ProfileImages customers={members.map((m) => m.customer)} />
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {provider}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {insuranceType}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <Badge status={status} />
      </td>
    </tr>
  );
};
export default TableRow;
