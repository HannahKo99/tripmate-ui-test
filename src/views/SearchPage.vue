<template>
  <div class="min-h-screen bg-warning-50 flex flex-col pb-24 lg:pb-0">
    <div class="sticky top-0 z-30 bg-warning-50/90 backdrop-blur-sm shadow-sm border-b border-warning-200 p-4">
      <div class="w-full">
        <div class="flex items-center gap-3 mb-4">
          <button
            class="p-2 -ml-2 hover:bg-gray-200 rounded-full transition text-gray-600 md:hidden"
            @click="router.back()"
          >
            <ChevronLeftIcon class="w-6 h-6" />
          </button>

          <div class="relative flex-1">
            <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              placeholder="搜尋關鍵字..."
              class="w-full pl-10 pr-10 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-accent-400 focus:ring-2 focus:ring-accent-100 outline-none transition text-base"
              @keyup.enter="performSearch"
            />
            <button
              v-if="searchQuery"
              class="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
              @click="clearSearch"
            >
              <XIcon class="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <button
            class="hidden md:block px-6 py-2.5 bg-accent-500 text-white font-bold rounded-xl hover:bg-accent-600 transition shadow-[2px_2px_0px_0px_rgba(255,106,80,0.5)] active:shadow-none active:translate-y-[2px]"
            @click="performSearch"
          >
            搜尋
          </button>
        </div>

        <div class="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar mb-2">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            :class="[
              'px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition border-2',
              activeTab === tab.value
                ? 'bg-gray-800 text-white border-gray-800 shadow-[2px_2px_0px_0px_rgba(255,106,80,1)]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:bg-gray-50',
            ]"
            @click="activeTab = tab.value"
          >
            {{ tab.label }}
          </button>
        </div>

        <div
          v-if="currentSubFilters.length > 0"
          class="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-2 border-t border-warning-200"
        >
          <button
            v-for="filter in currentSubFilters"
            :key="filter"
            :class="[
              'px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition border',
              activeSubFilter === filter
                ? 'bg-accent-100 text-accent-700 border-accent-300'
                : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50',
            ]"
            @click="activeSubFilter = filter"
          >
            {{ filter }}
          </button>
        </div>
      </div>
    </div>

    <div class="flex-1 w-full p-4 overflow-x-hidden">
      <div class="w-full min-w-0">
        <div
          v-if="!hasSearched"
          class="flex flex-col items-center justify-center mt-20 text-gray-400 space-y-4"
        >
          <div class="bg-gray-100 p-6 rounded-full animate-bounce-slow">
            <SearchIcon class="w-12 h-12 text-gray-300" />
          </div>
          <p>輸入關鍵字來尋找旅伴或靈感吧！</p>

          <div class="flex flex-wrap justify-center gap-2 mt-4 max-w-xs">
            <span
              v-for="tag in ['#東京獨旅', '#京都賞楓', '#環島', '#美食']"
              :key="tag"
              class="px-3 py-1 bg-gray-100 text-xs text-gray-600 rounded-full cursor-pointer hover:bg-accent-100 hover:text-accent-600 transition"
              @click="quickSearch(tag.replace('#', ''))"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <div v-else-if="filteredResults.length === 0" class="text-center mt-20 text-gray-500">
          <p class="text-lg">
            找不到與「<span class="text-accent-600 font-bold">{{ searchQuery }}</span
            >」相關的結果
          </p>
          <p class="text-sm mt-2">試試看切換其他分類，或使用更通用的關鍵字。</p>
        </div>

        <div v-else class="space-y-4">
          <p class="text-sm text-gray-500 mb-2 ml-1">
            在 <span class="font-bold text-gray-700">{{ getTabLabel(activeTab) }}</span>
            <span v-if="activeSubFilter !== '全部'"> ({{ activeSubFilter }}) </span>
            中找到 {{ filteredResults.length }} 筆結果
          </p>

          <div
            v-for="item in paginatedResults"
            :key="`${item.type}-${item.id}`"
            class="bg-white p-4 rounded-xl border-2 border-gray-100 hover:border-accent-300 hover:shadow-md transition cursor-pointer flex gap-4 group"
            @click="handleResultClick(item)"
          >
            <div v-if="item.type === 'traveler'" class="w-16 h-16 shrink-0">
              <img
                :src="item.avatar"
                class="w-full h-full object-cover rounded-full border-2 border-gray-200 group-hover:border-accent-200 transition"
              />
            </div>
            <div
              v-else
              class="w-24 h-24 shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-100"
            >
              <img
                v-if="item.image"
                :src="item.image"
                class="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-300">
                <ImageIcon class="w-8 h-8" />
              </div>
            </div>

            <div class="flex flex-col justify-center min-w-0 flex-1">
              <div class="flex items-center gap-2 mb-1.5">
                <span
                  class="text-[10px] px-2 py-0.5 rounded border font-bold"
                  :class="getCategoryStyle(item.type)"
                >
                  {{ getCategoryLabel(item.type) }}
                </span>
                <span class="text-xs text-gray-400">{{ item.date }}</span>
              </div>

              <h3
                class="font-bold text-gray-800 line-clamp-1 mb-1 group-hover:text-accent-600 transition"
                v-html="highlightText(item.title)"
              ></h3>

              <p
                class="text-xs text-gray-500 line-clamp-2 leading-relaxed"
                v-html="highlightText(item.description)"
              ></p>

              <div v-if="item.tags && item.tags.length > 0" class="mt-2 flex gap-1">
                <span
                  v-for="tag in item.tags.slice(0, 3)"
                  :key="tag"
                  class="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded"
                  v-html="'#' + highlightText(tag)"
                >
                </span>
              </div>
            </div>
          </div>

          <div
            v-if="totalPages > 1"
            class="flex justify-center items-center gap-4 mt-8 pt-4 border-t border-gray-200"
          >
            <button
              class="px-4 py-2 rounded-lg font-bold transition flex items-center gap-1"
              :class="
                currentPage === 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-accent-600'
              "
              :disabled="currentPage === 1"
              @click="changePage(currentPage - 1)"
            >
              <ChevronLeftIcon class="w-5 h-5" />
              上一頁
            </button>

            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-gray-800">
                {{ currentPage }} / {{ totalPages }}
              </span>
            </div>

            <button
              class="px-4 py-2 rounded-lg font-bold transition flex items-center gap-1"
              :class="
                currentPage === totalPages
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-accent-600'
              "
              :disabled="currentPage === totalPages"
              @click="changePage(currentPage + 1)"
            >
              下一頁
              <ChevronRightIcon class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <PostDetailModal v-if="isModalOpen" :post="selectedPost" @close="closePostDetailModal" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  Search as SearchIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  X as XIcon,
  Image as ImageIcon,
} from 'lucide-vue-next'

