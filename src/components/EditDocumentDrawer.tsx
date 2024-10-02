import { useGlobalStore } from "@/store/globalStore";
import { Button, Drawer, Form, Input, Select, Tag, Typography } from "antd";
import React from "react";
import { useShallow } from "zustand/shallow";
import { saveSection } from "./api";
import { DocumentSection, SaveDocumentPayload } from "@/type/document";

type Props = {};

const EditDocumentDrawer = (props: Props) => {
  const [form] = Form.useForm();
  const { editDrawerOpen, setEditDrawerOpen } = useGlobalStore(
    useShallow((state) => ({
      editDrawerOpen: state.editDrawerOpen,
      setEditDrawerOpen: state.setEditDrawerOpen,
    })),
  );

  const onFinish = async (event: any) => {
    const res = await saveSection({
      body: event.doc_content,
      title: event.doc_name,
    });

    console.log(res);
  };

  const closeDrawer = () => {
    setEditDrawerOpen(false);
  };

  return (
    <Drawer
      placement="left"
      width="80vw"
      onClose={closeDrawer}
      open={editDrawerOpen}
      title={"Add Document"}
    >
      <Form
        form={form}
        layout="vertical"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        onFinish={onFinish}
        requiredMark="optional"
      >
        <div className="mb-6 flex flex-row items-end gap-2">
          <Form.Item
            label="Document Title"
            name={"doc_name"}
            style={{
              marginBottom: 0,
              width: "100%",
            }}
            rules={[
              {
                required: true,
                message: "Document Name is required",
              },
            ]}
          >
            <Input placeholder="Document Content" />
          </Form.Item>
          <div className="flex gap-2">
            <div className="flex flex-row justify-end gap-2">
              <Button onClick={closeDrawer}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                <span className="px-14">Add</span>
              </Button>
            </div>
          </div>
        </div>
        <Form.Item
          name={"doc_content"}
          label="Document content"
          style={{
            marginBottom: 0,
            width: "100%",
            flex: 1,
          }}
          rules={[
            {
              required: true,
              message: "Document content is required",
            },
          ]}
        >
          <Input.TextArea autoSize={{ minRows: 35, maxRows: 50 }} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditDocumentDrawer;
