export default function formatMoney(price = 0) {
    const options = {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
    };
    const formatter = new Intl.NumberFormat('de-DE', options);
    return formatter.format(price / 100);
}
