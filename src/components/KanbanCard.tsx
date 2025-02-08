import {
  Box,
  Button,
  CardBody,
  CardDescription,
  CardRoot,
  Stack,
} from "@chakra-ui/react";
import { CiMenuKebab } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";

interface KanbanColumnProps {
  cards: Card[];
}

interface Card {
  id: number;
  columnId: number;
  tag: string;
  description: string;
}

const KanbanCard = ({ cards }: KanbanColumnProps) => {
  // 카드가 없을 때는 추가해보세요
  if (cards.length === 0) {
    return (
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
    );
  }

  //있으면 보여주기
  // 카드 스타일에 따라 "subtle", "outline", "elevated"
  return (
    <Stack gap="4" direction="row" wrap="wrap">
      {cards.map((card) => (
        <CardRoot width="201px" variant={"elevated"}>
          <CardBody gap="2" alignItems={"start"}>
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
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
              <Button
                color={"black"}
                bgColor={"#F1F1F1"}
                borderRadius={20}
                size={"sm"}
                padding={1}
              >
                <CiMenuKebab />
              </Button>
            </Box>
            <CardDescription>{card.description}</CardDescription>
          </CardBody>
        </CardRoot>
      ))}
    </Stack>
  );
};

export default KanbanCard;
