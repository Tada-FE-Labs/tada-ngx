export const getActiveYear = () => {
    let currentYear = getCurrentYear();
    const activeYear = (1 <= getCurrentMonth() && getCurrentMonth() <= 8) ? currentYear - 1 : currentYear;
    const selectedYear = localStorage.getItem('activeSchoolYear');
    if (!!selectedYear) {
        return +selectedYear;
    }
    return activeYear;
}

export const getCurrentYear = () => {
    return new Date().getFullYear(); // returns the current year
};

export const getCurrentMonth = () => {
    return new Date().getMonth() + 1; // returns the current year
};