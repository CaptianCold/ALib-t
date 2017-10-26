import {BrowserVerifyService} from '../services/browser-verify-service';

export function appendTimestampForIE(url): string {
    var service = new BrowserVerifyService();
    if (service.isIEorEdge) {
        if (url.indexOf('?') > -1) {
            url += `&`;
        } else {
            url += `?`;
        }
        url += `timeStamp=${(new Date()).getTime()}`;
    }
    return url;
}
