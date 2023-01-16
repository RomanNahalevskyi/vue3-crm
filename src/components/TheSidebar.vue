<script>
import {computed} from 'vue';
import {useStore} from 'vuex';

export default {
    setup() {
        const store = useStore();

        const sidebar = computed(() => store.state.sidebar);

        const close = () => store.commit('closeSidebar');

        return {
            sidebar,
            close
        };
    }
};
</script>

<template>
    <div class="sidebar" v-if="sidebar">
        <span class="sidebar-close" @click="close">&times;</span>

        <div class="sidebar-content">
            <p>Welcome to the system for registering applications in our bank. Here you will find comprehensive
                information about the system and applications</p>
        </div>
    </div>
</template>
