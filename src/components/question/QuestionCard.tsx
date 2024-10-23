"use client";

import { useGenerativeStore } from "@/store/generativeStore";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useCompletion } from "ai/react";
import { Button, Typography } from "antd";
import { forwardRef, useEffect } from "react";
import { useShallow } from "zustand/shallow";
import GenerativeButton from "./GenerativeButton";

type Props = {
  index: number;
  section: string;
  description: string;
};

const QuestionCard = forwardRef<HTMLDivElement, Props>(
  ({ description, index, section }, ref) => {
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
    }, [section, description, aiContext]);

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
          <div ref={ref}>
            <MarkdownPreview
              source={completion}
              style={{ padding: 16 }}
              disableCopy={false}
            />
          </div>
        )}
      </div>
    );
  },
);

QuestionCard.displayName = "QuestionCard";

export default QuestionCard;
