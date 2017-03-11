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
    SYSTEMATIC_INVESTING: {},
    PAYMENT: {
        LOAD_ITEMS: 'load_transactions',
        LOAD_ITEMS_ERROR: 'load_transactions_error',
        HANDLE_ERROR: 'handle_payment_error',
    },
    NOTIFICATION: {
        LOAD_ITEMS: 'LOAD_NOTIFICATIONS',
        LOAD_ITEMS_ERROR: 'LOAD_NOTIFICATIONS_ERROR',
        HANDLE_ERROR: 'HANDLE_NOTIFICATIONS_ERROR',
    },
    COMMMENT: {
        LOAD_ITEMS: 'LOAD_COMMENTS',
        LOAD_ITEMS_ERROR: 'LOAD_COMMENTS_ERROR',
        HANDLE_ERROR: 'HANDLE_COMMENTS_ERROR',
    },
    ADMIN_CONSOLE: {
        LOAD_ITEMS: 'LOAD_ADMIN_DEALS',
        LOAD_ITEMS_ERROR: 'LOAD_ADMIN_DEALS_ERROR',
        HANDLE_ERROR: 'HANDLE_ADMIN_DEAL_ERROR',
        NO_PERMISSION: 'NO_PERMISSION',
        CHANGE_DEAL: 'CHANGE_DEAL',
        NOT_CHANGE_DEAL: 'NOT_CHANGE_DEAL',
        PREVIEW_DEAL: 'PREVIEW_DEAL',
        SHOW_REJECT_FORM: 'SHOW_REJECT_FORM',
        CLOSE_REJECT_FORM: 'CLOSE_REJECT_FORM'
    },
    ARTICLE: {
        LOAD_ITEMS: 'LOAD_ARTICLES',
        LOAD_ITEMS_ERROR: 'LOAD_ARTICLES_ERROR',
        HANDLE_ERROR: 'HANDLE_ARTICLE_ERROR',
    },
}
