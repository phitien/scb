export default {
    module(m) {return m.toUpperCase()},
    constant(c) {return c.toLowerCase()},
    has(m, c) {
        m = this.module(m)
        c = this.constant(c)
        return this.hasOwnProperty(m) && this[m].hasOwnProperty(c)
    },
    get(m, c) {
        m = this.module(m)
        c = this.constant(c)
        return this.has(m, c) ? this[m][c] : false
    },
    sure(m, c) {
        m = this.module(m)
        c = this.constant(c)
        this[m] = this[m] || {}
        return this[m][c] = c
    },
}
