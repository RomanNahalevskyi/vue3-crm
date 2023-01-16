<script>
import {ref, onMounted, computed} from 'vue';
import {useStore} from 'vuex';
import {useRoute, useRouter} from 'vue-router';
import {currency} from '@/utils/currency';
import {phoneFilter} from '@/utils/phone';
import AppPage from '@/components/ui/AppPage.vue';
import AppLoader from '@/components/ui/AppLoader.vue';
import AppStatus from '@/components/ui/AppStatus.vue';

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();
        const status = ref();
        const loading = ref(true);
        const request = ref({});

        onMounted(async () => {
            loading.value = true;
            request.value = await store.dispatch('request/loadOne', route.params.id);
            status.value = request.value?.status;
            loading.value = false;
        });

        const hasChanges = computed(() => request.value.status !== status.value);

        const remove = async () => {
            await store.dispatch('request/remove', route.params.id);
            router.push('/');
        };

        const update = async () => {
            const data = {...request.value, status: status.value, id: route.params.id};
            await store.dispatch('request/update', data);
            request.value.status = status.value;
        };

        return {
            loading,
            request,
            currency,
            phoneFilter,
            remove,
            update,
            status,
            hasChanges
        };
    },
    components: {AppPage, AppLoader, AppStatus}
};
</script>

<template>
    <AppLoader v-if="loading"></AppLoader>
    <AppPage back title="Request" v-else-if="request">
        <p><strong>Full name</strong>: {{ request.full_name }}</p>
        <p><strong>Phone</strong>: {{ phoneFilter(request.phone) }}</p>
        <p><strong>Amount</strong>: {{ currency(request.amount) }}</p>
        <p><strong>Status</strong>:
            <AppStatus :type="request.status"/>
        </p>

        <div class="form-control">
            <label for="status">Status</label>
            <select id="status" v-model="status">
                <option value="done">Done</option>
                <option value="cancelled">Cancelled</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
            </select>
        </div>

        <button class="btn danger" @click="remove">Delete</button>
        <button class="btn" @click="update" v-if="hasChanges">Refresh</button>
    </AppPage>
    <h3 v-else class="text-center text-white">
        There are no tickets with ID = {{ $route.params.id }}.
    </h3>
</template>
