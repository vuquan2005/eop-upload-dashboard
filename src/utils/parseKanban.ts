import type { KanbanCard, KanbanColumn } from '../types/kanban';

/**
 * Parses a markdown string into a Kanban board format.
 *
 * Rules:
 * - Columns are separated by `---`
 * - Column titles are headings starting with `# `
 * - Cards are sections starting with `## `
 * - Card content is the text below `## ` until the next card or the end of the column
 *
 * @param markdown The raw markdown string
 * @returns Array of Kanban columns
 */
export function parseMarkdownToKanban(markdown: string): KanbanColumn[] {
    // Split the markdown content by horizontal rules `---`
    const columnSections = markdown.split(/\r?\n---[ \t]*\r?\n/);

    return columnSections
        .map((columnRaw) => {
            // Trim surrounding whitespace and split by \n or \r\n
            const lines = columnRaw.trim().split(/\r?\n/);
            let title = '';
            const cards: KanbanCard[] = [];

            let currentCard: (KanbanCard & { content: string }) | null = null;

            for (const line of lines) {
                const trimmedLine = line.trim();

                if (trimmedLine.startsWith('# ') && !currentCard) {
                    // Find column title, using RegEx to handle potential extra spaces safely
                    title = trimmedLine.replace(/^#\s+/, '').trim();
                } else if (trimmedLine.startsWith('## ')) {
                    // Save the previous card if it exists
                    if (currentCard) {
                        cards.push({
                            title: currentCard.title,
                            content: currentCard.content.trim(),
                        });
                    }
                    // Start a new card
                    currentCard = {
                        title: trimmedLine.replace(/^##\s+/, '').trim(),
                        content: '',
                    };
                } else if (currentCard) {
                    // Append content to the current card without trimming original spaces
                    currentCard.content += line + '\n';
                }
            }

            // Push the very last card in this column if it exists
            if (currentCard) {
                cards.push({
                    title: currentCard.title,
                    content: currentCard.content.trim(),
                });
            }

            return {
                title,
                cards,
            };
        })
        .filter((col) => col.title); // Filter out empty columns
}
