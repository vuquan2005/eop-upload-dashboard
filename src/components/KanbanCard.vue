<script setup lang="ts">
import type { KanbanCard } from '../types/kanban';

const props = defineProps<{
    card: KanbanCard;
    accent: string;
    isLink: (content: string) => boolean;
    getYouTubeId: (url: string) => string | null;
}>();

const emit = defineEmits<{
    (e: 'select', card: KanbanCard): void;
}>();

function handleClick() {
    emit('select', props.card);
}
</script>

<template>
    <div
        class="bg-white/55 opacity-90 group-hover:opacity-100 group-hover:bg-white/90 backdrop-blur-md rounded-xl p-4 border border-white/20 group-hover:border-white/60 cursor-pointer transition-all duration-500 hover:!bg-white hover:!border-surface-300/60 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-surface-300/30"
        @click="handleClick">
        <!-- Card Title -->
        <div class="flex items-start mb-2">
            <h3 class="text-sm font-semibold text-surface-900 leading-snug">
                {{ card.title || 'Untitled' }}
            </h3>
        </div>

        <!-- Card Content -->
        <div v-if="card.content">
            <!-- Link / YouTube -->
            <template v-if="isLink(card.content)">
                <!-- YouTube link: show thumbnail and let card click open modal -->
                <template v-if="getYouTubeId(card.content)">
                    <div
                        class="mt-1 relative rounded-xl overflow-hidden border border-surface-200 shadow-sm group cursor-pointer">
                        <img :src="`https://img.youtube.com/vi/${getYouTubeId(card.content)}/hqdefault.jpg`"
                            alt="YouTube thumbnail" class="w-full h-auto object-cover">
                        <div
                            class="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-200">
                        </div>
                    </div>
                </template>
                <!-- Non-YouTube link: keep simple text link -->
                <template v-else>
                    <a :href="card.content" target="_blank" rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 text-sm text-primary-700 hover:text-primary-800 font-medium transition-colors duration-150 group/link">
                        <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="group-hover/link:underline underline-offset-2">Open link</span>
                    </a>
                </template>
            </template>

            <!-- Text content -->
            <template v-else>
                <p class="text-sm text-surface-800 whitespace-pre-wrap leading-relaxed line-clamp-15">
                    {{ card.content }}
                </p>
                
            </template>
        </div>
    </div>
</template>

