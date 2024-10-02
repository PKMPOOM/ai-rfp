import { Button } from "antd";
import React from "react";

const Nav = () => {
  return (
    <div className=" flex flex-row gap-2 px-4 py-2 border-b">
      <div className=" flex ml-auto gap-2">
        <Button>Set reference</Button>
        <Button type="primary">Export</Button>
      </div>
    </div>
  );
};

export default Nav;
