"use client";

import { useGlobalStore } from "@/store/globalStore";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Skeleton,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import AddDocumentModal from "./DocumentModal";
import { createNewProposal, getProposalList } from "./api";

type FormSchema = {
  doc_name: string;
};

const SideMenu = () => {
  const [messageAPI, contextHolder] = message.useMessage();

  const [form] = Form.useForm<FormSchema>();
  const [CreateModalOpen, setCreateModalOpen] = useState(false);
  const [Loading, setLoading] = useState(false);
  const { setDocumentID, documentID } = useGlobalStore(
    useShallow((state) => ({
      setDocumentID: state.setDocumentID,
      documentID: state.documentID,
    })),
  );

  const { data, isLoading, refetch } = getProposalList();

  useEffect(() => {
    if (document) {
      document.documentElement.setAttribute("data-color-mode", "light");
    }

    return () => {
      form.resetFields();
    };
  }, []);

  const onFinish = async (values: FormSchema) => {
    try {
      setLoading(true);
      await createNewProposal(values.doc_name);
      setCreateModalOpen(false);
      refetch();
      form.resetFields();
      messageAPI.success("Proposal created successfully");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="flex h-full w-[250px] flex-col gap-2 rounded-xl bg-white p-2">
      {contextHolder}
      <Input.Search placeholder="Search" />

      <Button
        type="primary"
        key={"rightbtn"}
        onClick={() => {
          setCreateModalOpen(true);
        }}
        block
      >
        + Proposal
      </Button>
      <Typography.Title level={5}>Latest</Typography.Title>
      <div className="flex flex-1 flex-col gap-2">
        {isLoading && !data ? (
          <div className="flex flex-col gap-4">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        ) : (
          data &&
          data?.map((proposal) => {
            return (
              <div
                key={proposal.id}
                onClick={() => {
                  setDocumentID(`${proposal.id}`);
                }}
                className="flex cursor-pointer flex-col justify-between rounded-md border p-2 transition-all duration-150 hover:bg-white hover:shadow-lg"
              >
                <Typography.Text>{proposal.title}</Typography.Text>
                <Typography.Text type="secondary">
                  Docs: {proposal.documents}
                </Typography.Text>
              </div>
            );
          })
        )}
      </div>
      <AddDocumentModal listRefetch={refetch} />
      <Modal
        onCancel={() => {
          setCreateModalOpen(false);
        }}
        open={CreateModalOpen}
        title={"Create New Proposal"}
        footer={null}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item<FormSchema>
            name={"doc_name"}
            rules={[
              {
                required: true,
                message: "Please enter a proposal name",
              },
            ]}
          >
            <Input placeholder="Proposal name" />
          </Form.Item>
          <div className="flex justify-end gap-2">
            <Button
              type="text"
              onClick={() => {
                setCreateModalOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button loading={Loading} type="primary" htmlType="submit">
              <span>Save</span>
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default SideMenu;
