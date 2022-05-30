import React, { useCallback, useState } from "react";

import Header from "../Header";
import Filter from "./Filter";
import Search from "./Search";
import DashboardTable from "./Table";

const BACKEND_URL = "http://localhost:4000";
const assemblePoliciesURL = (params: Record<string, string>) => {
  const usp = new URLSearchParams(params);

  // Create a stable key for SWR
  usp.sort();
  const qs = usp.toString();

  console.log(params, "->", usp, "=>", qs);

  return `${BACKEND_URL}/policies?${qs}`;
};

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const reset = useCallback(() => {
    setStatus("");
  }, [setStatus]);

  const url = assemblePoliciesURL({ search, status });

  return (
    <div className="w-full p-8">
      <Header />

      <div className="flex items-end justify-between">
        <Search setSearch={setSearch} />
        <Filter reset={reset} status={status} setStatus={setStatus} />
      </div>

      <p className="text-sm text-gray-500">{url}</p>

      <DashboardTable fetchURL={url} />
    </div>
  );
};

export default Dashboard;
