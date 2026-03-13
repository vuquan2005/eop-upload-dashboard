<script setup lang="ts">
import { computed, ref } from 'vue';
import KanbanColumn from './KanbanColumn.vue';
import CardModal from './CardModal.vue';
import type { KanbanCard, KanbanColumn as KanbanColumnType } from '../types/kanban';
 
const props = defineProps<{
    columns: KanbanColumnType[];
}>();

// Gradient accent colors for each column header
const columnAccents = [
    'from-indigo-500 to-purple-600',
    'from-emerald-500 to-teal-600',
    'from-amber-500 to-orange-600',
    'from-rose-500 to-pink-600',
    'from-cyan-500 to-blue-600',
    'from-violet-500 to-fuchsia-600',
] as const;

const getAccent = (index: number) => columnAccents[index % columnAccents.length]!;

// Modal state
const selectedCard = ref<KanbanCard | null>(null);
const selectedCardColumnAccent = ref<string>('');

const isLink = (content: string) => content.startsWith('http');

// Simple reusable regex for extracting YouTube video IDs
const contentUrlRegex = /[?&]v=([^&]+)/;

const getYouTubeId: (url: string) => string | null = (url: string) => {
    const match = contentUrlRegex.exec(url);
    return match ? match[1] ?? null : null;
};

const kanbanColumns = computed(() => props.columns);

function handleSelectCard(payload: { card: KanbanCard; accent: string }) {
    selectedCard.value = payload.card;
    selectedCardColumnAccent.value = payload.accent;
}
</script>

<template>
    <!-- Kanban Board -->
    <div class="flex gap-5 overflow-x-auto items-start flex-1 scroll-smooth">
        <KanbanColumn v-for="(col, colIndex) in kanbanColumns" :key="col.title" :column="col"
            :index="colIndex + 1" :accent="getAccent(colIndex)" :is-link="isLink"
            :get-you-tube-id="getYouTubeId" @select-card="handleSelectCard" />
    </div>

    <!-- Modal -->
    <CardModal :card="selectedCard" :accent="selectedCardColumnAccent" :is-link="isLink"
        :get-you-tube-id="getYouTubeId" @close="selectedCard = null" />
</template>

