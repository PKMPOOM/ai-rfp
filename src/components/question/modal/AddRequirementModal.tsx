"use client";

import { useGenerativeStore, requirement } from "@/store/generativeStore";
import { Button, Form, Input, Modal, Typography } from "antd";
import React from "react";
import { useShallow } from "zustand/shallow";

type Props = {};

type Mode = "single" | "bulk";

const dummyData: requirement[] = [
  {
    description: "dummy description 1",
    section: "dummy section 1",
  },
  {
    description: "dummy description 2",
    section: "dummy section 2",
  },
];
type SingleFormSchema = {
  question: string;
  description: string;
};
const AddRequirementModal = () => {
  const [singleForm] = Form.useForm<SingleFormSchema>();
  const [
    requirementModalOpen,
    requirementModalMode,
    setRequirementModalOpen,
    requirementList,
    setRequirementList,
  ] = useGenerativeStore(
    useShallow((state) => [
      state.requirementModalOpen,
      state.requirementModalMode,
      state.setRequirementModalOpen,
      state.requirementList,
      state.setRequirementList,
    ]),
  );

  const onClose = () => {
    setRequirementModalOpen(false);
  };

  const handleSave = (e: SingleFormSchema) => {
    const newSection = {
      description: e.description,
      section: e.question,
    };
    setRequirementList([...(requirementList ?? []), newSection]);
    onClose();
    singleForm.resetFields();
  };

  return (
    <Modal
      title={
        requirementModalMode === "single"
          ? "Add a single requirement"
          : "Add multiple requirements"
      }
      onCancel={onClose}
      open={requirementModalOpen}
      width={"70vw"}
      footer={null}
    >
      {requirementModalMode === "single" && (
        <Form
          form={singleForm}
          onFinish={handleSave}
          layout="vertical"
          requiredMark={"optional"}
        >
          <Form.Item<SingleFormSchema>
            rules={[
              { required: true, message: "Question label cannot be blank" },
            ]}
            label="Question"
            name={"question"}
          >
            <Input />
          </Form.Item>
          <Form.Item<SingleFormSchema>
            rules={[{ required: true, message: "Description cannot be blank" }]}
            label="Description"
            name={"description"}
          >
            <Input.TextArea
              autoSize={{
                maxRows: 40,
                minRows: 20,
              }}
            />
          </Form.Item>
          <div className="flex justify-end gap-2">
            <Button>Cancel </Button>
            <Button type="primary" htmlType="submit">
              <span className="px-5">Save</span>
            </Button>
          </div>
        </Form>
      )}

      {/* {dummyData.map((data) => {
        return (
          <div key={data.section}>
            {data.section}
            {data.description}
          </div>
        );
      })} */}
      {/* <div className="flex gap-2">
        <Input.TextArea
          autoSize={{
            maxRows: 40,
            minRows: 20,
          }}
        />
        <Input.TextArea
          autoSize={{
            maxRows: 40,
            minRows: 20,
          }}
        />
      </div> */}
    </Modal>
  );
};

export default AddRequirementModal;
