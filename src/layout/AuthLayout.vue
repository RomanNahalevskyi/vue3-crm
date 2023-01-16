<script>
import AppMessage from '@/components/ui/AppMessage.vue'
export default {
    components: {AppMessage}
}
</script>

<template>
    <div class="container">
        <AppMessage />
        <router-view />
    </div>
</template>
