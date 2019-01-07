# ElectronAutoUpdate
> Easily manage electron updates using [ElectronAutoUpdateAPI](https://github.com/Syncthetic/ElectronAutoUpdateAPI) and [ElectronAutoUpdateClient](https://github.com/Syncthetic/ElectronAutoUpdateClient)

`npm i --save @syncthetic/electron-auto-updater`

In your your main file, when the application starts, import the service
`const UpdateService = require('@syncthetic/electron-auto-updater')`

The `UpdateService` contains a `check_app_version(api, version, callback)` method, which should be supplied an API link, the current version, and the callback method for when the action completes. The full response from the API is passed to the callback function.

> If you are using your own API, just make sure the application it returns holds a property of `version`, which is the latest application version. `callback` will only fire if the app is outdated.


```javascript
service.check_app_version("http://my-little-website/api/application/my-app-name", '0.0.1',
  (res) => {
      // something to do with the result here, like open a download toast
  }
)
```

# Angular-Electron
> If you use are using angular-electron for your application the following steps will get you squared away

install the package`npm i --save @syncthetic/electron-auto-updater`

edit `/src/app/providers/electron.service.ts`

```javascript
import * as UpdateService from '@syncthetic/electron-auto-updater'

@Injectable()
export class ElectronService {
  ...
  UpdateService
  
  constructor() {
    // Conditional imports
    ...
    this.UpdateService = window.require('@syncthetic/electron-auto-updater')
  }
}
```
# An example of our own service to handle updates
```javascript
import { Injectable } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  constructor(
    public electronService: ElectronService,
  ) { }

  private currentVersion: string
  private currentName: string
  private api: string

  public isAppVersionOld: boolean
  public latestAppVersion: string
  public newDownloadLink: string
  public latestApp: any

  check () {
    this.currentVersion = this.electronService.remote.app.getVersion()
    this.currentName = this.electronService.remote.app.getName()
    this.api = `http://my-little-api.com/api/application/${this.currentName}`

    this.electronService.UpdateService.check_app_version(this.api, this.currentVersion, (app) => {
      this.isAppVersionOld = app.version !== this.currentVersion
      this.latestAppVersion = app.version
      this.newDownloadLink = app.download
      this.latestApp = app
    })
  }

  requestDownload () {
    window.open(this.newDownloadLink)
  }
}
```

In a main process, during load you can run `UpdateService.check()` in your component view, you can utilize UpdateService.requestDownload() to start a download if desired.