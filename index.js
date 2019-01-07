let request = require('request-promise')

module.exports = class UpdateService {
  constructor () {}
  static check_app_version (api, current_version, callback) {
    request(api, { json: true }).then(
      (res) => {
        if ( res && res.version ) {
          const app_up_to_date = res.version === current_version
          if ( !app_up_to_date) { callback(res) }
        }
      }
    ).catch((err) => {
      console.error(err)
    })
  }
}