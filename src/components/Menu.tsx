"use client";

import { useGlobalStore } from "@/store/globalStore";
import EyeOutlined from "@ant-design/icons/EyeOutlined";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import type { MenuProps } from "antd";
import { Button, Dropdown, Input } from "antd";
import React, { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import AddDocumentModal from "./AddDocumentModal";

const items: MenuProps["items"] = [
  {
    label: "Add Document",
    key: "addreference",
    icon: <PlusOutlined />,
  },
  {
    label: "View Document",
    key: "viewdocument",
    icon: <EyeOutlined />,
  },
];

const SideMenu = () => {
  const { setModalOpen } = useGlobalStore(
    useShallow((state) => ({
      documentID: state.documentID,
      modalOpen: state.mainDrawerOpen,
      setModalOpen: state.setMainDrawerOpen,
      setDocumentID: state.setDocumentID,
    })),
  );

  useEffect(() => {
    if (document) {
      document.documentElement.setAttribute("data-color-mode", "light");
    }
  }, []);

  const setReferences = () => {
    console.log("setReferences");
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "addreference") {
      setModalOpen(true);
    }
  };

  return (
    <div className="flex h-full w-[200px] flex-col gap-2">
      <Input.Search placeholder="Search" />
      <Dropdown.Button
        menu={{
          items,
          onClick: handleMenuClick,
        }}
        style={{
          width: "100%",
        }}
        buttonsRender={([_, rightButton]) => [
          <Button key={"rightbtn"} onClick={setReferences} block>
            Library
          </Button>,
          React.cloneElement(
            rightButton as React.ReactElement<any, string>,
            {},
          ),
          ,
        ]}
      ></Dropdown.Button>

      <AddDocumentModal />

      {/* {Array.from({ length: 10 }).map((_, i) => {
        return <div key={i}>{i}</div>;
      })} */}
    </div>
  );
};

export default SideMenu;
