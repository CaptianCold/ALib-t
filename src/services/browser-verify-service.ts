/**
 * Created by divya.raghunathan on 11/16/2016.
 */

declare class InstallTrigger {}

export class BrowserVerifyService {

    public isCompatibleBrowser : boolean = false;
    public navigateToApp: boolean = false;
    public isIEorEdge: boolean = false;

    constructor() {
        this._setBrowserCompatibility();
        if(this.isCompatibleBrowser) {
            this.navigateToApp = true;
        }
    }

    private _setBrowserCompatibility() : void {
        let w : any = window;
        let d : any = document;

        let isChrome = !!w.chrome && !!w.chrome.webstore;// Chrome 1+

        /* tslint:disable */
        let isIE = /*@cc_on!@*/false || !!d.documentMode; // Internet Explorer 6-11
        /* tslint:disable */
        var isEdge = !isIE && !!w.StyleMedia;// Edge 20+
        var isIE11 = !!w.MSInputMethodContext && !!d.documentMode;

        /* tslint:disable */
        let isFirefox = typeof InstallTrigger !== 'undefined';// Firefox 1.0+
        this.isCompatibleBrowser = isChrome || isFirefox || isIE11 || isEdge;
        this.isIEorEdge = isIE || isEdge;
    }
}
