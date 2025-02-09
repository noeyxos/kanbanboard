import {
  Box,
  Button,
  CardBody,
  CardDescription,
  CardRoot,
  HStack,
  Heading,
} from "@chakra-ui/react";
import { CiMenuKebab } from "react-icons/ci";
import AddCard from "./AddCard";
import { useState } from "react";
import EditCard from "./EditCard";
import { motion } from "framer-motion";
import SpringModal from "./SpringModal";

interface Card {
  id: number;
  columnId: number;
  tag: string;
  description: string;
  order: number;
}

interface KanbanCardProps {
  card?: Card;
  columnId: number;
  isAdding?: boolean;
  onAddCard?: (
    columnId: number,
    cardData: { tag: string; description: string }
  ) => void;
  onEditCard?: (
    cardId: number,
    cardData: { tag: string; description: string }
  ) => void;
  onDeleteCard?: (cardId: number) => void;
  onCancelAdd?: () => void;
  onDragStart?: (e: React.DragEvent, cardId: number, columnId: number) => void;
  onDragEnd?: () => void;
  isDragging?: boolean;
}

const KanbanCard = ({
  card,
  columnId,
  isAdding,
  onAddCard,
  onEditCard,
  onDeleteCard,
  onCancelAdd,
  onDragStart,
  onDragEnd,
  isDragging,
}: KanbanCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleAddCard = (cardData: { tag: string; description: string }) => {
    onAddCard?.(columnId, cardData);
    onCancelAdd?.();
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    if (card) {
      onDeleteCard?.(card.id);
    }
  };

  if (isAdding) {
    return <AddCard onAddCard={handleAddCard} />;
  }

  if (!card) return null;

  if (isEditing) {
    return (
      <EditCard
        card={card}
        onSave={(cardData) => {
          onEditCard?.(card.id, cardData);
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
      }}
      style={{ width: "100%", marginBottom: "8px" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <CardRoot
        variant="elevated"
        draggable
        onDragStart={(e) => onDragStart?.(e, card.id, columnId)}
        onDragEnd={onDragEnd}
        cursor="grab"
        opacity={isDragging ? 0.5 : 1}
        boxShadow={isDragging ? "lg" : "md"}
        _hover={{ boxShadow: "lg" }}
      >
        <CardBody gap="2" alignItems="start">
          <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            position={"relative"}
          >
            <Box
              display="inline"
              fontSize="sm"
              mb="2"
              bgColor="gray.200"
              px={2}
              py={1}
              borderRadius="xl"
            >
              {card.tag}
            </Box>
            <Button
              color="black"
              bgColor="#F1F1F1"
              borderRadius={20}
              size="sm"
              padding={1}
              onClick={() => setIsOpen(!isOpen)}
              onTouchStart={() => setIsOpen(!isOpen)}
            >
              <CiMenuKebab />
            </Button>
          </Box>
          <Box>
            <SpringModal p="" isOpen={isOpen} setIsOpen={setIsOpen}>
              <Box minW="100%" zIndex={3000}>
                <Heading>카드를 수정 또는 삭제하시겠습니까?</Heading>
                <HStack>
                  <Button
                    value="edit"
                    onClick={handleEditClick}
                    onTouchStart={handleEditClick}
                  >
                    수정
                  </Button>
                  <Button
                    value="delete"
                    color="fg.error"
                    _hover={{ bg: "bg.error", color: "fg.error" }}
                    onClick={handleDeleteClick}
                    onTouchStart={handleDeleteClick}
                  >
                    삭제
                  </Button>
                </HStack>
              </Box>
            </SpringModal>
          </Box>
          <CardDescription>{card.description}</CardDescription>
        </CardBody>
      </CardRoot>
    </motion.div>
  );
};

export default KanbanCard;
