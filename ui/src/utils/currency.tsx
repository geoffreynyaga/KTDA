export function formatCurrency(amount: number) {
    try {
        const formattedValue = new Intl.NumberFormat("en-KE", {
            style: "currency",
            currency: "KES",
        }).format(amount);

        return formattedValue;
    } catch (error) {
        return amount;
    }
}
