import axios from 'axios'
import { actions } from 'apps/business_vault/actions/DealActions'
import PropositionActions from 'apps/business_vault/actions/PropositionAction'
import { toCamelCase } from 'common/utils/ObjectUtils'
import logger from './logger.js'

const HOST = 'http://127.0.0.1:8000/bv-api/'
const _req = axios.create({
    baseURL: HOST,
    timeout: 2500
})

const fetchUniversalMenu = () => {
    return axios.get('/api/menus', {}).
            then(resp => {
                actions.successRetriveUniversalMenu(resp)
            }).catch(error => {
                logger.debug(error)
            })
}

const loadAfArticles = () => {
    // console.log('loading Articles')
    logger.debug('loading articles')
    return axios.get('/api/business-vault-posts/?_=1474971013792', {}).
            then(resp => {
                actions.loadArticles(resp)
                // console.log(resp)
            }).catch(error => {
                // console.log('error when load articles')
                logger.error(error.stack)
            })
}

const loadDeals = (type, size) => {
    logger.debug('loading deals')
    const params = {
        /*         funding_type: type,*/
        page_size: size
    }
    const _type = (type === 'PU') ? 'public' : 'private'
    return _req.get('completed-deals/', { params }).
                then(resp => actions.listPublicDeals(toCamelCase(resp.data), _type))
}

const loadOptions = () => {
    const options = axios({
        method: 'options',
        baseURL: HOST,
        url: 'deal-options/'
    })
    return options.then(resp => {
        // console.log(resp)
        PropositionActions.loadReference(
            resp.data.actions.POST.operation_locations.choices, 'country'
        )
    }).catch(err => {
        // console.log('here')
        // console.log(err)
        logger.error(err.stack)
    })
}

const loadDeal = (id) => {
    logger.error('loading deal')
    logger.error(id)
    return _req.get(`public-limited-deals/${id}/`).
         then(resp => {
            return toCamelCase(resp.data)
         }).catch(err => {
        logger.error(err)
    })
    // _req.get(`public-deals/${id}/`).
    //      then(resp => actions.fetchPublicDealForDisplay(toCamelCase(resp.data)))

}

export {
    fetchUniversalMenu,
    loadAfArticles,
    loadDeals,
    loadDeal,
    loadOptions
}
