<script setup>
import {
  Home as HomeIcon,
  MessagesSquare as ForumIcon,
  Users as UsersIcon,
  Map as MapIcon,
  Calendar as CalendarIcon,
  User as UserIcon,
  Bookmark as BookmarkIcon,
  Heart as HeartIcon,
  Menu as MenuIcon,
} from 'lucide-vue-next'
import { useRouter, useRoute } from 'vue-router'

const emit = defineEmits(['open-mobile-actions'])
const router = useRouter()
const route = useRoute()

// 電腦版側邊欄選單 (保持不變)
const menuItems = [
  {
    name: 'home',
    label: '為你推薦',
    icon: HomeIcon,
    iconColor: 'text-amber-800',
    textColor: 'text-amber-900',
  },
  {
    name: 'discussion',
    label: '討論區',
    icon: ForumIcon,
    iconColor: 'text-indigo-600',
    textColor: 'text-amber-900',
  },
  {
    name: 'find_traveler',
    label: '找旅伴',
    icon: UsersIcon,
    iconColor: 'text-green-600',
    textColor: 'text-amber-900',
  },
  {
    name: 'featured_itinerary',
    label: '精選行程',
    icon: MapIcon,
    iconColor: 'text-orange-600',
    textColor: 'text-amber-900',
  },
]

const bottomMenuItems = [
  {
    name: 'my_itinerary',
    label: '我的行程',
    icon: CalendarIcon,
    iconColor: 'text-blue-600',
    textColor: 'text-amber-900',
  },
  {
    name: 'profile',
    label: '個人檔案',
    icon: UserIcon,
    iconColor: 'text-gray-700',
    textColor: 'text-amber-900',
  },
]

// 🟢 修正順序：手機版底部導航項目
// 順序：首頁 -> 討論 -> 找伴 -> 精選(新增) -> 行程 -> 更多
const mobileNavItems = [
  { name: 'home', label: '首頁', icon: HomeIcon },
  { name: 'discussion', label: '討論', icon: ForumIcon }, // 恢復順序
  { name: 'find_traveler', label: '找伴', icon: UsersIcon }, // 恢復順序
  { name: 'featured_itinerary', label: '精選', icon: MapIcon }, // ✨ 插在這裡 (符合電腦版邏輯)
  { name: 'my_itinerary', label: '行程', icon: CalendarIcon },
  { name: 'menu', label: '更多', icon: MenuIcon },
]

function goToFavorites() {
  router.push({ name: 'favorites' })
}
function goToCollections() {
  alert('收藏功能開發中')
}

const handleMobileNavClick = (item) => {
  if (item.name === 'menu') {
    emit('open-mobile-actions')
  } else {
    router.push({ name: item.name })
  }
}
</script>

<template>
  <aside
    class="fixed left-0 top-16 md:top-18 bottom-0 w-64 hidden lg:flex flex-col z-40 custom-scrollbar overflow-y-auto p-4 bg-white border-r border-slate-100"
  >
    <div class="flex justify-between mb-6 pb-6 border-b border-slate-100 ml-1 mr-1">
      <div
        class="cursor-pointer w-[48%] aspect-square flex flex-col items-center justify-center rounded-2xl bg-red-50 hover:bg-red-100 hover:shadow-soft transition-all duration-300 group"
        @click="goToFavorites"
      >
        <HeartIcon class="w-8 h-8 text-red-500 group-hover:scale-110 transition duration-300" />
        <span class="text-xs font-semibold mt-2 text-slate-600">愛心</span>
      </div>

      <div
        class="cursor-pointer w-[48%] aspect-square flex flex-col items-center justify-center rounded-2xl bg-amber-50 hover:bg-amber-100 hover:shadow-soft transition-all duration-300 group"
        @click="goToCollections"
      >
        <BookmarkIcon
          class="w-8 h-8 text-amber-500 group-hover:scale-110 transition duration-300"
        />
        <span class="text-xs font-semibold mt-2 text-slate-600">收藏</span>
      </div>
    </div>

    <nav class="space-y-1 px-1">
      <RouterLink
        v-for="item in menuItems"
        :key="item.name"
        :to="{ name: item.name }"
        class="nav-item flex items-center p-3 rounded-xl cursor-pointer text-slate-600 hover:bg-slate-50 transition-all duration-200"
        active-class="bg-primary-50 text-primary-600 font-semibold"
      >
        <component :is="item.icon" :class="['w-5 h-5 mr-3 transition-colors', route.name === item.name ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-600']" />
        <span>
          {{ item.label }}
        </span>
      </RouterLink>

      <div class="my-4 border-t border-slate-100 mx-2"></div>

      <RouterLink
        v-for="item in bottomMenuItems"
        :key="item.name"
        :to="{ name: item.name }"
        class="nav-item flex items-center p-3 rounded-xl cursor-pointer text-slate-600 hover:bg-slate-50 transition-all duration-200"
        active-class="bg-primary-50 text-primary-600 font-semibold"
      >
        <component :is="item.icon" :class="['w-5 h-5 mr-3 transition-colors', route.name === item.name ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-600']" />
        <span>
          {{ item.label }}
        </span>
      </RouterLink>
    </nav>
  </aside>

  <nav
    class="fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-100 z-50 flex justify-between items-center px-1 lg:hidden shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]"
  >
    <button
      v-for="item in mobileNavItems"
      :key="item.name"
      class="flex flex-col items-center justify-center w-full h-full text-slate-400 hover:text-primary-500 transition active:scale-95 px-0.5"
      :class="{ 'text-primary-600': route.name === item.name && item.name !== 'menu' }"
      @click="handleMobileNavClick(item)"
    >
      <component
        :is="item.icon"
        class="w-6 h-6 mb-1 transition-colors"
        :class="
          route.name === item.name && item.name !== 'menu'
            ? 'text-primary-600'
            : 'text-slate-400'
        "
      />
      <span
        class="text-[10px] font-semibold transition-colors whitespace-nowrap"
        :class="
          route.name === item.name && item.name !== 'menu' ? 'text-primary-600' : 'text-slate-500'
        "
      >
        {{ item.label }}
      </span>
    </button>
  </nav>
</template>


