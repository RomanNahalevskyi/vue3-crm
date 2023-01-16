const formatter = new Intl.NumberFormat('en-US', {currency: 'USD', style: 'currency'});

export function currency(value) {
    return formatter.format(value);
}