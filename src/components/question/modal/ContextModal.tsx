import { useGenerativeStore } from "@/store/generativeStore";
import { Button, Form, Input, Modal, Typography } from "antd";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

type FormSchema = {
  context: string;
};

const ContextModal = () => {
  const [form] = Form.useForm<FormSchema>();
  const [contextModalOpen, setAIContext, setContextModalOpen] =
    useGenerativeStore(
      useShallow((state) => [
        state.contextModalOpen,
        state.setAIContext,
        state.setContextModalOpen,
      ]),
    );

  // ai context are saved on local storage
  useEffect(() => {
    const localStore = localStorage.getItem("aiContext");
    if (form && localStore) {
      form.setFieldsValue({ context: localStore });
    }
  }, [contextModalOpen]);

  const handleSave = (e: FormSchema) => {
    localStorage.setItem("aiContext", e.context);
    setAIContext(e.context);
    closeModal();
  };

  const closeModal = () => {
    setContextModalOpen(false);
  };

  return (
    <Modal
      title="Generative context"
      open={contextModalOpen}
      width={"70vw"}
      footer={null}
      onCancel={closeModal}
    >
      <Typography.Paragraph type="secondary">
        A context for AI knowledge of current generation{" "}
      </Typography.Paragraph>
      <Form form={form} layout="vertical" onFinish={handleSave}>
        <Form.Item label="Context" name={"context"}>
          <Input.TextArea
            autoSize={{
              maxRows: 40,
              minRows: 10,
            }}
          />
        </Form.Item>
        <div className="flex justify-end gap-2">
          <Button>Cancel</Button>
          <Button type="primary" htmlType="submit">
            <span className="px-5">Save</span>
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ContextModal;
