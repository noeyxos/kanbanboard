import {
  Box,
  CardBody,
  CardDescription,
  CardRoot,
  Input,
  Button,
  Stack,
  HStack,
} from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";

interface AddCardProps {
  onAddCard?: (cardData: {
    tag: string;
    description: string;
    color: string;
  }) => void;
}

function AddCard({ onAddCard }: AddCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const [tagColor, setTagColor] = useState("#ffffff");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tag.trim() && description.trim() && onAddCard) {
      onAddCard({ tag, description, color: tagColor });
      setTag("");
      setDescription("");
      setTagColor("#ffffff");
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTag("");
    setDescription("");
    setTagColor("#ffffff");
  };

  if (!isEditing) {
    return (
      <CardRoot
        variant="outline"
        cursor="pointer"
        onClick={() => setIsEditing(true)}
      >
        <CardBody gap="2" alignItems="center">
          <CardDescription color="gray.500">
            지금 바로 추가해보세요.
          </CardDescription>
          <Box bgColor="#F1F1F1" borderRadius={20}>
            <IoMdAdd size={20} />
          </Box>
        </CardBody>
      </CardRoot>
    );
  }

  return (
    <CardRoot variant="outline">
      <CardBody>
        <form onSubmit={handleSubmit}>
          <Stack>
            <Input
              placeholder="태그 입력"
              size="sm"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              autoFocus
            />
            <Input
              placeholder="설명 입력"
              size="sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <select
              value={tagColor}
              onChange={(e) => setTagColor(e.target.value)}
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
                onClick={handleCancel}
              >
                취소
              </Button>
              <Button
                size="sm"
                bgColor={
                  tagColor === "#ffffff" ? "gray.100" : tagColor || "gray.100"
                }
                type="submit"
                variant="ghost"
                style={{
                  color:
                    tagColor === "#F5F5F5" || tagColor === "#ffffff"
                      ? "black"
                      : "white",
                }}
              >
                추가
              </Button>
            </HStack>
          </Stack>
        </form>
      </CardBody>
    </CardRoot>
  );
}

export default AddCard;
