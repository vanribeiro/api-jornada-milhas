function getRandom(a, b) {
    const MIN = Math.ceil(a);
    const MAX = Math.floor(b);
    return Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
}
export { getRandom };
