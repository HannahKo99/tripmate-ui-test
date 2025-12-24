<script setup>
import {
  MapPin as MapPinIcon,
  Calendar as CalendarIcon,
  Bookmark as BookmarkIcon,
  Eye as EyeIcon,
  DollarSign as DollarSignIcon,
  // 🟢 修正 1: 確保引入留言和分享圖示
  MessageCircle as MessageCircleIcon,
  Repeat2 as Repeat2Icon,
} from 'lucide-vue-next'

const props = defineProps({
  itinerary: {
    type: Object,
    required: true,
    default: () => ({}),
  },
})

// 定義 Emit 事件
const emit = defineEmits(['open-detail', 'open-share'])

// 格式化價格
const formatPrice = (price) => {
  return price
    .toLocaleString('en-US', {
      style: 'currency',
      currency: 'TWD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    .replace('TWD', 'NT$')
}

// 根據 animal 標籤決定圖標
const getAnimalEmoji = (animal) => {
  switch (animal) {
    case 'Cat':
      return '🐱'
    case 'Eagle':
      return '🦅'
    case 'Wolf':
      return '🐺'
    case 'Panda':
      return '🐼'
    default:
      return '🧳'
  }
}
</script>

<template>
  <div
    class="card p-0 overflow-hidden cursor-pointer transition hover:-translate-y-1 hover:shadow-soft-lg duration-300 group"
  >
    <div
      class="relative w-full h-48 md:h-52 overflow-hidden bg-gray-100"
      @click="emit('open-detail', props.itinerary, false)"
    >
      <img
        :src="props.itinerary.coverImage"
        :alt="props.itinerary.title"
        class="w-full h-full object-cover"
      />

      <div
        v-if="props.itinerary.isFeatured"
        class="absolute top-3 right-3 bg-yellow-400 text-slate-900 font-bold text-xs px-3 py-1 rounded-full shadow-sm"
      >
        FEATURED
      </div>

      <div
        class="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm text-slate-800 font-bold text-sm px-4 py-1.5 rounded-full flex items-center shadow-md"
      >
        <DollarSignIcon class="w-3.5 h-3.5 mr-0.5 text-primary-500" />
        <span>{{ formatPrice(props.itinerary.price) }}</span>
      </div>
    </div>

    <div class="p-4 flex flex-col space-y-3">
      <div
        v-if="props.itinerary.agencyName"
        class="text-xs font-bold text-secondary tracking-wide uppercase"
      >
        由 {{ props.itinerary.agencyName }} 服務
      </div>

      <h3
        class="text-lg font-bold text-slate-900 line-clamp-2 hover:text-primary transition-colors"
        @click="emit('open-detail', props.itinerary, false)"
      >
        {{ props.itinerary.title }}
      </h3>

      <div class="flex items-center space-x-4 text-sm text-gray-600">
        <div class="flex items-center space-x-1">
          <CalendarIcon class="w-4 h-4 text-green-500" />
          <span>{{ props.itinerary.durationDays }} 天</span>
        </div>
        <div class="flex items-center space-x-1">
          <MapPinIcon class="w-4 h-4 text-red-500" />
          <span class="font-bold line-clamp-1">
            {{ props.itinerary.destinations.join(', ') }}
          </span>
        </div>
      </div>

      <div class="flex items-center justify-between border-t border-gray-100 pt-3">
        <div class="flex items-center space-x-4 text-xs text-gray-500">
          <div class="flex items-center space-x-1">
            <EyeIcon class="w-4 h-4" />
            <span>{{ props.itinerary.totalViews.toLocaleString() }}</span>
          </div>
          <button class="flex items-center space-x-1 hover:text-red-500 transition">
            <BookmarkIcon class="w-4 h-4" />
            <span>{{ props.itinerary.totalSaves.toLocaleString() }}</span>
          </button>
        </div>

        <div class="flex items-center space-x-4 text-gray-500">
          <button
            class="flex items-center space-x-1 hover:text-indigo-600 transition"
            @click.stop="emit('open-detail', props.itinerary, true)"
          >
            <MessageCircleIcon class="w-4 h-4" />
            <span>{{ props.itinerary.comments ? props.itinerary.comments.length : 0 }}</span>
          </button>

          <button
            class="flex items-center space-x-1 hover:text-gray-600 transition"
            @click.stop="emit('open-share', props.itinerary.id)"
          >
            <Repeat2Icon class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


