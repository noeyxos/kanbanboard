import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Card {
  id: number;
  columnId: number;
  tag: string;
  description: string;
  order: number;
}

interface CardState {
  cards: Card[];
  addCard: (
    columnId: number,
    cardData: { tag: string; description: string }
  ) => void;
  editCard: (
    cardId: number,
    cardData: { tag: string; description: string }
  ) => void;
  deleteCard: (cardId: number) => void;
  deleteColumnCards: (columnId: number) => void;
  moveCard: (
    draggedCardId: number,
    targetColumnId: number,
    targetCardId?: number
  ) => void;
}

const DefaultCards: Card[] = [
  {
    id: 1,
    columnId: 2,
    tag: "관리자페이지",
    description: "회원을 블랙리스트로 지정할 수 있는 기능을 제작합니다.",
    order: 0,
  },
  {
    id: 2,
    columnId: 3,
    tag: "사용자화면",
    description:
      "장바구니에 상품을 추가하고 수정, 삭제하는 기능이 포함된 컴포넌트를 제작합니다.",
    order: 0,
  },
  {
    id: 3,
    columnId: 3,
    tag: "문서화",
    description: "디자인시스템 2.1 버전로그를 작성합니다.",
    order: 1,
  },
];

export const useCardStore = create(
  persist<CardState>(
    (set) => ({
      cards: DefaultCards,

      addCard: (columnId, cardData) =>
        set((state) => {
          const columnCards = state.cards.filter(
            (card) => card.columnId === columnId
          );
          const newOrder = columnCards.length;

          return {
            cards: [
              ...state.cards,
              {
                id: Date.now(),
                columnId,
                order: newOrder,
                ...cardData,
              },
            ],
          };
        }),

      editCard: (cardId, cardData) =>
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === cardId ? { ...card, ...cardData } : card
          ),
        })),

      deleteCard: (cardId) =>
        set((state) => {
          const deletedCard = state.cards.find((card) => card.id === cardId);
          if (!deletedCard) return state;

          return {
            cards: state.cards
              .filter((card) => card.id !== cardId)
              .map((card) => {
                if (
                  card.columnId === deletedCard.columnId &&
                  card.order > deletedCard.order
                ) {
                  return { ...card, order: card.order - 1 };
                }
                return card;
              }),
          };
        }),

      deleteColumnCards: (columnId) =>
        set((state) => ({
          cards: state.cards.filter((card) => card.columnId !== columnId),
        })),

      moveCard: (draggedCardId, targetColumnId, targetCardId?) =>
        set((state) => {
          const draggedCard = state.cards.find(
            (card) => card.id === draggedCardId
          );
          if (!draggedCard) return state;

          const oldColumnId = draggedCard.columnId;
          const isMovingWithinColumn = oldColumnId === targetColumnId;

          let updatedCards = state.cards.filter(
            (card) => card.id !== draggedCardId
          );

          const targetCard = targetCardId
            ? updatedCards.find((card) => card.id === targetCardId)
            : null;
          const targetOrder = targetCard
            ? targetCard.order
            : Math.max(
                ...updatedCards
                  .filter((card) => card.columnId === targetColumnId)
                  .map((card) => card.order),
                -1
              ) + 1;

          const newCard = {
            ...draggedCard,
            columnId: targetColumnId,
            order: targetOrder,
          };

          updatedCards = updatedCards.map((card) => {
            if (card.columnId === targetColumnId) {
              if (isMovingWithinColumn) {
                if (draggedCard.order < targetOrder) {
                  if (
                    card.order <= targetOrder &&
                    card.order > draggedCard.order
                  ) {
                    return { ...card, order: card.order - 1 };
                  }
                } else {
                  if (
                    card.order >= targetOrder &&
                    card.order < draggedCard.order
                  ) {
                    return { ...card, order: card.order + 1 };
                  }
                }
              } else {
                if (card.order >= targetOrder) {
                  return { ...card, order: card.order + 1 };
                }
              }
            }
            return card;
          });

          return {
            cards: [...updatedCards, newCard].sort((a, b) => {
              if (a.columnId === b.columnId) {
                return a.order - b.order;
              }
              return a.columnId - b.columnId;
            }),
          };
        }),
    }),
    {
      name: "card-storage",
    }
  )
);
