export function initializeRating () {
  if (window.AppRate) {
    /* eslint no-undef: ["error", { "typeof": true }] */
    AppRate.preferences = {
      storeAppURL: {
        android: 'market://details?id=com.libreappfoundation.mobiletv'
      },
      callbacks: {
        onButtonClicked: function (buttonIndex) {
          AppRate.promptForRating(false)
        }
      },
      useLanguage: 'en',
      simpleMode: true,
      openUrl: function (url) {
        window.open(url, '_blank', 'location=yes')
      }
    }
    AppRate.promptForRating(false)
  }
}

export function openRateDialog () {
  if (window.AppRate) {
    /* global AppRate */
    /* eslint no-undef: ["error", { "typeof": true }] */
    AppRate.promptForRating()
  }
}
