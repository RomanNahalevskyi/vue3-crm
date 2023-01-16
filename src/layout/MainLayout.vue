<script>
import TheNavbar from '@/components/TheNavbar.vue'
import TheSidebar from '@/components/TheSidebar.vue'
import AppMessage from '@/components/ui/AppMessage.vue'

export default {
    components: {TheNavbar, AppMessage, TheSidebar}
}
</script>

<template>
    <TheNavbar/>
    <TheSidebar/>
    <div className="container with-nav">
        <AppMessage/>
        <router-view/>
    </div>
</template>
