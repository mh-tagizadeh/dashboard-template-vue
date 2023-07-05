<script setup lang="ts"></script>

<template>
    <div class="menu">

        <ul class="menu-links">

            <li class="nav-link">
                <RouterLink to="/">
                    <i class="bx bx-home-alt icon"></i>
                    <span class="text nav-text">Dashobard</span>
                </RouterLink>
            </li>

            <li class="nav-link">
                <RouterLink to="/users">
                    <i class="bx bx-user icon"></i>
                    <span class="text nav-text">Users</span>
                </RouterLink>
            </li>

        </ul>

    </div>
</template>