import { useDiscussionsStore } from '@/stores/discussions'
import { useTravelersStore } from '@/stores/travelers'
import { useItineraryStore } from '@/stores/itinerary'
import PostDetailModal from '@/components/modals/PostDetailModal.vue'

const router = useRouter()
const route = useRoute()

const discussionsStore = useDiscussionsStore()
const travelersStore = useTravelersStore()
const itineraryStore = useItineraryStore()

const isModalOpen = ref(false)
const selectedPost = ref(null)

const searchInput = ref(null)
const searchQuery = ref('')
const hasSearched = ref(false)
const activeTab = ref('all')
const activeSubFilter = ref('全部')

const currentPage = ref(1)
const itemsPerPage = 10

const tabs = [
  { label: '全部', value: 'all' },
  { label: '找旅伴', value: 'traveler' },
  { label: '討論區', value: 'discussion' },
  { label: '精選行程', value: 'itinerary' },
]

const subFilterOptions = {
  all: [],
  traveler: ['全部', '招募中', '已額滿', '單人遊', '團體遊'],
  discussion: ['全部', '有圖', '新貼文', '找旅伴', '找話題'],
  itinerary: ['全部', '旅行社精選', '導遊推薦', '短天數(1-5日)', '長天數(6日以上)', '亞洲'],
}

const currentSubFilters = computed(() => {
  return subFilterOptions[activeTab.value] || []
})

watch([activeTab, activeSubFilter], () => {
  currentPage.value = 1
  if (activeTab.value) activeSubFilter.value = '全部'
})

const allData = computed(() => {
  const results = []
  if (discussionsStore.discussions) {
    discussionsStore.discussions.forEach((post) => {
      results.push({
        id: post.id,
        type: 'discussion',
        title: post.title,
        description: post.content,
        image: post.image,
        date: post.time || '剛剛',
        tags: post.tags || [],
        originalData: post,
      })
    })
  }
  if (travelersStore.recommendations) {
    travelersStore.recommendations.forEach((traveler) => {
      results.push({
        id: traveler.id,
        type: 'traveler',
        title: traveler.title,
        description: traveler.content || `地點：${traveler.location}`,
        avatar: traveler.avatar || traveler.image,
        date: traveler.date || '近期',
        tags: traveler.tag ? [traveler.tag] : [],
        originalData: traveler,
      })
    })
  }
  if (itineraryStore.itineraries) {
    itineraryStore.itineraries.forEach((plan) => {
      results.push({
        id: plan.id,
        type: 'itinerary',
        title: plan.title,
        description: plan.description || '精彩的旅程規劃',
        image: plan.coverImage || plan.image,
        date: plan.date || '隨時出發',
        tags: plan.tags || [],
        originalData: plan,
      })
    })
  }
  return results
})

