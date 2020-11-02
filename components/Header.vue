<template>
  <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <span class="font-semibold text-xl tracking-tight">掲示板ー何でもお好きにカキコどうぞ</span>
    </div>
    <div @click='hideMenu=!hideMenu' class="block lg:hidden">
    </div>
    <div :class='{"hidden md:hidden sm:hidden":hideMenu}' class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      hideMenu: true
    }
  }
}
</script>