<script setup>
import { ref, computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
import AppFABs from '@/components/shared/AppFABs.vue'
import PostingChoiceModal from '@/components/modals/PostingChoiceModal.vue'
import PrivateChatWindow from '@/components/chat/PrivateChatWindow.vue'
import ChatWindow from '@/components/chat/ChatWindow.vue'
import RightSidebarAd from '@/components/common/RightSidebarAd.vue'

import {
  Plus as PlusIcon,
  Sparkles as SparklesIcon,
  MessageCircle as MessageCircleIcon,
  Bot as BotIcon,
  X as XIcon,
} from 'lucide-vue-next'

const route = useRoute()
const isSearchPage = computed(() => route.name === 'search')

const isMobileMenuOpen = ref(false)
const isPostingModalOpen = ref(false)
const isPrivateChatOpen = ref(false)
const isAiChatOpen = ref(false)
const isMobileActionMenuOpen = ref(false)

// 🟢 優化後的圖片網址：w=1280 (寬度縮小), q=60 (品質壓縮), auto=format (自動轉 webp)
// 以前的背景圖片邏輯移除，改為純淨背景
// const backgroundImages = [...]
// const currentBgImage = ref(...)

// ... 其他函式保持不變
const handleOpenPosting = () => {
  isPostingModalOpen.value = true
  isMobileActionMenuOpen.value = false
}
const handleSelectDiscussion = () => {
  isPostingModalOpen.value = false
}
const handleSelectFindTraveler = () => {
  isPostingModalOpen.value = false
}
const handleQuickAction = () => {
  alert('抽卡功能開發中')
  isMobileActionMenuOpen.value = false
}
const handleTogglePrivateChat = () => {
  isPrivateChatOpen.value = !isPrivateChatOpen.value
  isAiChatOpen.value = false
  isMobileActionMenuOpen.value = false
}
const handleToggleAiChat = () => {
  isAiChatOpen.value = !isAiChatOpen.value
  isPrivateChatOpen.value = false
  isMobileActionMenuOpen.value = false
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 relative">
    <AppHeader @toggle-mobile-menu="isMobileMenuOpen = !isMobileMenuOpen" />

    <div class="flex pt-16 md:pt-18 min-h-screen overflow-x-hidden">
      <AppSidebar @open-mobile-actions="isMobileActionMenuOpen = true" />

      <main
        class="lg:ml-[280px] w-full min-w-0 flex flex-col lg:flex-row items-start transition-all duration-300"
        :class="[isSearchPage ? 'pb-0 gap-6' : 'pb-24 md:pb-20 p-4 md:p-0 max-w-7xl mx-auto gap-6']"
      >
        <div
          class="w-full min-w-0 transition-all duration-300"
          :class="!route.meta.hideAd ? 'lg:w-[calc(100%-320px)]' : 'w-full'"
        >
          <RouterView />
        </div>

        <div
          v-if="!route.meta.hideAd"
          class="hidden lg:block w-[300px] shrink-0 mr-[10px]"
          :class="{ 'mt-6': !isSearchPage }"
        >
          <RightSidebarAd />
        </div>
      </main>
    </div>

    <div class="hidden lg:block">
      <AppFABs
        @open-posting="handleOpenPosting"
        @quick-action="handleQuickAction"
        @toggle-private-chat="handleTogglePrivateChat"
        @toggle-ai-chat="handleToggleAiChat"
      />
    </div>

    <Transition name="slide-up">
      <div
        v-if="isMobileActionMenuOpen"
        class="fixed inset-0 z-[60] flex items-end justify-center lg:hidden"
      >
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="isMobileActionMenuOpen = false"
        ></div>
          <div class="relative w-full bg-white rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] p-6 pb-24 animate-slide-up">
            <div class="flex justify-between items-center mb-6 pb-2">
              <h3 class="text-xl font-bold text-slate-800">快速功能</h3>
            <button
              @click="isMobileActionMenuOpen = false"
              class="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <XIcon class="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div class="grid grid-cols-4 gap-4">
            <button class="flex flex-col items-center gap-2 group" @click="handleOpenPosting">
              <div
                class="w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full shadow-lg shadow-primary-200 flex items-center justify-center group-active:scale-95 transition-all duration-300"
              >
                <PlusIcon class="w-7 h-7 text-white" />
              </div>
              <span class="text-xs font-semibold text-slate-600">發布</span>
            </button>
            <button class="flex flex-col items-center gap-2 group" @click="handleQuickAction">
              <div
                class="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full shadow-lg shadow-amber-200 flex items-center justify-center group-active:scale-95 transition-all duration-300"
              >
                <SparklesIcon class="w-7 h-7 text-white" />
              </div>
              <span class="text-xs font-semibold text-slate-600">抽卡</span>
            </button>
            <button class="flex flex-col items-center gap-2 group" @click="handleTogglePrivateChat">
              <div
                class="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full shadow-lg shadow-emerald-200 flex items-center justify-center group-active:scale-95 transition-all duration-300"
              >
                <MessageCircleIcon class="w-7 h-7 text-white" />
              </div>
              <span class="text-xs font-semibold text-slate-600">聊天</span>
            </button>
            <button class="flex flex-col items-center gap-2 group" @click="handleToggleAiChat">
              <div
                class="w-14 h-14 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full shadow-lg shadow-indigo-200 flex items-center justify-center group-active:scale-95 transition-all duration-300"
              >
                <BotIcon class="w-7 h-7 text-white" />
              </div>
              <span class="text-xs font-semibold text-slate-600">AI</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <PostingChoiceModal
      v-if="isPostingModalOpen"
      @close="isPostingModalOpen = false"
      @select-discussion="handleSelectDiscussion"
      @select-find-traveler="handleSelectFindTraveler"
    />
    <PrivateChatWindow v-if="isPrivateChatOpen" @close="isPrivateChatOpen = false" />
    <ChatWindow v-if="isAiChatOpen" @close="isAiChatOpen = false" />
  </div>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>
