import React, { useState } from "react";
import {
  Button,
  Stack,
  CardBody,
  CardRoot,
  Input,
  HStack,
} from "@chakra-ui/react";

interface EditCardProps {
  card: {
    tag: string;
    description: string;
    color: string;
  };
  onSave: (cardData: {
    tag: string;
    description: string;
    color: string;
  }) => void;
  onCancel: () => void;
}

const EditCard = ({ card, onSave, onCancel }: EditCardProps) => {
  const [tag, setTag] = useState(card.tag);
  const [description, setDescription] = useState(card.description);
  const [color, setColor] = useState(card.color);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tag.trim() && description.trim()) {
      onSave({ tag, description, color });
    }
  };

  return (
    <CardRoot variant="elevated">
      <CardBody>
        <form onSubmit={handleSubmit}>
          <Stack>
            <Input
              placeholder="태그 입력"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              autoFocus
              size="sm"
            />
            <Input
              placeholder="할일 입력"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              size="sm"
            />
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{
                padding: "6px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                cursor: "pointer",
              }}
            >
              <option value="#F5F5F5">기본</option>
              <option value="#EA0052">빨강</option>
              <option value="#00EA52">초록</option>
              <option value="#0052EA">파랑</option>
              <option value="#7C0491">보라</option>
            </select>

            <HStack justifyContent="flex-end" spaceX={2}>
              <Button
                size="sm"
                bgColor="gray.100"
                variant="ghost"
                onClick={onCancel}
                onTouchStart={onCancel}
              >
                취소
              </Button>
              <Button
                size="sm"
                bgColor="blue"
                type="submit"
                onTouchStart={handleSubmit}
              >
                저장
              </Button>
            </HStack>
          </Stack>
        </form>
      </CardBody>
    </CardRoot>
  );
};

export default EditCard;
