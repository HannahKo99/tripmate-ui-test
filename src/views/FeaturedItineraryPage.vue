<script setup>
import { ref } from 'vue'
import { Map as MapIcon } from 'lucide-vue-next'
import { useItineraryStore } from '@/stores/itinerary'

import ItineraryCard from '@/components/itinerary/ItineraryCard.vue'
import ShareModal from '@/components/modals/ShareModal.vue'
import PostDetailModal from '@/components/modals/PostDetailModal.vue'

const itinerariesStore = useItineraryStore()

// --- 模態框狀態管理 ---
const isDetailModalOpen = ref(false)
const isShareModalOpen = ref(false)

const selectedPost = ref(null)
const shareLink = ref('')
const shouldScrollToComments = ref(false)

// 篩選狀態
const filterOptions = ref([
  '全部',
  '旅行社精選',
  '導遊推薦',
  '短天數(1-5日)',
  '長天數(6日以上)',
  '亞洲',
])
const activeFilter = ref('全部')

// 處理開啟詳情彈窗
const openPostDetailModal = (post, focusComment = false) => {
  selectedPost.value = post
  shouldScrollToComments.value = focusComment
  isDetailModalOpen.value = true
}

const closePostDetailModal = () => {
  isDetailModalOpen.value = false
  selectedPost.value = null
  shouldScrollToComments.value = false
}

// 處理開啟分享模態框
const openShareModal = (itineraryId) => {
  shareLink.value = `/itinerary/${itineraryId}`
  isShareModalOpen.value = true
}

const closeShareModal = () => {
  isShareModalOpen.value = false
  shareLink.value = ''
}
</script>

<template>
  <div class="p-4 md:p-0 overflow-x-hidden">
    <div class="w-full">
      <div class="mb-8 mt-4 flex items-center justify-between">
        <h1 class="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <div class="p-2 bg-accent-100 rounded-2xl">
            <MapIcon class="w-8 h-8 text-accent-600" />
          </div>
          精選行程
        </h1>
      </div>

      <div class="mb-8 p-1 overflow-x-auto">
        <div class="flex flex-wrap gap-3 text-sm">
          <button
            v-for="filter in filterOptions"
            :key="filter"
            :class="[
              'px-5 py-2 rounded-full font-semibold transition-all duration-300',
              activeFilter === filter
                ? 'bg-accent-500 text-white shadow-lg shadow-accent-200'
                : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200',
            ]"
            @click="activeFilter = filter"
          >
            {{ filter }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <ItineraryCard
          v-for="itinerary in itinerariesStore.itineraries"
          :key="itinerary.id"
          :itinerary="itinerary"
          @open-detail="openPostDetailModal"
          @open-share="openShareModal"
        />
      </div>
    </div>
  </div>

  <PostDetailModal
    v-if="isDetailModalOpen"
    :post="selectedPost"
    :scroll-to-comments="shouldScrollToComments"
    @close="closePostDetailModal"
  />

  <ShareModal v-if="isShareModalOpen" :share-link="shareLink" @close="closeShareModal" />
</template>
