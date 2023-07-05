<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

const dark: Ref<boolean> = ref(true)

function changeTheme() {
    dark.value = !dark.value

    const body: any = document.querySelector('body')

    const html: any = document.querySelector('html')

    body.classList.toggle("dark");
    html.classList.toggle("dark");
}
</script>
<template>
    <li class="mode">
        <div class="moon-sun">
            <i class="bx bx-moon icon moon"></i>
            <i class="bx bx-sun icon sun"></i>
        </div>

        <span class="mode-text text">{{ dark ? 'Light Mode' : 'Dark Mode' }}</span>

        <div @click="changeTheme()" class="toggle-switch">
            <div class="switch"></div>
        </div>
    </li>
</template>