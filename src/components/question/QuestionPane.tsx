"use client";

import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import React, { useEffect } from "react";
import QuestionCard from "./QuestionCard";
import EditOutlined from "@ant-design/icons/EditOutlined";
import ContextModal from "./modal/ContextModal";
import { ReqModalMode, useGenerativeStore } from "@/store/generativeStore";
import { useShallow } from "zustand/shallow";
import AddRequirementModal from "./modal/AddRequirementModal";

const items: MenuProps["items"] = [
  {
    label: "Bulk Add Requirement",
    key: "bulkaddrequirement",
    icon: <EditOutlined />,
  },
];

const QuestionPane = () => {
  const [
    setContextModalOpen,
    setRequirementModalOpen,
    setRequirementModalMode,
    requirementList,
    saveListToLocalStorage,
  ] = useGenerativeStore(
    useShallow((state) => [
      state.setContextModalOpen,
      state.setRequirementModalOpen,
      state.setRequirementModalMode,
      state.requirementList,
      state.saveListToLocalStorage,
    ]),
  );

  useEffect(() => {
    if (requirementList) {
      saveListToLocalStorage(requirementList);
    }
  }, [requirementList]);

  const handleMenuClick = (mode: ReqModalMode) => {
    setRequirementModalMode(mode);
    setRequirementModalOpen(true);
  };

  const openContextModal = () => {
    setContextModalOpen(true);
  };

  return (
    <div className="flex h-full flex-1 flex-col gap-2 overflow-y-auto rounded-xl bg-white p-2">
      <div className="flex flex-col gap-4">
        <div className="flex justify-end gap-2">
          <Button onClick={openContextModal}>Generative context</Button>

          <Dropdown.Button
            onClick={() => {
              handleMenuClick("single");
            }}
            menu={{
              items,
              onClick: () => {
                handleMenuClick("bulk");
              },
            }}
          >
            Add requirement
          </Dropdown.Button>
        </div>

        {requirementList?.map((question, index) => {
          return (
            <QuestionCard
              index={index}
              description={question.description}
              section={question.section}
              key={question.section}
            />
          );
        })}
      </div>
      <ContextModal />
      <AddRequirementModal />
    </div>
  );
};

export default QuestionPane;
