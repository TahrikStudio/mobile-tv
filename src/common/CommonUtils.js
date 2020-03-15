import Constants from './Constants'

export default {
  setAdShown () {
    window.localStorage.setItem(`${Constants.APP_STORAGE_KEY}-adShown`, new Date().getTime())
  },
  canShowAd () {
    if (!window.localStorage.getItem(`${Constants.APP_STORAGE_KEY}-adShown`)) {
      return true
    }
    let time = window.localStorage.getItem(`${Constants.APP_STORAGE_KEY}-adShown`)
    console.log(new Date().getTime() - time)
    return (new Date().getTime() - time) > Constants.AD_INTERVAL
  }
}
