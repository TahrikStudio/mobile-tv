export default {
  APP_STORAGE_KEY: 'enlighten',
  REMOTE: 'https://mighty-shelf-85145.herokuapp.com/',
  AD_INTERVAL: 300000,
  APP_LINK: ' - Shared via Enlighten News App: https://bit.ly/2z4ARiS',
  PREVIEW_LINK: 'https://enlighten.opensourcefeed.org/',
  chartOptions: {
    title: 'YouTube Live Viewers',
    annotations: {
      alwaysOutside: true
    },
    animation: {
      duration: 500,
      startup: true
    },
    chartArea: {
      left: 120
    },
    height: 300,
    vAxis: {
      textStyle: {color: 'black'}
    },
    legend: {
      position: 'none'
    }
  }
}
