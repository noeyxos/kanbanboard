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
  };
  onSave: (cardData: { tag: string; description: string }) => void;
  onCancel: () => void;
}

const EditCard = ({ card, onSave, onCancel }: EditCardProps) => {
  const [tag, setTag] = useState(card.tag);
  const [description, setDescription] = useState(card.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tag.trim() && description.trim()) {
      onSave({ tag, description });
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
