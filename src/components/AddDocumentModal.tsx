"use client";

import { useGlobalStore } from "@/store/globalStore";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import EditOutlined from "@ant-design/icons/EditOutlined";
import EyeOutlined from "@ant-design/icons/EyeOutlined";
import { Button, Drawer, Form, Input, Tag, Typography } from "antd";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import EditDocumentDrawer from "./EditDocumentDrawer";

type FormSchema = {
  doc_name: string;
  doc_body: string;
};

const AddDocumentModal = () => {
  const [testForm] = Form.useForm<FormSchema>();
  const { setModalOpen, documentId, modalOpen, setEditDrawerOpen } =
    useGlobalStore(
      useShallow((state) => ({
        setModalOpen: state.setMainDrawerOpen,
        documentId: state.documentID,
        modalOpen: state.mainDrawerOpen,
        setEditDrawerOpen: state.setEditDrawerOpen,
      })),
    );

  useEffect(() => {
    if (documentId === undefined) {
      testForm.setFieldsValue({
        doc_name: "New Document",
        doc_body: "",
      });
    }

    return () => {
      testForm.resetFields();
    };
  }, [documentId, modalOpen]);

  const onFinish = async (values: any) => {
    console.log(values);
  };

  return (
    <Drawer
      placement="left"
      width="70vw"
      onClose={() => {
        setModalOpen(false);
      }}
      open={modalOpen}
      title={documentId ?? "Add Document"}
    >
      <Form
        form={testForm}
        layout="vertical"
        onFinish={onFinish}
        requiredMark="optional"
      >
        <div className="mb-6 flex flex-row items-end gap-2">
          <Form.Item<FormSchema>
            label="Document Body"
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
              <Button>Cancel</Button>
              <Button type="primary" htmlType="submit">
                <span className="px-14">Save</span>
              </Button>
            </div>
          </div>
        </div>
      </Form>
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
          Add section
        </Button>
      </div>
      <div className="flex flex-col justify-start gap-2 rounded-md border p-3">
        <div className="flex justify-between">
          <Typography.Title level={4}>
            Proposal for Saskatchewan Polytechnic
          </Typography.Title>
          <div className="flex gap-2">
            <Button icon={<EyeOutlined />} type="text" />
            <Button icon={<EditOutlined />} type="text" />
            <Button danger icon={<DeleteOutlined />} type="text" />
          </div>
        </div>
        <div className="flex w-full flex-wrap gap-y-2">
          {[
            "Insightrix",
            "Corrin Harper",
            "President",
            "Contact Information",
            "Saskatchewan",
            "Hybrid Working",
            "Sustainability",
            "Research Services",
            "Post-Secondary Sector",
            "Professional Services",
            "Environmental Responsibility",
            "Client Research",
            "Saskatoon",
          ].map((item, index) => {
            return (
              <Tag color="blue" key={index}>
                {item}
              </Tag>
            );
          })}
        </div>
        <Typography.Paragraph
          type="secondary"
          ellipsis={{
            defaultExpanded: false,
            expandable: "collapsible",
            rows: 3,
          }}
        >
          **Insightrix Representative: ***Corrin Harper, President *Please
          regard me as the designated individual from Insightrix® Research Inc.
          (Insightrix) for any queries related to all aspects of the
          24SASKPOLY05-01 Professional Post-Secondary Sector Research Services.
          This affirms that the information below clearly outlines our legal
          name, the location of our head office, the jurisdiction of
          incorporation, and designates this office as the primary point for
          delivering all services to Saskatchewan Polytechnic (Sask Polytech).
          **Contact Information: **Corrin Harper, MBA President Insightrix®
          Research, Inc. 220-536 2nd Avenue North Saskatoon, Saskatchewan S7K
          2C5 Phone: (306) 657-5645 Mobile: (306) 290-9933 Email:
          Corrin.Harper@insightrix.com Hybrid Working Environment: 536 2nd Ave N
          \#220, Saskatoon, SK S7K 2C5 1-866-888-5640 \| 1-306-657-5640 Website:
          insightrix.com \| Email: info@insightrix.com We take this opportunity
          to acquaint you with our trust-based hybrid culture, emphasizing
          agility and environmental sustainability. This model reduces commuting
          emissions, conserves energy and water, and prioritizes digital
          platforms for client research. Our office, situated in Saskatoon
          `&apos;` s City Park neighbourhood, is part of a vibrant community
          with access to transit. We offer eco-friendly commuting options such
          as bike storage, lockers, and shower facilities. Additionally, we
          operate a remote call centre with all employees based in Saskatchewan,
          reflecting our commitment to both the community and environmental
          responsibility. Our professionals manage projects through daily
          interactions using a combination of technology and in-person meetings.
          Our office environment blends modern technology with welcoming meeting
          spaces, fostering creativity and problem-solving, supported by
          state-of-the-art video conferencing and flexible hot desks. For more
          information on our sustainability initiatives, please refer to our
          Sustainable Community Strategy later in this proposal.
        </Typography.Paragraph>
        {/* <MarkdownPreview
          source={`**Insightrix Representative:  
***Corrin Harper, President  
*Please regard me as the designated individual from Insightrix® Research Inc. (Insightrix) for any queries related to all aspects of the 24SASKPOLY05-01 Professional Post-Secondary Sector Research Services.

This affirms that the information below clearly outlines our legal name, the location of our head office, the jurisdiction of incorporation, and designates this office as the primary point for delivering all services to Saskatchewan Polytechnic (Sask Polytech).

**Contact Information:  
**Corrin Harper, MBA  
President  
Insightrix® Research, Inc.  
220-536 2nd Avenue North  
Saskatoon, Saskatchewan S7K 2C5  
Phone: (306) 657-5645  
Mobile: (306) 290-9933  
Email: Corrin.Harper@insightrix.com

Hybrid Working Environment:  
536 2nd Ave N \#220, Saskatoon, SK S7K 2C5  
1-866-888-5640 \| 1-306-657-5640  
Website: insightrix.com \| Email: info@insightrix.com

We take this opportunity to acquaint you with our trust-based hybrid culture, emphasizing agility and environmental sustainability. This model reduces commuting emissions, conserves energy and water, and prioritizes digital platforms for client research. Our office, situated in Saskatoon's City Park neighbourhood, is part of a vibrant community with access to transit. We offer eco-friendly commuting options such as bike storage, lockers, and shower facilities. Additionally, we operate a remote call centre with all employees based in Saskatchewan, reflecting our commitment to both the community and environmental responsibility.

Our professionals manage projects through daily interactions using a combination of technology and in-person meetings. Our office environment blends modern technology with welcoming meeting spaces, fostering creativity and problem-solving, supported by state-of-the-art video conferencing and flexible hot desks. For more information on our sustainability initiatives, please refer to our Sustainable Community Strategy later in this proposal.
`}
          style={{ padding: 16 }}
        /> */}
      </div>
      <EditDocumentDrawer />
    </Drawer>
  );
};

export default AddDocumentModal;
