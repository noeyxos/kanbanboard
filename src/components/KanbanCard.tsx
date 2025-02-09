import {
  Box,
  Button,
  CardBody,
  CardDescription,
  CardRoot,
  Stack,
  MenuRoot,
  MenuItem,
  MenuContent,
  MenuTrigger,
} from "@chakra-ui/react";
import { CiMenuKebab } from "react-icons/ci";
import AddCard from "./AddCard";
import { useState } from "react";
import EditCard from "./EditCard";

interface KanbanCardProps {
  cards: Card[];
  columnId: number;
  isAdding: boolean;
  onAddCard?: (
    columnId: number,
    cardData: { tag: string; description: string }
  ) => void;

  onEditCard?: (
    cardId: number,
    cardData: { tag: string; description: string }
  ) => void;
  onDeleteCard?: (cardId: number) => void;
  onCancelAdd: () => void;
}

interface Card {
  id: number;
  columnId: number;
  tag: string;
  description: string;
}

const KanbanCard = ({
  cards,
  columnId,
  isAdding,
  onAddCard,
  onEditCard,
  onDeleteCard,
}: KanbanCardProps) => {
  const [editingCardId, setEditingCardId] = useState<number | null>(null);

  const handleAddCard = (cardData: { tag: string; description: string }) => {
    if (onAddCard) {
      onAddCard(columnId, cardData);
    }
  };

  const handleEditClick = (cardId: number) => {
    setEditingCardId(cardId);
  };

  const handleDeleteCard = (cardId: number) => {
    if (onDeleteCard) {
      onDeleteCard(cardId);
    }
  };

  if (cards.length === 0) {
    return <AddCard onAddCard={handleAddCard} />;
  }

  return (
    <Stack gap="4" direction="row" wrap="wrap">
      {cards.map((card) =>
        editingCardId === card.id ? (
          <EditCard
            key={card.id}
            card={card}
            onSave={(cardData) => {
              onEditCard?.(card.id, cardData);
              setEditingCardId(null);
            }}
            onCancel={() => setEditingCardId(null)}
          />
        ) : (
          <CardRoot key={card.id} width="201px" variant="elevated">
            <CardBody gap="2" alignItems="start">
              <Box
                width="100%"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
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
                <MenuRoot>
                  <MenuTrigger bgColor="transparent" padding={0}>
                    <Button
                      color="black"
                      bgColor="#F1F1F1"
                      borderRadius={20}
                      size="sm"
                      padding={1}
                    >
                      <CiMenuKebab />
                    </Button>
                  </MenuTrigger>
                  <MenuContent minW="120px" zIndex={1000} position={"fixed"}>
                    <MenuItem
                      value="edit"
                      onClick={() => handleEditClick(card.id)}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem
                      value="delete"
                      color="fg.error"
                      _hover={{ bg: "bg.error", color: "fg.error" }}
                      onClick={() => handleDeleteCard(card.id)}
                    >
                      Delete
                    </MenuItem>
                  </MenuContent>
                </MenuRoot>
              </Box>
              <CardDescription>{card.description}</CardDescription>
            </CardBody>
          </CardRoot>
        )
      )}
      {isAdding && <AddCard onAddCard={handleAddCard} />}
    </Stack>
  );
};

export default KanbanCard;
