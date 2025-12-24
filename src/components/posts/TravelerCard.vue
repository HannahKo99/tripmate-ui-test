<script setup>
import {
  Calendar as CalendarIcon,
  MapPin as MapPinIcon,
  MessageCircle as MessageCircleIcon,
  Users as UsersIcon,
} from 'lucide-vue-next'
import { defineProps } from 'vue'

const props = defineProps({
  traveler: {
    type: Object,
    required: true,
  },
})

// 根據招募狀態返回不同的樣式
const getStatusClasses = (status) => {
  switch (status) {
    case '招募中':
      return 'bg-green-100 text-green-600'
    case '已額滿':
      return 'bg-slate-100 text-slate-500'
    case '已出發':
      return 'bg-slate-200 text-slate-600'
    default:
      return 'bg-yellow-100 text-yellow-600'
  }
}
</script>

<template>
  <div class="card bg-white p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 rounded-3xl group relative overflow-hidden">
    <div
      :class="getStatusClasses(traveler.status)"
      class="absolute top-4 right-4 px-4 py-1.5 font-bold text-xs rounded-full shadow-sm z-10"
    >
      {{ traveler.status }}
    </div>

    <div class="flex flex-col lg:flex-row gap-5">
      <div
        class="w-full lg:w-1/3 h-48 lg:h-auto shrink-0 rounded-2xl overflow-hidden shadow-sm md:aspect-[4/3]"
      >
        <img :src="traveler.image" :alt="traveler.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>

      <div class="flex-1 flex flex-col justify-between pt-2">
        <div class="flex items-center space-x-3 mb-3">
          <img
            :src="traveler.avatar"
            class="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
          />
          <div>
            <div class="flex items-center space-x-2">
              <span class="font-bold text-base text-slate-800">{{ traveler.author }}</span>
              <span
                class="text-xs font-bold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full"
              >
                {{ traveler.spiritAnimal }}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-xl font-bold text-slate-900 mb-2 hover:text-primary transition-colors line-clamp-1">
            {{ traveler.title }}
          </h3>
          <p class="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {{ traveler.content }}
          </p>
        </div>

        <div class="space-y-3 text-sm text-slate-700 mt-auto">
          <div v-if="traveler.tags && traveler.tags.length" class="flex flex-wrap gap-2">
            <span
              v-for="tag in traveler.tags"
              :key="tag"
              class="text-xs font-semibold text-secondary-600 bg-secondary-50 px-2.5 py-1 rounded-full"
            >
              #{{ tag }}
            </span>
          </div>

          <div class="flex items-center space-x-4 text-slate-500 text-xs font-medium">
            <span class="flex items-center bg-slate-50 px-2 py-1 rounded-lg">
              <MapPinIcon class="w-3.5 h-3.5 mr-1 text-red-500" />
              {{ traveler.location }}
            </span>
            <span class="flex items-center bg-slate-50 px-2 py-1 rounded-lg">
              <CalendarIcon class="w-3.5 h-3.5 mr-1 text-amber-500" />
              {{ traveler.date }}
            </span>
            <span class="flex items-center text-primary-500 font-bold ml-auto">
              <MessageCircleIcon class="w-4 h-4 mr-1" />
              {{ traveler.comments }}
            </span>
          </div>

          <div class="flex justify-between items-center pt-3 border-t border-slate-100">
            <div class="flex items-center text-slate-800 font-bold text-sm">
              <UsersIcon class="w-5 h-5 mr-1.5 text-primary-500" />
              招募人數：
              <span class="text-lg text-primary-600 ml-1 font-black">{{ traveler.people }}</span>
            </div>

            <button
              :disabled="traveler.status === '已額滿'"
              :class="
                traveler.status === '已額滿'
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-secondary text-white hover:bg-secondary-600 shadow-lg shadow-secondary-200 hover:shadow-xl hover:-translate-y-0.5'
              "
              class="px-5 py-2 rounded-xl font-bold transition-all duration-300 text-sm active:scale-95"
            >
              聯繫作者
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


