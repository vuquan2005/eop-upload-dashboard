<script setup lang="ts">
import KanbanCard from './KanbanCard.vue';
import type { KanbanCard as KanbanCardType, KanbanColumn } from '../types/kanban';

const props = defineProps<{
    column: KanbanColumn;
    index: number;
    accent: string;
    isLink: (content: string) => boolean;
    getYouTubeId: (url: string) => string | null;
}>();

const emit = defineEmits<{
    (e: 'select-card', payload: { card: KanbanCardType; accent: string }): void;
}>();

function handleSelect(card: KanbanCardType) {
    emit('select-card', { card, accent: props.accent });
}
</script>

<template>
    <div
        class="min-w-[340px] max-w-[340px] flex flex-col rounded-2xl bg-white/30 hover:bg-white/75 backdrop-blur-md hover:backdrop-blur-xl border border-white/30 hover:border-white/70 shadow-xl shadow-surface-300/20 transition-all duration-500 hover:shadow-2xl hover:shadow-surface-300/30 group">
        <!-- Column Header with gradient accent -->
        <div class="relative overflow-hidden rounded-t-2xl">
            <div :class="['absolute inset-0 opacity-50 bg-gradient-to-r', accent]"></div>
            <div class="relative px-4 py-2 flex items-center gap-3">
                <h2 class="text-sm font-bold text-white uppercase tracking-wider leading-tight flex-1">
                    {{ column.title }}
                </h2>
                <span class="text-xs font-semibold text-white/70 bg-white/15 rounded-full px-2.5 py-0.5">
                    {{ column.cards.length }}
                </span>
            </div>
        </div>

        <!-- Cards Container -->
        <div class="p-3 flex flex-col gap-3 flex-1">
            <template v-if="column.cards.length > 0">
                <KanbanCard v-for="card in column.cards" :key="card.title || ''" :card="card" :accent="accent"
                    :is-link="isLink" :get-you-tube-id="getYouTubeId" @select="handleSelect" />
            </template>

            <!-- Empty column state -->
            <div v-else class="flex flex-col items-center justify-center py-10 text-center">
                <div class="w-12 h-12 rounded-xl bg-surface-200/50 flex items-center justify-center mb-3">
                    <svg class="w-6 h-6 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>
                <p class="text-surface-500 text-xs font-medium">No content yet</p>
            </div>
        </div>
    </div>
</template>

