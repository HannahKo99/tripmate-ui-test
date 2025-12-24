<script setup>
import { ref } from 'vue'
import {
  Calendar as CalendarIcon,
  FolderOpen as FolderIcon,
  Plus as PlusIcon,
  Briefcase as BriefcaseIcon,
} from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'
import ItineraryDetailModal from '@/components/modals/ItineraryDetailModal.vue'

const userStore = useUserStore()

const isDetailModalOpen = ref(false)
const selectedItinerary = ref(null)

// 開啟行程詳情 (編輯)
const openItineraryDetail = (itinerary) => {
  selectedItinerary.value = JSON.parse(JSON.stringify(itinerary))
  isDetailModalOpen.value = true
}

// 開啟新增行程 (空白)
const openAddItineraryModal = () => {
  selectedItinerary.value = {
    id: Date.now(),
    title: '',
    startDate: '',
    endDate: '',
    status: 'planning',
    days: [{ day: 1, date: 'Day 1', activities: [] }],
    packingList: [
      { category: '證件', items: [] },
      { category: '衣物', items: [] },
      { category: '電子產品', items: [] },
    ],
  }
  isDetailModalOpen.value = true
}

// 開啟草稿
const openDraft = (draft) => {
  if (draft.type === 'my_itinerary' && draft.data) {
    selectedItinerary.value = JSON.parse(JSON.stringify(draft.data))
    isDetailModalOpen.value = true
  } else {
    alert(`這是 ${draft.typeLabel} 的草稿，請至對應區塊編輯。`)
  }
}

// 處理「暫存草稿」
const handleSaveDraft = (draftItinerary) => {
  const draftItem = {
    id: draftItinerary.id,
    type: 'my_itinerary',
    typeLabel: '我的行程',
    saveTime: new Date().toLocaleString('zh-TW', {
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }),
    title: draftItinerary.title || '未命名行程',
    content: `日期: ${draftItinerary.startDate || '未定'} | 天數: ${draftItinerary.days.length} 天`,
    data: draftItinerary,
  }

  const existingIndex = userStore.drafts.findIndex((d) => d.id === draftItem.id)
  if (existingIndex !== -1) {
    userStore.drafts[existingIndex] = draftItem
  } else {
    userStore.drafts.unshift(draftItem)
  }

  isDetailModalOpen.value = false
}

// 處理儲存 (發布/更新行程)
const handleSaveItinerary = (updatedItinerary) => {
  if (!updatedItinerary.title.trim()) updatedItinerary.title = '新旅程'

  const index = userStore.myItineraries.findIndex((i) => i.id === updatedItinerary.id)

  if (index !== -1) {
    userStore.myItineraries[index] = updatedItinerary
  } else {
    userStore.myItineraries.push(updatedItinerary)
  }

  // 從草稿夾移除
  const draftIndex = userStore.drafts.findIndex((d) => d.id === updatedItinerary.id)
  if (draftIndex !== -1) {
    userStore.drafts.splice(draftIndex, 1)
  }

  isDetailModalOpen.value = false
}

const handleDeleteItinerary = (id) => {
  userStore.deleteItinerary(id)
  const draftIndex = userStore.drafts.findIndex((d) => d.id === id)
  if (draftIndex !== -1) {
    userStore.drafts.splice(draftIndex, 1)
  }
  isDetailModalOpen.value = false
}

// 🟢 修改：顏色對照表
const getTagColor = (type) => {
  if (type === 'discussion') return 'bg-secondary-100 text-secondary-700 border-secondary-200' 
  if (type === 'traveler') return 'bg-info-100 text-info-700 border-info-200'
  if (type === 'my_itinerary') return 'bg-primary-100 text-primary-700 border-primary-200' 
  return 'bg-slate-100 text-slate-700'
}
</script>

