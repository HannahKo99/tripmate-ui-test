<script setup>
import PostDetailModal from '@/components/modals/PostDetailModal.vue'
import ShareModal from '@/components/modals/ShareModal.vue'
import { useDiscussionsStore } from '@/stores/discussions'
import { useTravelersStore } from '@/stores/travelers'
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Heart as HeartIcon,
  MessageCircle as MessageCircleIcon,
  Repeat2 as Repeat2Icon,
  Users as UsersIcon,
} from 'lucide-vue-next'
import { ref } from 'vue'

const discussionsStore = useDiscussionsStore()
const travelersStore = useTravelersStore()
const scrollContainer = ref(null)

const isModalOpen = ref(false)
const selectedPost = ref(null)
const shouldScrollToComments = ref(false)

const scroll = (direction) => {
  if (scrollContainer.value) {
    const scrollAmount = 260
    scrollContainer.value.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }
}

const openPostDetailModal = (post, focusComment = false) => {
  selectedPost.value = post
  shouldScrollToComments.value = focusComment
  isModalOpen.value = true
}

const closePostDetailModal = () => {
  isModalOpen.value = false
  selectedPost.value = null
  shouldScrollToComments.value = false
}

const isShareModalOpen = ref(false)
const shareLink = ref('')

const openShareModal = (postId) => {
  shareLink.value = `https://tripmate.com/post/${postId}`
  isShareModalOpen.value = true
}

const closeShareModal = () => {
  isShareModalOpen.value = false
  shareLink.value = ''
}

// 根據標籤文字自動產生固定顏色
const getTagColor = (tagText) => {
  const colors = [
    'bg-accent-500 border-accent-400',
    'bg-warning-500 border-warning-400',
    'bg-primary-500 border-primary-400',
    'bg-secondary-500 border-secondary-400',
    'bg-info-500 border-info-400',
    'bg-emerald-500 border-emerald-400',
    'bg-teal-500 border-teal-400',
    'bg-cyan-500 border-cyan-400',
    'bg-sky-500 border-sky-400',
    'bg-indigo-500 border-indigo-400',
    'bg-violet-500 border-violet-400',
    'bg-fuchsia-500 border-fuchsia-400',
    'bg-pink-500 border-pink-400',
    'bg-rose-500 border-rose-400',
  ]

  if (!tagText) return colors[0]

  let hash = 0
  for (let i = 0; i < tagText.length; i++) {
    hash = tagText.charCodeAt(i) + ((hash << 5) - hash)
  }

  const index = Math.abs(hash) % colors.length
  return colors[index]
}
</script>

<template>
  <div class="overflow-x-hidden">
    <div class="w-full min-w-0">
      <div class="mb-10 relative group">
        <div class="mb-6 mt-4 flex items-center justify-between">
          <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <span class="w-2 h-8 bg-primary-500 rounded-full"></span>
            旅伴推薦
          </h2>
        </div>

        <button
          class="absolute left-2 top-[60%] -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-slate-700 p-3 rounded-full shadow-soft backdrop-blur-md transition hover:scale-105 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300"
          @click="scroll('left')"
        >
          <ChevronLeftIcon class="w-6 h-6" />
        </button>

        <button
          class="absolute right-2 top-[60%] -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-slate-700 p-3 rounded-full shadow-soft backdrop-blur-md transition hover:scale-105 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300"
          @click="scroll('right')"
        >
          <ChevronRightIcon class="w-6 h-6" />
        </button>

        <div
          ref="scrollContainer"
          class="flex overflow-x-auto space-x-4 p-4 bg-white rounded-2xl custom-scrollbar snap-x snap-mandatory scroll-smooth shadow-sm ml-2"
        >
          <div
            v-for="item in travelersStore.recommendations"
            :key="item.id"
            class="flex-shrink-0 w-[32%] min-w-[240px] h-64 rounded-3xl p-0 shadow-soft hover:shadow-soft-lg cursor-pointer hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group/card bg-white snap-start"
            @click="openPostDetailModal(item, false)"
          >
            <img
              :src="item.image"
              class="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover/card:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            <div class="relative z-10 h-full flex flex-col justify-between p-5">
              <div class="flex justify-between items-start">
                <span
                  class="bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1 text-xs font-bold rounded-full shadow-sm"
                >
                  {{ item.tag }}
                </span>

                <div
                  class="flex items-center bg-secondary text-white px-2 py-1 text-xs font-bold rounded-full shadow-sm"
                >
                  <UsersIcon class="w-3 h-3 mr-1" />
                  {{ item.people }}
                </div>
              </div>

              <div class="mt-auto">
                <h3
                  class="font-bold text-lg text-white leading-snug mb-3 line-clamp-2 drop-shadow-md"
                >
                  {{ item.title }}
                </h3>
                <button
                  class="w-full text-xs bg-white/90 text-primary-600 hover:bg-white px-3 py-2 rounded-full font-bold shadow-sm transition-colors"
                >
                  探索行程
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="mb-6 flex items-center justify-between">
          <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <span class="w-2 h-8 bg-secondary rounded-full"></span>
            最新動態
          </h2>
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
                    class="text-xs font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-full"
                  >
                    {{ post.spiritAnimal }}
                  </span>
                </div>
                <div class="text-xs text-slate-400 mt-1">{{ post.time }} • 討論區</div>
              </div>
            </div>

            <h3
              class="text-xl font-bold text-slate-900 mb-3 cursor-pointer hover:text-primary-600 transition-colors"
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
                class="flex items-center space-x-2 hover:text-primary-600 transition mr-6 group/btn"
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
  </div>

  <PostDetailModal
    v-if="isModalOpen"
    :post="selectedPost"
    :scroll-to-comments="shouldScrollToComments"
    @close="closePostDetailModal"
  />
  <ShareModal v-if="isShareModalOpen" :post-link="shareLink" @close="closeShareModal" />
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  display: none;
}
.custom-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}


</style>
