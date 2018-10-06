import Vue from 'vue'
// import Moment from 'moment'
import format from 'date-fns/format'

Vue.filter('dataFormat',function (value,formatStr='YYYY-MM-DD HH:mm:ss') {
  // return Moment(value).format(formatStr)
  return format(value,formatStr)
})
