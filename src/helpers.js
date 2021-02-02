export const sortList = (a, b) => {
    var textA = a.name.toUpperCase();
    var textB = b.name.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
};

export const deleteDublicates = (arr, field) => {
    return arr.reduce((acc, current) => {
        const x = acc.find(item => item[field] === current[field]);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);
};