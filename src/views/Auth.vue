<script>
import {useLoginForm} from '@/use/login-form';
import {useRoute} from 'vue-router'
import {useStore} from 'vuex';
import {error} from '@/utils/error';
export default {
    setup() {
        const route = useRoute();
        const store = useStore();

        if (route.query.message) {
            store.dispatch('setMessage', {
                value: error(route.query.message),
                type: 'warning'
            })
        }

        return {
            ...useLoginForm()
        }
    }
};
</script>

<template>
    <form class="card" @submit.prevent>
        <h1>Log in</h1>

        <div :class="['form-control', {invalid: eError}]">
            <label for="email">Email</label>
            <input v-model="email" @blur="eBlur" type="email" id="email">
            <small v-if="eError">{{ eError }}</small>
        </div>

        <div :class="['form-control', {invalid: pError}]">
            <label for="password">Password</label>
            <input v-model="password" @blur="pBlur" type="password" id="password">
            <small v-if="pError">{{ pError }}</small>
        </div>

        <button class="btn primary" @click="onSubmit" :disabled="isSubmitting || isToManyAttempts">Log in</button>
        <div v-if="isToManyAttempts" class="text-danger mt-6">
            You try to log in too often. Try later
        </div>
    </form>
</template>
