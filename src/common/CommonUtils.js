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
  },
  randomColor () {
    return Math.floor(Math.random() * 16777215 / 2 + 888888).toString(16)
  },
  storeLocalData (key, data) {
    window.localStorage.setItem(`${Constants.APP_STORAGE_KEY}-${key}`, data)
  },
  getLocalData (key) {
    return window.localStorage.getItem(`${Constants.APP_STORAGE_KEY}-${key}`)
  },
  showBannerAd () {
    if (!window.cordova) return
    var options = {
      bannerid: '931260990742693_931271424074983',
      isTesting: false
    }
    window.cordova.plugins.codeplayfacebookads.showBannerAds(options, result => {
      console.log('Ad shown succesfully')
    }, result => {
      console.log('Failed to show ad ' + result)
    })
  },
  hideBannerAd () {
    if (!window.cordova) return
    window.cordova.plugins.codeplayfacebookads.hideBannerAds('', result => {
      console.log('Ad hidden succesfully')
    }, result => {
      console.log('Failed to hide banner ad')
    })
  },
  showInterstitialAd () {
    // Do nothing
  }
}