// 🟢 Highlighting 輔助函式 (標示符合的關鍵字)
// 這會把 "台北" 替換成 <span class="bg-yellow-200...">台北</span>
const highlightText = (text) => {
  if (!text) return ''
  const query = searchQuery.value.trim()
  if (!query) return text

  // 1. 建立比對清單 (包含完整字串 + Bigrams)
  // 目的是讓 "台北美食" 可以 highlight "台北"
  const matchers = [query]
  if (query.length >= 2) {
    for (let i = 0; i < query.length - 1; i++) {
      matchers.push(query.slice(i, i + 2))
    }
  }

  // 2. 依照長度排序 (長詞優先，避免 "台北" 先被 "台" 取代壞掉)
  matchers.sort((a, b) => b.length - a.length)

  // 3. 建立 Regex: (Query|Bigram1|Bigram2)
  // 使用 escape 防止特殊符號讓 Regex 報錯
  const pattern = matchers.map((m) => m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
  const regex = new RegExp(`(${pattern})`, 'gi')

  // 4. 替換文字，加上 highlight class
  return text.replace(
    regex,
    '<span class="bg-warning-200 text-warning-900 font-bold rounded-sm px-0.5">$1</span>',
  )
}

const filteredResults = computed(() => {
  if (!hasSearched.value) return []

  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return []

  // Bigram 邏輯
  const bigrams = []
  if (query.length >= 2) {
    for (let i = 0; i < query.length - 1; i++) {
      bigrams.push(query.slice(i, i + 2))
    }
  }

  let scoredItems = allData.value.map((item) => {
    let score = 0
    const title = item.title ? item.title.toLowerCase() : ''
    const desc = item.description ? item.description.toLowerCase() : ''
    const itemTags = item.tags ? item.tags.map((t) => t.toLowerCase()) : []

    // 權重計分
    if (title.includes(query)) score += 50
    if (itemTags.some((t) => t.includes(query))) score += 30
    if (desc.includes(query)) score += 10

    if (bigrams.length > 0) {
      bigrams.forEach((bg) => {
        if (title.includes(bg)) score += 5
        if (itemTags.some((t) => t.includes(bg))) score += 3
        if (desc.includes(bg)) score += 1
      })
    } else if (query.length === 1) {
      if (title.includes(query)) score += 2
      if (desc.includes(query)) score += 1
    }

    return { ...item, score }
  })

  scoredItems = scoredItems.filter((item) => item.score > 0)

  scoredItems = scoredItems.filter((item) => {
    const matchTab = activeTab.value === 'all' || item.type === activeTab.value

    let matchSubFilter = true
    if (activeSubFilter.value !== '全部') {
      const filter = activeSubFilter.value
      const tagMatch = item.tags && item.tags.some((t) => t.includes(filter))
      const textMatch = (item.title + item.description).includes(filter)

      if (filter === '有圖') matchSubFilter = !!item.image
      else if (filter === '招募中') matchSubFilter = !item.title.includes('額滿')
      else if (filter === '已額滿') matchSubFilter = item.title.includes('額滿')
      else if (filter === '短天數(1-5日)') matchSubFilter = item.description.includes('日')
      else matchSubFilter = tagMatch || textMatch
    }

    return matchTab && matchSubFilter
  })

  return scoredItems.sort((a, b) => b.score - a.score)
})

const totalPages = computed(() => {
  return Math.ceil(filteredResults.value.length / itemsPerPage)
})

const paginatedResults = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredResults.value.slice(start, end)
})

const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  if (route.query.q) {
    searchQuery.value = route.query.q
    performSearch()
  } else {
    searchInput.value?.focus()
  }
})

watch(
  () => route.query.q,
  (newVal) => {
    if (newVal) {
      searchQuery.value = newVal
      performSearch()
    }
  },
)

const performSearch = () => {
  if (!searchQuery.value.trim()) return
  hasSearched.value = true
  currentPage.value = 1
}

const clearSearch = () => {
  searchQuery.value = ''
  hasSearched.value = false
  searchInput.value?.focus()
}

const quickSearch = (keyword) => {
  searchQuery.value = keyword
  performSearch()
}

const getTabLabel = (val) => {
  const tab = tabs.find((t) => t.value === val)
  return tab ? tab.label : '全部'
}
const getCategoryLabel = (type) => {
  const map = { traveler: '找旅伴', discussion: '討論區', itinerary: '行程' }
  return map[type] || '其他'
}
const getCategoryStyle = (type) => {
  const map = {
    traveler: 'bg-info-50 text-info-600 border-info-200',
    discussion: 'bg-secondary-50 text-secondary-600 border-secondary-200',
    itinerary: 'bg-primary-50 text-primary-600 border-primary-200',
  }
  return map[type] || 'bg-gray-50 text-gray-600 border-gray-200'
}

const handleResultClick = (item) => {
  selectedPost.value = item.originalData
  isModalOpen.value = true
}

const closePostDetailModal = () => {
  isModalOpen.value = false
  selectedPost.value = null
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.animate-bounce-slow {
  animation: bounce 2s infinite;
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(-5%);
  }
  50% {
    transform: translateY(0);
  }
}
</style>
