import React from "react";
import { Customer } from "./lib/policies";

interface ProfileImagesProps {
  customers: Customer[];
}
const ProfileImages = ({ customers }: ProfileImagesProps) => {
  return (
    <ul className="flex">
      {customers.map((customer) => (
        <li
          key={customer.id}
          className="w-8 h-8 z-10 rounded-full overflow-hidden border-2 border-white -mr-4"
          title={`${customer.firstName} ${customer.lastName}`}
        >
          <img
            src=""
            alt=""
            className="w-full h-full"
            style={{
              // Just done for the example.
              // BE AWARE of style injection!!!
              backgroundColor: customer.profileColor,
              scale: "1.1",
            }}
          />
        </li>
      ))}
    </ul>
  );
};

export default ProfileImages;
