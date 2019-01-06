# ElectronAutoUpdate
> Easily manage electron updates using [ElectronAutoUpdateAPI](https://github.com/Syncthetic/ElectronAutoUpdateAPI) and [ElectronAutoUpdateClient](https://github.com/Syncthetic/ElectronAutoUpdateClient)

`npm i --save-dev @syncthetic/electron-auto-updater`

In your your main file, when the application starts, import the service
`const UpdateService = require('@syncthetic/electron-auto-updater')`

The `UpdateService` contains a `check_app_version(api, version, callback)` method, which should be supplied an API link, the current version, and the callback method for when the action completes. It will return a boolean if the version does not match the current version. 
> If you are using your own API, just make sure the application it returns holds a property of `version`, which is the latest application version.


```javascript
service.check_app_version("http://my-little-website/api/application/my-app-name", '0.0.1',
  (res) => {
      // something to do with the result here, like open a download toast
  }
)
```