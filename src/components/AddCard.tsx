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
  onAddCard?: (cardData: { tag: string; description: string }) => void;
}

function AddCard({ onAddCard }: AddCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tag.trim() && description.trim() && onAddCard) {
      onAddCard({ tag, description });
      setTag("");
      setDescription("");
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTag("");
    setDescription("");
  };

  if (!isEditing) {
    return (
      <CardRoot
        width="201px"
        variant="outline"
        cursor="pointer"
        onClick={() => setIsEditing(true)}
      >
        <CardBody gap="2" alignItems="center">
          <CardDescription color="gray.500">
            지금 바로 추가해보세요.
          </CardDescription>
          <Box bgColor="#F1F1F1" borderRadius={10} padding={1}>
            <IoMdAdd />
          </Box>
        </CardBody>
      </CardRoot>
    );
  }

  return (
    <CardRoot width="201px" variant="outline">
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
            <HStack justifyContent="flex-end" spaceX={2} width={"100%"}>
              <Button
                size="sm"
                bgColor="blue"
                type="submit"
                onClick={handleSubmit}
                flex={1}
              >
                추가
              </Button>
              <Button
                size="sm"
                bgColor="gray.100"
                variant="ghost"
                onClick={handleCancel}
                flex={1}
              >
                취소
              </Button>
            </HStack>
          </Stack>
        </form>
      </CardBody>
    </CardRoot>
  );
}

export default AddCard;
