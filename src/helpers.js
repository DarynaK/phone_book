export const sortList = (a, b) => {
    var textA = a.name.toUpperCase();
    var textB = b.name.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
};

export const deleteDuplicates = (arr, field) => arr.reduce((acc, current) => acc.find(item => item[field] === current[field])
    ? acc : acc.concat([current]), []);