import React from "react";
import useSWR from "swr";

import { Policy } from "../lib/policies";

import Table from "../Table/index";

const fetcher = (input: RequestInfo, init?: RequestInit | undefined) =>
  fetch(input, init).then((res) => res.json());

const DashboardTable = ({ fetchURL }: { fetchURL: string }) => {
  const { data: policies, error } = useSWR<Policy[]>(fetchURL, fetcher);

  if (error) return <p>An error has occurred while loading the policies.</p>;
  if (!policies) return <p>Loading policies...</p>;

  return <Table policies={policies} />;
};

export default DashboardTable;
