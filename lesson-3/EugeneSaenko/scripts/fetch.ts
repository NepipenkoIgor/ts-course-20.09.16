// https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
// https://github.com/iliakan/ts-course/blob/master/ts-lesson-3/demo-flikr-app/scripts/fetch.ts
/**
 *  uri: 'https://api.flickr.com/services/rest/?',
 * queryMethod: 'flickr.photos.search',
 * apiKey: '7fbc4d0fd04492d32fa9a2f718c6293e'
 */

type opt = {
    elem: HTMLElement,
    uri: string,
    queryMethod: string,
    apiKey: string
}

interface IPhoto {
    farm: number;
    id: string;
    isfamily: number;
    owner: string;
    secret: string;
    server: string;
    title: string;
}

class FlikrApp {
    protected elem: HTMLElement;
    protected input: HTMLInputElement;
    protected searchButton: HTMLButtonElement;
    protected imagesBox: HTMLDivElement;
    protected uri: string;
    protected queryMethod: string;
    protected apiKey: string;
    protected photos: IPhoto[];

    public constructor(opt: opt) {
        this.elem = opt.elem;
        this.uri = opt.uri;
        this.queryMethod = opt.queryMethod;
        this.apiKey = opt.apiKey;
        this.input = <HTMLInputElement>this.elem.querySelector('.flickr-search-input');
        this.imagesBox = <HTMLDivElement>this.elem.querySelector('.image-area');
        this.searchButton = <HTMLButtonElement>this.elem.querySelector('.flickr-search-button');
        let debounced = _.debounce(this.search.bind(this, this.render.bind(this)), 500);
        this.searchButton.addEventListener('click', debounced)
    }

    protected render(body: any): void {
        this.photos = body.photos.photo.sort((a, b) => a.title > b.title) as IPhoto[];

        Promise.all(this.photos.map((photo: IPhoto) => {
            let url = new Request(`${this.uri}method=flickr.people.getInfo&api_key=${this.apiKey}&user_id=${photo.owner}&format=json&nojsoncallback=1`);

            return fetch(url).then((res: Response): PromiseLike<any> => res.json());
        })).then((owner: any) => {
            this.photos.map((val, i): void => {
                val.owner = owner[i].person.username._content;
            });
            let content: string = '';
            for (let photo of this.photos) {
                content += `<div class="image-box">` +
                    `<img src="https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg">` +
                    `<p>${photo.title}</p>` +
                    `<p>${photo.owner}</p>` +
                    `</div>`
            }
            this.imagesBox.innerHTML = content;
        });
    }

    protected search(cb: (body: any)=>void) {
        if (!this.input.value) {
            return;
        }
        let text: string = this.input.value;
        this.input.value = '';
        let url = new Request(`${this.uri}method=${this.queryMethod}&api_key=${this.apiKey}&text=${text}&page=1&format=json&nojsoncallback=1`);
        this.getPhotos(url, cb)
    }

    protected getPhotos(input: string | Request, cb: (body: any)=>any): void {
        fetch(input)
            .then((res: Response): PromiseLike<any> => res.json())
            .then(cb)
    }
}

let elem = <HTMLElement>document.querySelector('.flikr-box');
let flickr = new FlikrApp({
    elem,
    uri: 'https://api.flickr.com/services/rest/?',
    queryMethod: 'flickr.photos.search',
    apiKey: '7fbc4d0fd04492d32fa9a2f718c6293e'
});