<script setup lang="ts">
import ChangeTheme from '../components/layouts/ChangeTheme.vue';
import Menu from '../components/layouts/Menu.vue';
import Logout from '../components/layouts/Logout.vue';
import AppLogo from '../components/layouts/AppLogo.vue';
import AppHeader from '../components/layouts/AppHeader.vue';
import { RouterView } from 'vue-router';
import { ref } from 'vue'
import type { Ref } from 'vue'

const toggle: Ref<boolean> = ref(false)
</script>


<template>

    <nav class="sidebar" :class="toggle ? 'close' : ''">
        <header>
            <div class="image-text">

                <AppLogo />

                <AppHeader />

            </div>

            <i @click="toggle = !toggle" class="bx bx-chevron-right toggle"></i>
        </header>


        <div class="menu-bar">

            <Menu />

            <div class="bottom-content">

                <Logout />

                <ChangeTheme />

            </div>
        </div>
    </nav> 


    <section class="home">
        <RouterView />
    </section>


</template>