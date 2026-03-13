<script setup lang="ts">
import type { KanbanCard } from '../types/kanban';

const props = defineProps<{
    card: KanbanCard | null;
    accent: string;
    isLink: (content: string) => boolean;
    getYouTubeId: (url: string) => string | null;
}>();

const emit = defineEmits<{
    (e: 'close'): void;
}>();

function handleClose() {
    emit('close');
}
</script>

<template>
    <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <div v-if="card" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 text-left">
            <!-- Backdrop -->
            <div class="absolute inset-0 bg-surface-900/40 backdrop-blur-sm" @click="handleClose"></div>

            <!-- Modal Content -->
            <Transition enter-active-class="transition duration-300 ease-out"
                enter-from-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
                enter-to-class="opacity-100 scale-100 translate-y-0"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="opacity-100 scale-100 translate-y-0"
                leave-to-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0">
                <div v-if="card"
                    class="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
                    <!-- Modal Header -->
                    <div class="relative overflow-hidden shrink-0">
                        <div :class="['absolute inset-0 opacity-90 bg-gradient-to-r', accent]"></div>
                        <div class="relative px-6 py-5 flex items-center justify-between gap-4">
                            <h3 class="text-xl font-bold text-white leading-snug">
                                {{ card.title || 'Untitled' }}
                            </h3>
                            <button @click="handleClose"
                                class="w-8 h-8 shrink-0 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur flex items-center justify-center text-white transition-colors">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Modal Body -->
                    <div class="p-6 overflow-y-auto flex-1">
                        <template v-if="card.content">
                            <!-- Link / YouTube -->
                            <template v-if="isLink(card.content)">
                                <div class="flex flex-col gap-5">
                                    <iframe v-if="getYouTubeId(card.content)"
                                        :src="`https://www.youtube.com/embed/${getYouTubeId(card.content)}`"
                                        class="w-full aspect-video rounded-xl shadow-md border border-surface-200"
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen></iframe>
                                </div>
                            </template>
                            <!-- Text content -->
                            <template v-else>
                                <div class="text-surface-700 whitespace-pre-wrap leading-relaxed">
                                    {{ card.content }}
                                </div>
                            </template>
                        </template>
                        <template v-else>
                            <div class="flex flex-col items-center justify-center py-12 text-center">
                                <div
                                    class="w-16 h-16 rounded-full bg-surface-100 flex items-center justify-center mb-4">
                                    <svg class="w-8 h-8 text-surface-400" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <p class="text-surface-500 font-medium">No additional details provided.</p>
                            </div>
                        </template>
                    </div>
                </div>
            </Transition>
        </div>
    </Transition>
</template>
