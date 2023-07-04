<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { DataService } from '../services/dataServices'
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const toast = useToast()


const router = useRouter()

const form_state = reactive({
    username: '',
    password: ''
})

const submit = async () => {
    await DataService.post('/login', form_state)
    .then((response) => {

        if (response.status === 200) {
            
            localStorage.setItem('access_token', response.data.token)

            toast.add({severity:'success', summary: 'موفق', detail:'ورود با موفقیت انجام شد.', life: 3000});

            router.push({ name: 'home' })

        } 

        if (response.status === 401) {
            toast.add({severity:'error', summary: 'خطا', detail:'رمز عبور یا شماره همراه اشتباه است', life: 3000});
        }

    }).catch((error) => {
        console.log(error)
        if (error.status === 401) {
            toast.add({severity:'error', summary: 'خطا', detail:'رمز عبور یا شماره همراه اشتباه است', life: 3000});
        }
    })
}
</script>

<template>
    <div class="main-layout w-screen h-screen flex justify-center items-center bg-gradient-to-r from-sky-800 to-blue-950">

        <div class="grid grid-cols-1 lg:grid-cols-2 w-[90%] lg:w-2/3 h-[80%]">

            <div>
                <img src="../assets/img/img.jpg" alt="background image" class="absolute lg:relative top-0 right-0 left-0 h-42 w-screen lg:w-full lg:h-full lg:rounded-l-xl object-cover">
            </div>

            <form @submit.prevent="submit" class="bg-white p-4 lg:p-24 rounded-xl lg:rounded-l-none lg:rounded-r-xl flex flex-col justify-center relative z-10  mt-16 lg:mt-0">

                <h1 class="text-2xl mb-2 font-bold text-center w-full text-gray-700 right-0">Login</h1>

                <h2 class="text-lg text-center text-gray-500 mb-8">Please sing in to countinue</h2>

                <div class="my-2">
                    <InputText v-model="form_state.username" type="text" placeholder="username" class="w-full text-sm font-semibold text-gray-600 " ></InputText>
                </div>
                <div class="text-sm font-semibold text-gray-600 my-2">
                    <InputText v-model="form_state.password" type="password" placeholder="password" class="w-full" ></InputText>
                </div>


                <Button type="submit" :class="$style.button" size="small">log in</Button>

            </form>

        </div>

    </div>
</template>


<style scoped>
.main-layout {
    max-width: 100%;
    overflow-x: hidden;
}
</style>

<style module>
.button {
    font-weight: 800;
    margin-top: 1rem;
    justify-content: center;
}
</style>