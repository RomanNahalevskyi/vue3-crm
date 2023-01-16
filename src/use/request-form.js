import {useField, useForm} from 'vee-validate';
import * as yup from 'yup';
import {computed, watch} from 'vue';

export function useRequestForm(fn) {
    const {handleSubmit, isSubmitting, submitCount} = useForm({
        initialValues: {
            status: 'active'
        }
    });

    const {value: full, errorMessage: fullError, handleBlur: fullBlur} = useField(
        'full_name',
        yup.string().trim().required().min(4)
    );

    const {value: phone, errorMessage: phoneError, handleBlur: phoneBlur} = useField(
        'phone',
        yup.string().trim().required().max(10),
    );

    const {value: amount, errorMessage: amountError, handleBlur: amountBlur} = useField(
        'amount',
        yup.number().required().positive().integer(),
    );

    const {value: status} = useField('status');

    const onSubmit = handleSubmit(fn);

    const isToManyAttempts = computed(() => submitCount.value >= 3);

    watch(isToManyAttempts, value => {
        setTimeout(() => submitCount.value = 0, 3000);
    });

    return {
        full,
        fullError,
        fullBlur,
        phone,
        phoneError,
        phoneBlur,
        amount,
        amountError,
        amountBlur,
        status,
        onSubmit,
        isSubmitting,
        isToManyAttempts
    };
}