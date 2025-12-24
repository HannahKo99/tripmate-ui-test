<script setup>
import { ref } from 'vue'
import { Plus as PlusIcon, Users as UsersIcon } from 'lucide-vue-next'
import { useTravelersStore } from '@/stores/travelers'
import TravelerCard from '@/components/posts/TravelerCard.vue'
import PostingChoiceModal from '@/components/modals/PostingChoiceModal.vue'
import PostDetailModal from '@/components/modals/PostDetailModal.vue'

const travelersStore = useTravelersStore()

const isPostingModalOpen = ref(false)

const isDetailModalOpen = ref(false)
const selectedPost = ref(null)
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

const filterOptions = ref(['全部', '招募中', '已額滿', '單人遊', '團體遊'])
const activeFilter = ref('全部')
</script>

<template>
  <div class="p-4 md:p-0 overflow-x-hidden">
    <div class="w-full">
      <div class="mb-8 mt-4 flex items-center justify-between">
        <h1 class="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <div class="p-2 bg-info-100 rounded-2xl">
            <UsersIcon class="w-8 h-8 text-info-600" />
          </div>
          找旅伴
        </h1>
        <button
          class="bg-gradient-to-r from-info-400 to-info-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-info-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
          @click="isPostingModalOpen = true"
        >
          <PlusIcon class="w-5 h-5" />
          發起招募
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
                ? 'bg-info-500 text-white shadow-lg shadow-info-200'
                : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200',
            ]"
            @click="activeFilter = filter"
          >
            {{ filter }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TravelerCard
          v-for="traveler in travelersStore.recommendations"
          :key="traveler.id"
          :traveler="traveler"
          @click="openPostDetailModal(traveler, false)"
        />
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
</template>
