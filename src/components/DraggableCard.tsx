import { motion } from "framer-motion";
import { Box, Text } from "@chakra-ui/react";

interface DraggableCardProps {
  id: number;
  columnId: number;
  tag: string;
  description: string;
  onDragStart: (
    e: React.DragEvent | React.TouchEvent,
    cardId: number,
    sourceColumnId: number
  ) => void;
  onDragMove: (e: React.TouchEvent) => void;
  onDragEnd: () => void;
  isDragging?: boolean;
}

export function DraggableCard({
  id,
  columnId,
  tag,
  description,
  onDragStart,
  onDragMove,
  onDragEnd,
  isDragging,
}: DraggableCardProps) {
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
      style={{ marginBottom: "8px" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Box
        as={motion.div}
        draggable
        onDragStart={(e) => onDragStart(e, id, columnId)}
        onDragEnd={onDragEnd}
        onTouchStart={onDragMove}
        onTouchEnd={onDragEnd}
        cursor="grab"
        p={4}
        bg="white"
        borderRadius="md"
        boxShadow={isDragging ? "lg" : "md"}
        opacity={isDragging ? 0.5 : 1}
        _hover={{ boxShadow: "lg" }}
        transition="all 0.2s"
      >
        <Text fontWeight="bold">{tag}</Text>
        <Text>{description}</Text>
      </Box>
    </motion.div>
  );
}
