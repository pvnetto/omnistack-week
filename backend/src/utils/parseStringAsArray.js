module.exports = (str) => {
    return str.split(',').map(val => val.trim());
}