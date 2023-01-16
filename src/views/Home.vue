<script>
import {ref, computed, onMounted} from 'vue';
import {useStore} from 'vuex';
import AppPage from '@/components/ui/AppPage.vue';
import RequestTable from '@/components/request/RequestTable.vue';
import AppModal from '@/components/ui/AppModal.vue';
import RequestModal from '@/components/request/RequestModal.vue';
import AppLoader from '@/components/ui/AppLoader.vue';

export default {
    components: {
        AppLoader,
        RequestModal,
        AppModal,
        RequestTable,
        AppPage
    },
    setup() {
        const modal = ref(false);
        const store = useStore();
        const loading = ref(false);

        const requests = computed(() => store.getters['request/requests']);

        onMounted(async () => {
            loading.value = true;
            await store.dispatch('request/load');
            loading.value = false;
        });

        const open = () => {
            modal.value = true;
        };

        const close = () => {
            modal.value = false;
        };

        return {
            modal,
            open,
            close,
            requests,
            loading
        };
    }
};
</script>

<template>
    <AppLoader v-if="loading"/>
    <AppPage v-else title="List of requests">
        <template #header>
            <button @click="open" class="btn primary">Create</button>
        </template>

        <RequestTable :requests="requests"/>

        <teleport to="body">
            <AppModal v-if="modal" @close="close" title="Create request">
                <RequestModal @createForm="close"/>
            </AppModal>
        </teleport>
    </AppPage>
</template>