<template>
  <div class="p-4 md:p-0">
    <div class="mb-8 mt-4 flex items-center justify-between">
      <h1 class="text-3xl font-bold text-slate-800 flex items-center gap-3">
        <div class="p-2 bg-primary-100 rounded-2xl">
          <BriefcaseIcon class="w-8 h-8 text-primary-600" />
        </div>
        我的行程
      </h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
      
      <!-- 左側：行程列表 -->
      <div
        class="lg:col-start-1 lg:row-start-2 bg-white rounded-3xl p-6 shadow-soft border border-slate-100"
      >
        <div class="flex items-center mb-6 pb-4 border-b border-slate-100">
          <div class="bg-primary-50 p-2.5 rounded-xl mr-4">
            <CalendarIcon class="w-6 h-6 text-primary-500" />
          </div>
          <div>
            <h3 class="text-xl font-bold text-slate-800">行程列表</h3>
            <p class="text-sm text-slate-400">查看並管理你的旅遊行程</p>
          </div>
        </div>

        <div class="space-y-4">
          <div
            v-for="item in userStore.myItineraries"
            :key="item.id"
            class="border border-slate-200 rounded-2xl p-5 hover:border-primary-400 hover:shadow-soft transition cursor-pointer group bg-white"
            @click="openItineraryDetail(item)"
          >
            <div class="flex justify-between items-center">
              <div>
                <h4 class="font-bold text-lg text-slate-800 group-hover:text-primary-600 transition mb-2">
                  {{ item.title }}
                </h4>
                <div class="flex items-center text-sm text-slate-500">
                  <span class="bg-slate-100 px-2.5 py-1 rounded-lg text-xs mr-3 font-medium text-slate-600"
                    >日期</span
                  >
                  {{ item.startDate }} - {{ item.endDate }}
                </div>
              </div>
              <div class="text-slate-300 group-hover:text-primary-400 transition transform group-hover:translate-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <button
          class="w-full mt-8 bg-primary-500 text-white font-bold py-3.5 rounded-2xl hover:bg-primary-600 transition flex items-center justify-center shadow-lg shadow-primary-500/30 active:scale-[0.98]"
          @click="openAddItineraryModal"
        >
          <PlusIcon class="w-5 h-5 mr-2" />
          新增行程
        </button>
      </div>

      <!-- 右側：草稿夾 -->
      <div class="lg:col-start-2 lg:row-start-2 bg-white rounded-3xl p-6 shadow-soft border border-slate-100">
        <div class="flex items-center mb-6">
          <div class="bg-warning-50 p-2.5 rounded-xl mr-3">
            <FolderIcon class="w-5 h-5 text-warning-500" />
          </div>
          <div>
            <h3 class="text-lg font-bold text-slate-800">草稿夾</h3>
            <p class="text-xs text-slate-400">查看你儲存的貼文草稿</p>
          </div>
        </div>

        <div class="space-y-3">
          <div
            v-for="draft in userStore.drafts"
            :key="draft.id"
            class="border border-slate-100 rounded-2xl p-4 hover:shadow-md transition bg-slate-50/50 hover:bg-white cursor-pointer group"
            @click="openDraft(draft)"
          >
            <div class="flex justify-between items-center mb-2">
              <span
                :class="[
                  getTagColor(draft.type),
                  'text-[10px] px-2 py-0.5 rounded-full border font-bold',
                ]"
              >
                {{ draft.typeLabel }}
              </span>
              <span class="text-[10px] text-slate-400"
                >儲存於: {{ draft.saveTime.split(' ')[0] }}</span
              >
            </div>
            <h4 class="font-bold text-sm text-slate-700 mb-1 line-clamp-1 group-hover:text-primary-600 transition">{{ draft.title }}</h4>
            <p class="text-xs text-slate-500 line-clamp-2">{{ draft.content }}</p>
          </div>
        </div>
      </div>
    </div>

    <ItineraryDetailModal
      v-if="isDetailModalOpen"
      :itinerary="selectedItinerary"
      @close="isDetailModalOpen = false"
      @save="handleSaveItinerary"
      @save-draft="handleSaveDraft"
      @delete="handleDeleteItinerary"
    />
  </div>
</template>
