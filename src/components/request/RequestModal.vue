<script>
import {useRequestForm} from '@/use/request-form';
import {useStore} from 'vuex';

export default {
    emits: ['createForm'],
    setup(_, {emit}) {
        const store = useStore();
        const onSubmit = async values => {
            await store.dispatch('request/create', values);
            emit('createForm');
        };

        return {
            ...useRequestForm(onSubmit)
        };
    }
};
</script>

<template>
    <form @submit.prevent>
        <div :class="['form-control', {invalid: fullError}]">
            <label for="full_name">Full Name</label>
            <input v-model="full" @blur="fullBlur" type="text" id="full_name"/>
            <small v-if="fullError">{{ fullError }}</small>
        </div>

        <div :class="['form-control', {invalid: phoneError}]">
            <label for="phone">Phone</label>
            <input v-model="phone" @blur="phoneBlur" type="text" id="phone"/>
            <small v-if="phoneError">{{ phoneError }}</small>
        </div>

        <div :class="['form-control', {invalid: amountError}]">
            <label for="amount">Amount</label>
            <input v-model.number="amount" @blur="amountBlur" type="number" id="amount"/>
            <small v-if="amountError">{{ amountError }}</small>
        </div>

        <div class="form-control">
            <label for="status">Status</label>
            <select v-model="status" id="status">
                <option value="done">Done</option>
                <option value="cancelled">Cancelled</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
            </select>
        </div>

        <button class="btn primary" @click="onSubmit" :disabled="isSubmitting || isToManyAttempts">Create</button>
        <div v-if="isToManyAttempts" class="text-danger mt-6">
            You are trying to submit the form too many times. Try later
        </div>
    </form>
</template>
