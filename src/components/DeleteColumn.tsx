import {
  Button,
  Group,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverRoot,
} from "@chakra-ui/react";
import { useRef } from "react";

interface DeleteColumnProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onDeleteConfirm: () => void;
  columnTitle: string;
}

function DeleteColumn({
  isOpen,
  setIsOpen,
  onDeleteConfirm,
  columnTitle,
}: DeleteColumnProps) {
  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  const handleDelete = () => {
    onDeleteConfirm();
    setIsOpen(false);
  };

  return (
    <PopoverRoot open={isOpen} positioning={{ placement: "top-end" }}>
      <PopoverContent
        style={{
          position: "absolute",
          zIndex: 1000,
        }}
      >
        <PopoverHeader color={"black"} fontWeight="bold">
          컬럼 삭제
        </PopoverHeader>
        <PopoverArrow />
        <PopoverBody color={"black"}>
          '{columnTitle}' 컬럼을 삭제하시겠습니까?
        </PopoverBody>
        <PopoverFooter>
          <Group justify="end" gap={2}>
            <Button
              size="sm"
              variant="outline"
              bgColor={"transparent"}
              onClick={() => setIsOpen(false)}
            >
              취소
            </Button>
            <Button
              size="sm"
              bgColor="red"
              ref={deleteButtonRef}
              onClick={handleDelete}
            >
              삭제
            </Button>
          </Group>
        </PopoverFooter>
      </PopoverContent>
    </PopoverRoot>
  );
}

export default DeleteColumn;
