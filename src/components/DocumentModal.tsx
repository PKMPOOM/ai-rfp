"use client";

import { useGlobalStore } from "@/store/globalStore";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import EditOutlined from "@ant-design/icons/EditOutlined";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import { Button, Drawer, Form, Input, Typography } from "antd";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import EditDocumentDrawer from "./EditDocumentDrawer";
import { getProposal, updateProposalName } from "./api";
import { useQueryClient } from "@tanstack/react-query";
import { useMessage } from "@/context/Provider";

type FormSchema = {
  doc_name: string;
};

const AddDocumentModal = ({}: { listRefetch: () => void }) => {
  const [ProposalName, setProposalName] = useState("");
  const [Loading, setLoading] = useState(false);
  const queryclient = useQueryClient();
  const { messageAPI } = useMessage();

  const {
    setModalOpen,
    documentId,
    modalOpen,
    setEditDrawerOpen,
    setDocumentID,
  } = useGlobalStore(
    useShallow((state) => ({
      setModalOpen: state.setMainDrawerOpen,
      documentId: state.documentID,
      modalOpen: state.mainDrawerOpen,
      setEditDrawerOpen: state.setEditDrawerOpen,
      setDocumentID: state.setDocumentID,
    })),
  );

  const { data } = getProposal(documentId);

  useEffect(() => {
    if (documentId === undefined) {
      setProposalName("New Document");
    } else if (data) {
      setProposalName(data.name);
    }

    return () => {
      setProposalName("");
    };
  }, [documentId, data]);

  const closeDrawer = () => {
    setModalOpen(false);
    setDocumentID(undefined);
    queryclient.invalidateQueries({ queryKey: ["proposalList"] });
  };

  const handleUpdateName = async () => {
    if (documentId) {
      setLoading(true);
      await updateProposalName(documentId, ProposalName);
      setLoading(false);
      messageAPI.success("Proposal name updated successfully");
    } else {
      setLoading(false);
      console.log("No document ID");
    }
  };

  return (
    <Drawer
      placement="left"
      width="70vw"
      onClose={closeDrawer}
      open={documentId !== undefined}
      title={
        documentId === "Create_new" ? "Create New Proposal" : `Edit Proposal `
      }
    >
      {!data ? (
        <div>
          <LoadingOutlined />
        </div>
      ) : (
        <>
          <div className="mb-6 flex flex-row items-end gap-2">
            <Form.Item<FormSchema>
              style={{
                marginBottom: 0,
                width: "100%",
              }}
            >
              <Input
                value={ProposalName}
                placeholder="Document Name"
                onChange={(e) => setProposalName(e.target.value)}
              />
            </Form.Item>
            <div className="flex gap-2">
              <div className="flex flex-row justify-end gap-2">
                <Button onClick={closeDrawer}>Cancel</Button>
                <Button
                  type="primary"
                  onClick={handleUpdateName}
                  loading={Loading}
                >
                  <span className="px-14">Save</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              type="primary"
              style={{
                marginBottom: "16px",
              }}
              onClick={() => {
                setEditDrawerOpen(true);
              }}
            >
              Add Document
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            {data?.documents.map((doc) => {
              return (
                <div
                  key={doc.id}
                  className="flex flex-col justify-start gap-2 rounded-md border p-3"
                >
                  <div className="flex justify-between">
                    <Typography.Title level={4}>{doc.title}</Typography.Title>
                    <div className="flex gap-2">
                      <Button icon={<EditOutlined />} type="text" />
                      <Button danger icon={<DeleteOutlined />} type="text" />
                    </div>
                  </div>

                  <Typography.Paragraph
                    type="secondary"
                    ellipsis={{
                      defaultExpanded: false,
                      expandable: "collapsible",
                      rows: 3,
                    }}
                  >
                    {doc.body}
                  </Typography.Paragraph>
                </div>
              );
            })}
          </div>
        </>
      )}

      <EditDocumentDrawer />
    </Drawer>
  );
};

export default AddDocumentModal;
