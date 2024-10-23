"use client";

import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import React, { useEffect, useRef } from "react";
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
    setRequirementList,
    setAIContext,
  ] = useGenerativeStore(
    useShallow((state) => [
      state.setContextModalOpen,
      state.setRequirementModalOpen,
      state.setRequirementModalMode,
      state.requirementList,
      state.setRequirementList,
      state.setAIContext,
    ]),
  );
  const childRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const getinitialState = () => {
    if (typeof window !== "undefined") {
      const localStore = localStorage.getItem("requirementList");
      if (localStore) {
        return JSON.parse(localStore);
      } else {
        return [];
      }
    }
  };

  const getinitialContextState = () => {
    if (typeof window !== "undefined") {
      const localStore = localStorage.getItem("aiContext");
      if (localStore) {
        return localStore;
      } else {
        return "";
      }
    } else {
      return "";
    }
  };

  useEffect(() => {
    setRequirementList(getinitialState());
    setAIContext(getinitialContextState());
  }, []);

  const handleMenuClick = (mode: ReqModalMode) => {
    setRequirementModalMode(mode);
    setRequirementModalOpen(true);
  };

  const openContextModal = () => {
    setContextModalOpen(true);
  };

  useEffect(() => {
    if (childRef.current && parentRef.current) {
      // Scroll the parent to bring the child into view
      childRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [childRef]); // You can add dependencies as needed

  return (
    <div
      ref={parentRef}
      className="flex h-full flex-1 flex-col gap-2 overflow-y-auto rounded-xl bg-white p-2"
    >
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

        {requirementList &&
          requirementList.map((question, index) => {
            return (
              <QuestionCard
                ref={childRef}
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
