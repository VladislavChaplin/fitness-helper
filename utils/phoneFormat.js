export default str => {
    return str.split('').reduce((result, n) => {
        return result.replace('X', n);
    }, '+7 (XXX) XXX-XX-XX');
};