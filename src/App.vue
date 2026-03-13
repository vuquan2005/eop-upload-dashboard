<script setup lang="ts">
import { computed, ref } from 'vue';
import rawEopMarkdown from '../EOP.md?raw';
import KanbanBoard from './components/KanbanBoard.vue';
import { parseMarkdownToKanban } from './utils/parseKanban';
import type { KanbanColumn } from './types/kanban';
import eopInfo from '../EOP.json';

const kanbanColumns = computed<KanbanColumn[]>(() => parseMarkdownToKanban(rawEopMarkdown));

const avatarError = ref(false);

const studentName = eopInfo.student.name;
const studentId = eopInfo.student.id;
const studentClass = eopInfo.student.class;
const courseTitle = eopInfo.course.title;
</script>

<template>
    <div class="min-h-screen bg-[url('/background.png')] bg-cover bg-center bg-fixed bg-no-repeat">
        <!-- Decorative background blobs -->
        <div class="fixed inset-0 overflow-hidden pointer-events-none">
            <div class="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl"></div>
            <div class="absolute top-1/2 -left-20 w-60 h-60 bg-emerald-500/8 rounded-full blur-3xl"></div>
            <div class="absolute -bottom-20 right-1/3 w-72 h-72 bg-rose-500/8 rounded-full blur-3xl"></div>
        </div>

        <main class="relative z-10 flex flex-col min-h-screen px-6 pt-4 pb-0 font-sans">
            <!-- Header bar with avatar, centered course title and info -->
            <header
                class="mb-4 px-4 py-3 rounded-2xl bg-white/30 backdrop-blur border border-surface-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">

                <div class="flex items-center gap-3 min-w-0 w-full md:w-auto">
                    <div v-if="!avatarError" class="shrink-0">
                        <img src="/avatar.png" :alt="`Avatar ${studentName}`"
                            class="w-12 h-12 rounded-full object-cover border-2 border-primary-500 shadow-md"
                            @error="avatarError = true" />
                    </div>
                    <div v-else
                        class="w-12 h-12 rounded-full border-2 border-primary-500 shadow-md shrink-0 bg-gradient-to-br from-primary-500 to-emerald-500 flex items-center justify-center text-white font-semibold text-sm">
                        {{ studentName.split(' ').slice(-1)[0]?.[0] ?? 'A' }}
                    </div>
                    <div class="flex flex-col min-w-0">
                        <h1
                            class="text-base md:text-lg font-semibold bg-gradient-to-r from-surface-900 to-surface-600 bg-clip-text text-transparent tracking-tight truncate">
                            {{ studentName }}
                        </h1>
                        <span class="text-xs sm:text-sm text-surface-500">MSV: {{ studentId }}</span>
                    </div>
                </div>

                <div class="flex-1 text-center w-full md:w-auto">
                    <p
                        class="text-lg sm:text-2xl font-semibold uppercase tracking-wide text-primary-600 leading-snug">
                        {{ courseTitle }}
                    </p>
                </div>

                <div v-if="studentClass" class="flex flex-col items-center md:items-end text-xs sm:text-sm text-surface-600 w-full md:w-auto">
                    <span
                        class="font-medium bg-surface-100/50 px-3 py-1 rounded-full md:bg-transparent md:px-0 md:py-0">
                        Lớp: {{ studentClass }}
                    </span>
                </div>
            </header>

            <!-- Kanban Board component -->
            <KanbanBoard :columns="kanbanColumns" />
        </main>
    </div>
</template>
