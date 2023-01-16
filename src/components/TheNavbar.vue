<script>
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';

export default {
    setup() {
        const router = useRouter();
        const store = useStore();

        const logout = () => {
            store.commit('auth/logOut');
            router.push('/auth');
        };

        const open = () => store.commit('openSidebar');

        return {
            logout,
            open
        };
    }
};
</script>

<template>
    <nav class="navbar">
        <h3>Online Bank</h3>

        <ul class="navbar-menu">
            <li>
                <router-link to="/">Requests</router-link>
            </li>
            <li>
                <router-link to="/help">Help</router-link>
            </li>
            <li>
                <a @click.prevent="open">Messages</a>
            </li>
            <li>
                <a @click.prevent="logout">Log out</a>
            </li>
        </ul>
    </nav>
</template>

<style scoped>
a {
    cursor: pointer;
}
</style>
