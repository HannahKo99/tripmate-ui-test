<template>
  <div
    class="loginRegisterPage min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4"
  >
    <div class="flex flex-col items-center gap-3 mb-6">
      <div class="flex items-center gap-4">
        <span
          :class="[
            'text-3xl font-bold transition-colors duration-200 cursor-pointer',
            activeTab === 'login' ? 'text-secondary' : 'text-slate-300',
          ]"
          @click="activeTab = 'login'"
        >
          登入
        </span>
        <button
          type="button"
          class="relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          :class="activeTab === 'login' ? 'bg-secondary' : 'bg-slate-300'"
          @click="activeTab = activeTab === 'login' ? 'register' : 'login'"
        >
          <span
            class="inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300"
            :class="activeTab === 'login' ? 'translate-x-1' : 'translate-x-9'"
          ></span>
        </button>
        <span
          :class="[
            'text-3xl font-bold transition-colors duration-200 cursor-pointer',
            activeTab === 'register' ? 'text-secondary' : 'text-slate-300',
          ]"
          @click="activeTab = 'register'"
        >
          註冊
        </span>
      </div>
    </div>
    <div class="form-wrapper w-full max-w-md min-h-[600px] flex itmes-start justify-center">
      <form
        v-if="activeTab === 'login'"
        class="formContainer w-full max-w-md bg-white rounded-3xl shadow-xl p-8 space-y-6"
        @submit.prevent="handleLogin"
      >
        <div class="formInput flex flex-row gap-2">
          <div class="flex flex-col gap-2 flex-1">
            <label for="email" class="text-slate-700 font-medium">電子信箱</label>
            <input
              id="email"
              v-model="loginForm.email"
              class="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              type="email"
              placeholder="請輸入電子信箱"
            />
          </div>
        </div>
        <div class="formInput flex flex-row gap-2">
          <div class="flex flex-col gap-2 flex-1">
            <label for="password" class="text-slate-700 font-medium">密碼</label>
            <input
              id="password"
              v-model="loginForm.password"
              class="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              type="password"
              placeholder="請輸入密碼"
            />
          </div>
        </div>
        <button
          type="submit"
          class="formSubmit block w-full text-center px-6 py-3 bg-secondary text-white rounded-xl hover:bg-secondary-600 transition-colors font-bold shadow-lg shadow-secondary-200"
        >
          登入
        </button>
        <a
          href="#"
          class="block text-center text-sm text-slate-500 hover:text-primary-600 transition-colors cursor-pointer"
          @click.prevent="handleForgotPassword"
          >忘記密碼?</a
        >
      </form>

      <form
        v-if="activeTab === 'register'"
        class="formContainer w-full max-w-md bg-white rounded-3xl shadow-xl p-8 space-y-5"
        @submit.prevent="handleRegister"
      >
        <div class="formInput flex flex-row gap-2">
          <div class="flex flex-col gap-2 flex-1">
            <label for="realName" class="text-slate-700 font-medium">真實姓名</label>
            <input
              id="realName"
              v-model="registerForm.realName"
              class="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-all"
              type="text"
              placeholder="請輸入本名(不公開)"
            />
          </div>
        </div>
        <div class="formInput flex flex-row gap-2">
          <div class="flex flex-col gap-2 flex-1">
            <label for="nickname" class="text-slate-700 font-medium">暱稱</label>
            <input
              id="nickname"
              v-model="registerForm.nickname"
              class="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-all"
              type="text"
              placeholder="請輸入使用者暱稱(公開)"
            />
          </div>
        </div>
        <div class="formInput flex flex-row gap-2">
          <div class="flex flex-col gap-2 flex-1">
            <label for="email" class="text-slate-700 font-medium">電子信箱</label>
            <input
              id="email"
              v-model="registerForm.email"
              class="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-all"
              type="email"
              placeholder="請輸入電子信箱"
            />
          </div>
        </div>
        <div class="formInput flex flex-row gap-2">
          <div class="flex flex-col gap-2 flex-1">
            <label for="password" class="text-slate-700 font-medium">密碼</label>
            <input
              id="password"
              v-model="registerForm.password"
              class="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-all"
              type="password"
              placeholder="請輸入密碼"
            />
          </div>
        </div>
        <div class="formInput flex flex-row gap-2">
          <div class="flex flex-col gap-2 flex-1">
            <label for="confirmPassword" class="text-slate-700 font-medium">確認密碼</label>
            <input
              id="confirmPassword"
              v-model="registerForm.confirmPassword"
              class="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-all"
              type="password"
              placeholder="請輸入同樣的密碼"
            />
          </div>
        </div>
        <button
          type="submit"
          class="formSubmit block w-full text-center px-6 py-3 bg-secondary text-white rounded-xl hover:bg-secondary-600 transition-colors font-bold shadow-lg shadow-secondary-200"
        >
          註冊
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { auth } from '@/firebase/config'
import { useUserStore } from '@/stores/user'
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

//切換 login / register
const activeTab = ref('login')

//登入：填寫帳號密碼
const loginForm = ref({
  email: '',
  password: '',
})

//註冊：填寫帳號密碼
const registerForm = ref({
  realName: '',
  nickname: '',
  email: '',
  password: '',
  confirmPassword: '',
})

//登入：送出資料
const userStore = useUserStore()
const router = useRouter()
const handleLogin = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginForm.value.email,
      loginForm.value.password,
    )
    console.log('登入成功：', userCredential.user)
    userStore.login()
    router.push('/')
  } catch (error) {
    console.error('登入失敗：', error.message)
    alert('登入失敗：' + error.message)
  }
}

//註冊：送出資料
const handleRegister = async () => {
  try {
    if (registerForm.value.password !== registerForm.value.confirmPassword) {
      alert('密碼不一致，請重新確認')
      return
    }
    if (!registerForm.value.email || !registerForm.value.password) {
      alert('請填寫所有欄位')
      return
    }
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      registerForm.value.email,
      registerForm.value.password,
    )

    console.log('註冊成功：', userCredential.user)
    userStore.login()
    router.push('/')
  } catch (error) {
    console.log('註冊失敗', error.message)
    alert('註冊失敗：' + error.message)
  }
}
//忘記密碼
const handleForgotPassword = async () => {
  try {
    if (!loginForm.value.email) {
      alert('請輸入註冊時的電子郵件')
      return
    }
    await sendPasswordResetEmail(auth, loginForm.value.email)
    alert('重置密碼郵件已發送至信箱：' + loginForm.value.email + '\n請檢查您的郵箱並點擊重置連結')
  } catch (error) {
    console.log('發送失敗：' + error.message)
    alert('發送失敗：' + error.message)
  }
}
</script>
