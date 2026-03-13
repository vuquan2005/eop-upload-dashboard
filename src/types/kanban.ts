export interface KanbanCard {
    title: string;
    content?: string;
}

export interface KanbanColumn {
    title: string;
    cards: KanbanCard[];
}

