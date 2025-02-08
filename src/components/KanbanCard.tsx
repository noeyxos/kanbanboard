import {
  Box,
  Button,
  CardBody,
  CardDescription,
  CardRoot,
  Stack,
} from "@chakra-ui/react";
import { CiMenuKebab } from "react-icons/ci";
import AddCard from "./AddCard";

interface KanbanCardProps {
  cards: Card[];
  columnId: number;
  isAdding: boolean;
  onAddCard?: (
    columnId: number,
    cardData: { tag: string; description: string }
  ) => void;
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
}: KanbanCardProps) => {
  const handleAddCard = (cardData: { tag: string; description: string }) => {
    if (onAddCard) {
      onAddCard(columnId, cardData);
    }
  };

  // 카드가 없거나 isAdding이 true일 때 AddCard 컴포넌트 표시
  if (cards.length === 0 || isAdding) {
    return <AddCard onAddCard={handleAddCard} />;
  }

  return (
    <Stack gap="4" direction="row" wrap="wrap">
      {cards.map((card) => (
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
              <Button
                color="black"
                bgColor="#F1F1F1"
                borderRadius={20}
                size="sm"
                padding={1}
              >
                <CiMenuKebab />
              </Button>
            </Box>
            <CardDescription>{card.description}</CardDescription>
          </CardBody>
        </CardRoot>
      ))}
      {isAdding && <AddCard onAddCard={handleAddCard} />}
    </Stack>
  );
};

export default KanbanCard;
