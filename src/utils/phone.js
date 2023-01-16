export function phoneFilter(phone) {
    try {
        return phone.toString()
            .replace(/[^0-9]/g, '')
            .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    } catch (err) {
        return phone;
    }
}