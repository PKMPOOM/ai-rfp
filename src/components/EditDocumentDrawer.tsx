import { useGlobalStore } from "@/store/globalStore";
import { Button, Drawer, Form, Input } from "antd";
import { useShallow } from "zustand/shallow";
import { saveSection } from "./api";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const EditDocumentDrawer = () => {
  const [form] = Form.useForm();
  const queryclient = useQueryClient();
  const [Loading, setLoading] = useState(false);
  const { editDrawerOpen, setEditDrawerOpen, proposalId } = useGlobalStore(
    useShallow((state) => ({
      editDrawerOpen: state.editDrawerOpen,
      setEditDrawerOpen: state.setEditDrawerOpen,
      proposalId: state.documentID,
    })),
  );

  const onFinish = async (event: any) => {
    try {
      console.log({
        body: event.doc_content,
        title: event.doc_name,
        proposalId,
      });

      setLoading(true);
      await saveSection(
        {
          body: event.doc_content,
          title: event.doc_name,
        },
        proposalId,
      );

      setLoading(false);
      closeDrawer();
      form.resetFields();
      queryclient.invalidateQueries({ queryKey: [`proposal-${proposalId}`] });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
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
              <Button type="primary" htmlType="submit" loading={Loading}>
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
