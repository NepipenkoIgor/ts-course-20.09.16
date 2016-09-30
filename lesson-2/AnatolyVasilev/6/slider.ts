interface Coords {
    top: number,
    left: number
}

class Slider {

    protected _element: HTMLElement;
    protected _thumb: HTMLElement;

    public constructor(elm: HTMLElement) {

        this._element = elm;
        this._element.classList.add('slider');

        this._thumb = document.createElement('div');
        this._thumb.classList.add('thumb');

        this._element.appendChild(this._thumb);

        this._setActivities();
    }

    protected _setActivities(): void {

        this._thumb.onmousedown = (e: MouseEvent): boolean => {

            var thumbCoords: Coords = Slider._getCoords(this._thumb);
            var shiftX = e.pageX - thumbCoords.left;
            // shiftY здесь не нужен, слайдер двигается только по горизонтали

            var sliderCoords: Coords = Slider._getCoords(this._element);

            document.onmousemove = (e: MouseEvent): void=>{
                //  вычесть координату родителя, т.к. position: relative
                var newLeft: number = e.pageX - shiftX - sliderCoords.left;

                // курсор ушёл вне слайдера
                if (newLeft < 0) {
                    newLeft = 0;
                }

                var rightEdge: number = this._element.offsetWidth - this._thumb.offsetWidth;
                if (newLeft > rightEdge) {
                    newLeft = rightEdge;
                }

                this._thumb.style.left = newLeft + 'px';
            };

            document.onmouseup = (): void => {
                document.onmousemove = document.onmouseup = ()=>null;
            };

            return false; // disable selection start (cursor change)
        };

        this._thumb.ondragstart = function(): boolean {
            return false;
        };
    }

    protected static _getCoords(elem: HTMLElement): Coords{
        var box = elem.getBoundingClientRect();
        return {
            top: box.top + window.pageYOffset,
            left: box.left + window.pageXOffset
        };
    }

    public getElem(){
        return this._element;
    }

}

let sliderElement = document.querySelector('.slider') as HTMLElement;
let slider = new Slider(sliderElement);