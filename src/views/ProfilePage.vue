<script setup>
import { ref } from 'vue'
import {
  Camera as CameraIcon,
  Edit as EditIcon,
  FileText as FileTextIcon,
  Heart as HeartIcon,
  Settings as SettingsIcon,
  File as FileIcon,
} from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const user = userStore.userProfile // 從 Store 取得使用者資料

const activeTab = ref('posts') // 控制下方 Tab 切換 (我的發文 / 我的收藏 / 帳號設定)

const changeCover = () => {
  // 這裡之後可以接上傳圖片功能
  alert('點擊了更換封面圖片')
}

const changeAvatar = () => {
  // 這裡之後可以接上傳頭像功能
  alert('點擊了更換大頭貼')
}
</script>

<template>
  <div class="p-4 md:p-0">
    <div
      class="bg-white rounded-3xl overflow-hidden shadow-soft-lg border border-slate-100 mb-8"
    >
      <div
        class="h-48 md:h-64 bg-cover bg-center relative"
        :style="{ backgroundImage: `url(${user.coverImage})` }"
      >
        <div class="absolute inset-0 bg-black/20"></div>

        <button
          class="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-md transition opacity-0 hover:opacity-100 group-hover:opacity-100 shadow-lg"
          @click="changeCover"
        >
          <CameraIcon class="w-5 h-5" />
        </button>
      </div>

      <div class="bg-primary-500 text-white p-4 md:p-6 relative">
        <div class="flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-20">
          <div class="relative group">
            <img
              :src="user.avatar"
              class="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white bg-white object-cover shadow-lg"
            />
            <button
              class="absolute bottom-1 right-1 bg-accent-500 p-2 rounded-full border-2 border-white hover:bg-accent-600 transition shadow-md"
              @click="changeAvatar"
            >
              <CameraIcon class="w-4 h-4 text-white" />
            </button>
          </div>

          <div class="flex-1 text-center md:text-left mt-4 md:mt-0 md:ml-6 mb-2">
            <h1 class="text-3xl font-bold tracking-tight mb-1">{{ user.name }}</h1>
            <p class="text-primary-100 text-sm font-medium">會員編號: {{ user.id }}</p>

            <div class="flex justify-center md:justify-start space-x-8 mt-5">
              <div class="text-center group cursor-default">
                <div class="text-2xl font-bold group-hover:text-warning-300 transition">{{ user.postsCount }}</div>
                <div class="text-xs text-primary-100 mt-0.5">發文數</div>
              </div>
              <div class="text-center group cursor-default">
                <div class="text-2xl font-bold group-hover:text-warning-300 transition">{{ user.savedCount }}</div>
                <div class="text-xs text-primary-100 mt-0.5">收藏</div>
              </div>
              <div class="text-center group cursor-default">
                <div class="text-2xl font-bold group-hover:text-warning-300 transition">{{ user.likedCount }}</div>
                <div class="text-xs text-primary-100 mt-0.5">按讚</div>
              </div>
            </div>
          </div>

          <button
            class="mt-6 md:mb-2 bg-white text-primary-600 px-6 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition shadow-sm border border-slate-100 flex items-center mb-2"
          >
            <EditIcon class="w-4 h-4 mr-2" />
            編輯資料
          </button>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-3xl shadow-soft border border-slate-100 min-h-[400px]">
      <div class="flex border-b border-slate-100 px-2 pt-2">
        <button
          :class="[
            'flex-1 py-4 font-bold text-center flex items-center justify-center transition rounded-t-2xl mx-1 relative top-[1px]',
            activeTab === 'posts'
              ? 'text-primary-600 bg-white border-b-2 border-primary-500'
              : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50',
          ]"
          @click="activeTab = 'posts'"
        >
          <FileTextIcon class="w-5 h-5 mr-2" /> 我的發文
        </button>
        <button
          :class="[
            'flex-1 py-4 font-bold text-center flex items-center justify-center transition rounded-t-2xl mx-1 relative top-[1px]',
            activeTab === 'saved'
              ? 'text-primary-600 bg-white border-b-2 border-primary-500'
              : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50',
          ]"
          @click="activeTab = 'saved'"
        >
          <HeartIcon class="w-5 h-5 mr-2" /> 我的收藏
        </button>
        <button
          :class="[
            'flex-1 py-4 font-bold text-center flex items-center justify-center transition rounded-t-2xl mx-1 relative top-[1px]',
            activeTab === 'settings'
              ? 'text-primary-600 bg-white border-b-2 border-primary-500'
              : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50',
          ]"
          @click="activeTab = 'settings'"
        >
          <SettingsIcon class="w-5 h-5 mr-2" /> 帳號設定
        </button>
      </div>

      <div class="p-12 text-center text-slate-400">
        <div v-if="activeTab === 'posts'">
          <div class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileIcon class="w-10 h-10 text-slate-300" />
          </div>
          <p class="text-xl font-bold text-slate-700">還沒有發文</p>
          <p class="text-base mt-2">快去分享你的旅遊經驗吧！</p>
        </div>
        <div v-if="activeTab === 'saved'">
          <div class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
             <HeartIcon class="w-10 h-10 text-slate-300" />
          </div>
          <p class="text-xl font-bold text-slate-700">還沒有收藏</p>
          <p class="text-base mt-2">看到喜歡的文章記得按收藏喔！</p>
        </div>
        <div v-if="activeTab === 'settings'">
          <div class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <SettingsIcon class="w-10 h-10 text-slate-300" />
          </div>
          <p class="text-xl font-bold text-slate-700">帳號設定</p>
          <p class="text-base mt-2">這裡可以修改密碼和隱私設定</p>
        </div>
      </div>
    </div>
  </div>
</template>
