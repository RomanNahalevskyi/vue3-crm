<script>
import {currency} from '@/utils/currency';
import {phoneFilter} from '@/utils/phone'
import AppStatus from '@/components/ui/AppStatus.vue';

export default {
    props: ['requests'],
    setup() {
        return {currency, phoneFilter};
    },
    components: {AppStatus}
};
</script>

<template>
    <h4 v-if="requests.length === 0" class="text-center">No applications yet</h4>
    <table v-else class="table">
        <thead>
        <tr>
            <th>№</th>
            <th>Full name</th>
            <th>Phone</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(req, idx) in requests" :key="req.id">
            <td>{{ idx + 1 }}</td>
            <td>{{ req.full_name }}</td>
            <td>{{ phoneFilter(req.phone) }}</td>
            <td>{{ currency(req.amount) }}</td>
            <td>
                <AppStatus :type="req.status"/>
            </td>
            <td>
                <router-link v-slot="{navigate}" custom :to="{name: 'Request', params: {id: req.id}}">
                    <button class="btn" @click="navigate">Open</button>
                </router-link>
            </td>
        </tr>
        </tbody>
    </table>
</template>
