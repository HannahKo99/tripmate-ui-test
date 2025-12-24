<script setup>
import {
  Bot as BotIcon,
  MessageSquare as MessageSquareIcon,
  Plus as PlusIcon,
  Zap as ZapIcon,
} from 'lucide-vue-next'

// 定義我們要通知父層(MainLayout)的事件名稱
defineEmits(['open-posting', 'quick-action', 'toggle-private-chat', 'toggle-ai-chat'])
</script>

<template>
  <div
    class="fixed bottom-6 right-6 flex flex-col space-y-4 z-50"
  >
    <button
      @click="$emit('open-posting')"
      class="w-14 h-14 bg-gradient-to-br from-secondary-400 to-secondary-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-secondary-200 hover:scale-110 hover:shadow-xl transition-all duration-300"
      title="發布新貼文"
    >
      <PlusIcon class="w-7 h-7" />
    </button>

    <button
      @click="$emit('quick-action')"
      class="w-12 h-12 bg-white text-secondary-500 rounded-full flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-all duration-300 border border-slate-100"
      title="快速行動"
    >
      <ZapIcon class="w-6 h-6" />
    </button>

    <button
      @click="$emit('toggle-private-chat')"
      class="w-12 h-12 bg-white text-primary-500 rounded-full flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-all duration-300 border border-slate-100"
      title="私人訊息"
    >
      <MessageSquareIcon class="w-6 h-6" />
    </button>

    <button
      @click="$emit('toggle-ai-chat')"
      class="w-12 h-12 bg-white text-slate-800 rounded-full flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-all duration-300 border border-slate-100"
      title="TripMate 助手"
    >
      <BotIcon class="w-6 h-6" />
    </button>
  </div>
</template>


