type menuList = { title: string, items?: menuList}[];

type menuOpt = {element: HTMLElement,menuList: menuList}


class Menu {
    protected _element: HTMLElement;
    protected _menuList: menuList;

    public constructor(opt: menuOpt) {
        this._element = opt.element;
        this._menuList = opt.menuList;
        this._element.innerHTML = this._generateMenu(this._menuList);
        this._element.addEventListener('click', Menu._clickHandler)
    }

    protected static _clickHandler(ev: MouseEvent): void {
        let element = ev.target as HTMLElement;
        let classList = element.classList;
        if (!classList.contains('title')) {
            return;
        }
        let parentLi = element.parentNode as HTMLLIElement;
        parentLi.classList.toggle('menu-open')
    }

    protected _generateMenu(menuList: menuList): string {
        let z: string = `<ul>`;
        for (let a of menuList) {
            z += `<li><a ${a.items ? 'class=title': ''}>${a.title}</a>`;
            if (!a.items) {
                z += `</li>`;
                continue;
            }
            z += `${this._generateMenu(a.items)}</li>`
        }
        z += `</ul>`;
        return z
    }

    public getElem(){
        return this._element;
    }

    private _find(label: string, items: HTMLCollection, callback: (item: Element)=>void){
        for(let i = 0; i < items.length; i++){
            let child = items[i];
            if(child && child.children[0].textContent == label){
                callback(child);
            }
            if(child.children[1] && child.children[1].children){
                this._find(label, child.children[1].children, callback);
            }
        }
    }

    public open(label: string){
        this._find(label, this._element.children[0].children, (item)=>{
            item.classList.add('menu-open');
        });
    }

    public close(label: string){
        this._find(label, this._element.children[0].children, (item)=>{
            item.classList.remove('menu-open');
        });
    }

    public toggle(label: string){
        this._find(label, this._element.children[0].children, (item)=>{
            item.classList.toggle('menu-open');
        });
    }
}


let menuList: menuList = [
    {
        title: 'Животные',
        items: [
            {
                title: 'Млекопитающие',
                items: [
                    {title: 'Коровы'},
                    {title: 'Ослы'},
                    {title: 'Собаки'},
                    {title: 'Тигры'}
                ]
            },
            {
                title: 'Другие',
                items: [
                    {title: 'Змеи'},
                    {title: 'Птицы'},
                    {title: 'Ящерицы'},
                ],
            }
        ]
    },
    {
        title: 'Рыбы',
        items: [
            {
                title: 'Аквариумные',
                items: [
                    {title: 'Гуппи'},
                    {title: 'Скалярии'}
                ]
            },
            {
                title: 'Форель',
                items: [
                    {title: 'Морская форель'}
                ]
            }
        ]
    }
];

let element = document.querySelector('.menu') as HTMLElement;

let menuInst = new Menu({element, menuList});

menuInst.open('Млекопитающие');
menuInst.close('Млекопитающие');
menuInst.toggle('Млекопитающие');