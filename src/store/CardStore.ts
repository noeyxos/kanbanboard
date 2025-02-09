import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Card {
  id: number;
  columnId: number;
  tag: string;
  description: string;
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
}

const DefaultCards: Card[] = [
  {
    id: 1,
    columnId: 2,
    tag: "관리자페이지",
    description: "회원을 블랙리스트로 지정할 수 있는 기능을 제작합니다.",
  },
  {
    id: 2,
    columnId: 3,
    tag: "사용자화면",
    description:
      "장바구니에 상품을 추가하고 수정, 삭제하는 기능이 포함된 컴포넌트를 제작합니다.",
  },
  {
    id: 3,
    columnId: 3,
    tag: "문서화",
    description: "디자인시스템 2.1 버전로그를 작성합니다.",
  },
];

export const useCardStore = create(
  persist<CardState>(
    (set) => ({
      cards: DefaultCards,
      addCard: (columnId, cardData) =>
        set((state) => ({
          cards: [...state.cards, { id: Date.now(), columnId, ...cardData }],
        })),
      editCard: (cardId: number, cardData) =>
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === cardId ? { ...card, ...cardData } : card
          ),
        })),
      deleteCard: (cardId: number) =>
        set((state) => ({
          cards: state.cards.filter((card) => card.id !== cardId),
        })),
      deleteColumnCards: (columnId: number) =>
        set((state) => ({
          cards: state.cards.filter((card) => card.columnId !== columnId),
        })),
    }),
    {
      name: "card-storage",
    }
  )
);
