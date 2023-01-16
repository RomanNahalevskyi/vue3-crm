<script>
import AppPage from '@/components/ui/AppPage.vue';
import QuestionItem from '@/components/question/QuestionItem.vue';

export default {
    setup() {
        const questions = [
            {
                title: 'What is in this system?',
                text: 'There is everything in order to see what applications a person has added'
            },
            {title: 'How does authorization work here?', text: 'Everything is implemented through Firebase'}
        ];

        return {questions};
    },
    components: {AppPage, QuestionItem}
};
</script>

<template>
    <AppPage back title="Help">
        <QuestionItem
            v-for="question in questions"
            :key="question.title"
            :question="question"
        ></QuestionItem>
    </AppPage>
</template>
