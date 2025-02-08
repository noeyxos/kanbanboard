import { Box, Button, HStack, Input } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { LuArrowDownToLine } from "react-icons/lu";

interface AddColumnProps {
  onAddColumn: (columnName: string) => void;
}

function AddColumn({ onAddColumn }: AddColumnProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");

  const handleAddColumn = () => {
    if (newColumnName.trim()) {
      onAddColumn(newColumnName);
      setNewColumnName("");
      setIsEditing(false);
    }
  };

  const handleCancleAddColumn = () => {
    setIsEditing(false);
    setNewColumnName("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddColumn();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setNewColumnName("");
    }
  };
  if (isEditing) {
    return (
      <Box display={"flex"}>
        <Input
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          placeholder="컬럼 제목을 입력하세요"
          bgColor="white"
          width="180px"
        />
        <HStack pl={3}>
          <LuArrowDownToLine size={24} onClick={handleAddColumn} />
          <AiOutlineClose size={24} onClick={handleCancleAddColumn} />
        </HStack>
      </Box>
    );
  }

  return (
    <Button width="201px" bgColor="gray.200" onClick={() => setIsEditing(true)}>
      <IoMdAdd />
      Add another list
    </Button>
  );
}

export default AddColumn;
