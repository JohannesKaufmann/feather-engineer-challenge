import React from "react";

import Table, { IProps } from "./Table";

const FullWidthTable = (props: IProps) => (
  <div className="flex flex-col">
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg shadow-sm">
          <Table {...props} />
        </div>
      </div>
    </div>
  </div>
);
export default FullWidthTable;
