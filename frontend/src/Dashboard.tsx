import React, { useState } from "react";
import useSWR from "swr";

import { Policy } from "./lib/policies";

import Header from "./Header";
import Table from "./Table/index";

const fetcher = (input: RequestInfo, init?: RequestInit | undefined) =>
  fetch(input, init).then((res) => res.json());

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-full p-8">
      <Header />

      <form onBlur={() => {}}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            const val = e.target.value;

            setSearchTerm(val);
          }}
          className="border border-gray-300 rounded py-2 px-4"
        />
      </form>

      <button>Filter</button>

      <div id="filter_dropdown">
        <button>Reset Filter</button>
      </div>

      <DashboardTable searchTerm={searchTerm} />
    </div>
  );
};

const DashboardTable = ({ searchTerm }: { searchTerm: string }) => {
  const { data: policies, error } = useSWR<Policy[]>(
    `http://localhost:4000/policies?search=${searchTerm}`,
    fetcher
  );

  if (error) return <p>An error has occurred while loading the policies.</p>;
  if (!policies) return <p>Loading policies...</p>;

  return <Table policies={policies} />;
};

export default Dashboard;
