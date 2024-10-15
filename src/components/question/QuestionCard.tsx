"use client";

import { useGenerativeStore } from "@/store/generativeStore";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useCompletion } from "ai/react";
import { Button, Typography } from "antd";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import GenerativeButton from "./GenerativeButton";

type Props = {
  index: number;
  section: string;
  description: string;
};

const QuestionCard = ({ description, index, section }: Props) => {
  const [deleteRequirement, aiContext] = useGenerativeStore(
    useShallow((state) => [state.deleteRequirement, state.aiContext]),
  );
  const { completion, setInput, handleSubmit, isLoading } = useCompletion({
    api: "/api/generative",
  });

  useEffect(() => {
    setInput(
      JSON.stringify({
        section: section,
        description: description,
        userProvidedContext: aiContext,
      }),
    );
  }, [description, index, section]);

  const onDelete = () => {
    deleteRequirement(index);
  };

  return (
    <div
      key={section}
      className="flex w-full flex-col gap-2 rounded-lg border p-2"
    >
      <div className="flex items-center justify-start gap-2">
        <GenerativeButton loading={isLoading} onClick={handleSubmit} />
        <Typography.Title level={5}>{section}</Typography.Title>
        <div className="ml-auto flex gap-2">
          {/* <Button onClick={onCopy} icon={<CopyOutlined />} /> */}
          <Button
            onClick={onDelete}
            icon={<DeleteOutlined />}
            danger
            type="text"
          />
        </div>
      </div>

      <Typography.Paragraph
        ellipsis={{
          defaultExpanded: false,
          expandable: "collapsible",
          rows: 2,
        }}
        type="secondary"
      >
        {description}
      </Typography.Paragraph>

      {completion && (
        <MarkdownPreview
          source={completion}
          style={{ padding: 16 }}
          disableCopy={false}
        />
      )}
    </div>
  );
};

export default QuestionCard;
