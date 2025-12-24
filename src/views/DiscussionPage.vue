<script setup>
import { ref } from 'vue'
import {
  Plus as PlusIcon,
  Heart as HeartIcon,
  MessageCircle as MessageCircleIcon,
  Repeat2 as Repeat2Icon,
} from 'lucide-vue-next'
import { useDiscussionsStore } from '@/stores/discussions'

// 引入組件
import PostingChoiceModal from '@/components/modals/PostingChoiceModal.vue'
import PostDetailModal from '@/components/modals/PostDetailModal.vue'
import ShareModal from '@/components/modals/ShareModal.vue'

const discussionsStore = useDiscussionsStore()

// --- 模態框狀態管理 ---
const isPostingModalOpen = ref(false)
const isDetailModalOpen = ref(false)
const isShareModalOpen = ref(false)

const selectedPost = ref(null)
const shareLink = ref('')
const shouldScrollToComments = ref(false)

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

const openShareModal = (postId) => {
  shareLink.value = `/post/${postId}`
  isShareModalOpen.value = true
}

const closeShareModal = () => {
  isShareModalOpen.value = false
  shareLink.value = ''
}

// --- 篩選/搜尋狀態 ---
const filterOptions = ref(['全部', '有圖', '新貼文', '找旅伴', '找話題'])
const activeFilter = ref('全部')
</script>

<template>
  <div class="p-4 md:p-0 overflow-x-hidden">
    <div class="w-full">
      <div class="mb-8 mt-4 flex items-center justify-between">
        <h1 class="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <div class="p-2 bg-secondary-100 rounded-2xl">
            <MessageCircleIcon class="w-8 h-8 text-secondary-600" />
          </div>
          討論區
        </h1>
        <button
          class="bg-gradient-to-r from-secondary-400 to-secondary-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-secondary-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
          @click="isPostingModalOpen = true"
        >
          <PlusIcon class="w-5 h-5" />
          新增話題
        </button>
      </div>

      <div class="mb-8 p-1 overflow-x-auto">
        <div class="flex flex-wrap gap-3 text-sm">
          <button
            v-for="filter in filterOptions"
            :key="filter"
            :class="[
              'px-5 py-2 rounded-full font-semibold transition-all duration-300',
              activeFilter === filter
                ? 'bg-secondary-500 text-white shadow-lg shadow-secondary-200'
                : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200',
            ]"
            @click="activeFilter = filter"
          >
            {{ filter }}
          </button>
        </div>
      </div>

      <div class="space-y-6">
        <div
          v-for="post in discussionsStore.discussions"
          :key="post.id"
          class="card bg-white p-6 transition-all duration-300 hover:shadow-soft-lg group border border-slate-100 rounded-3xl"
        >
          <div class="flex items-center space-x-3 mb-4">
            <img
              :src="post.avatar"
              class="w-12 h-12 rounded-full object-cover border border-slate-100 shadow-sm"
            />
            <div>
              <div class="flex items-center space-x-2">
                <span class="font-bold text-slate-800 text-lg">{{ post.author }}</span>
                <span
                  class="text-xs font-bold text-secondary-600 bg-secondary-50 px-3 py-1 rounded-full"
                >
                  {{ post.spiritAnimal }}
                </span>
              </div>
              <div class="text-xs text-slate-400 mt-1">{{ post.time }} • 討論區</div>
            </div>
          </div>

          <h3
            class="text-xl font-bold text-slate-900 mb-3 cursor-pointer hover:text-secondary-600 transition-colors"
            @click="openPostDetailModal(post, false)"
          >
            {{ post.title }}
          </h3>

          <p class="text-slate-600 text-base mb-5 line-clamp-3 leading-relaxed">
            {{ post.content }}
          </p>

          <div class="w-full h-72 rounded-2xl overflow-hidden mb-5 shadow-sm">
            <img
              :src="post.image"
              class="w-full h-full object-cover hover:scale-105 transition duration-700"
            />
          </div>

          <div
            v-if="post.tags && post.tags.length"
            class="flex flex-wrap gap-2 mb-5 border-b border-slate-50 pb-4"
          >
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full cursor-pointer hover:bg-slate-200 transition"
            >
              #{{ tag }}
            </span>
          </div>

          <div class="flex items-center text-slate-400 text-sm">
            <button class="flex items-center space-x-2 hover:text-accent-500 transition mr-6 group/btn">
              <HeartIcon class="w-5 h-5 group-hover/btn:scale-110 transition" /> <span>{{ post.likes }}</span>
            </button>

            <button
              class="flex items-center space-x-2 hover:text-secondary-600 transition mr-6 group/btn"
              @click="openPostDetailModal(post, true)"
            >
              <MessageCircleIcon class="w-5 h-5 group-hover/btn:scale-110 transition" /> <span>{{ post.comments }}</span>
            </button>

            <button class="flex items-center space-x-2 hover:text-warning-500 transition mr-6 group/btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 group-hover/btn:scale-110 transition"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>

            <button
              class="ml-auto flex items-center space-x-2 hover:text-slate-600 transition p-2 hover:bg-slate-50 rounded-full"
              @click="openShareModal(post.id)"
            >
              <Repeat2Icon class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <PostingChoiceModal v-if="isPostingModalOpen" @close="isPostingModalOpen = false" />
  <PostDetailModal
    v-if="isDetailModalOpen"
    :post="selectedPost"
    :scroll-to-comments="shouldScrollToComments"
    @close="closePostDetailModal"
  />
  <ShareModal v-if="isShareModalOpen" :post-link="shareLink" @close="closeShareModal" />
</template>
