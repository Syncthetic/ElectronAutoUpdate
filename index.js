let request = require('request-promise')

module.exports = class UpdateService {
  constructor () {}
  static check_app_version (api, current_version, callback) {
    request(api, { json: true }).then(
      (res) => {
        if ( res && res.version ) {
          const bool = res.version === current_version
          if ( callback ) { callback(bool) }
        } else {
          // version not available
          if (callback) { callback(false) }
        }
      }
    ).catch((err) => {
      console.error(err)
    })
  }
}