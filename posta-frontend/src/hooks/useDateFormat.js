export function useDateFormat() {
    function formatDate(date) {
        const split = date.split(/(?:-|T)+/);
        const newDate = [];

        for (let i = 0; i < split.length - 1; i++) {
            newDate.push(split[i]);
        };

        return newDate.reverse().join(".");
    };

    return { formatDate };
};