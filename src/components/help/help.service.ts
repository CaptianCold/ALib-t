/**
 * Created by neal.borelli on 10/25/2016.
 */

function openNewTab(url:string):void {
    // try it the simple way first
    if (!window.open(url, '_blank')) {
        console.log('Attempting form submit method of popup');
        // if it fails, it may be popup blocker at work, so try to fool it.
        let form = document.createElement('form');
        form.setAttribute('method', 'get');
        form.setAttribute('action', url);
        form.setAttribute('target', '_blank');
        document.body.appendChild(form);
        try {
            form.submit();
        } finally {
            document.body.removeChild(form);
        }

        // let newWindow = window.open();
        // setTimeout(() => newWindow.location.href = url, 100);
    }
}

export class HelpService {
    private _urlMapper:(string) => string;
    private _helpUrls:Array<string> = [];

    constructor() {
        let helpHandler = (event:Event) => {
            let url = this.currentHelpUrl;
            if (url) {
                this.openHelp(url);
                event.preventDefault();
                event.stopPropagation();
                return false;
            } else {
                return true;
            }
        };

        document.addEventListener('help', helpHandler);
        if (!('onhelp' in document)) {
            document.addEventListener('keydown',
                (event:KeyboardEvent) => this.isHelpKeyEvent(event) ? helpHandler(event) : true);
        }
    }

    public set urlMapper(urlMapper:(string) => string) {
        this._urlMapper = urlMapper;
    }

    public get currentHelpUrl(): string {
        let url = (Array.isArray(this._helpUrls) && this._helpUrls.length > 0)
            ? this._helpUrls[this._helpUrls.length - 1]
            : null;
        return url;
    }

    public mapUrl(url:string): string {
        return (typeof this._urlMapper === 'function') ? this._urlMapper(url) : url;
    }

    public isHelpKeyEvent(event:KeyboardEvent):boolean {
        return event instanceof KeyboardEvent && !('onhelp' in event.target) && (event.code === 'F1');
    }

    public openHelp(url:string):void {
        url = this.mapUrl(url);
        if (!url) return;
        openNewTab(url);
    }

    public addHelpUrl(url: string): void {
        this._helpUrls.push(url);
    }

    public removeHelpUrl(url: string): void {
        let index = this._helpUrls.lastIndexOf(url);
        if (index >= 0) this._helpUrls.splice(index, 1);
    }

    public updateHelpUrl(oldUrl:string, newUrl:string):void {
        if (typeof oldUrl === 'string' && typeof newUrl === 'string') {
            let index = this._helpUrls.lastIndexOf(oldUrl);
            if (index >= 0) {
                this._helpUrls[index] = newUrl;
            } else {
                this._helpUrls.push(newUrl);
            }
        }
    }
}
