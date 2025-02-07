import {
  Box,
  CardBody,
  CardDescription,
  CardRoot,
  Stack,
} from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";

interface KanbanColumnProps {
  cards: Card[];
}

interface Card {
  id: number;
  columnId: string;
  tag: string;
  description: string;
}

const KanbanCard = ({ cards }: KanbanColumnProps) => {
  // 카드가 없을 때는 추가해보세요
  if (cards.length === 0) {
    return (
      <Stack gap="4" direction="row" wrap="wrap">
        <CardRoot width="201px" variant="outline" cursor={"pointer"}>
          <CardBody gap="2" alignItems={"center"}>
            <CardDescription color={"gray.500"}>
              지금 바로 추가해보세요.
            </CardDescription>
            <Box bgColor={"#F1F1F1"} borderRadius={20}>
              <IoMdAdd size={20} />
            </Box>
          </CardBody>
        </CardRoot>
      </Stack>
    );
  }

  //있으면 보여주기
  // 카드 스타일에 따라 "subtle", "outline", "elevated"
  return (
    <Stack gap="4" direction="row" wrap="wrap">
      {cards.map((card) => (
        <CardRoot variant={"elevated"}>
          <CardBody gap="2">
            <Box
              display={"inline"}
              fontSize={"sm"}
              mb="2"
              bgColor={"gray.200"}
              px={2}
              py={1}
              borderRadius={"xl"}
            >
              {card.tag}
            </Box>
            <CardDescription>{card.description}</CardDescription>
          </CardBody>
        </CardRoot>
      ))}
    </Stack>
  );
};

export default KanbanCard;
