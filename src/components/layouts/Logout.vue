<script setup lang="ts">
import { useRouter } from 'vue-router'

const router: any = useRouter()

function logout() {
    localStorage.removeItem('access_token');

    router.go(0)
}
</script>

<template>
    <li class="cursor-pointer">
        <a @click="logout">
            <i class="bx bx-log-out icon"></i>
            <span class="text nav-text">Logout</span>
        </a>
    </li>
</template>