/*
 Основываясь на примере который был показан на лекции
 Создайте функцию которая будет генерить меню любой вложенности + обработчик события для открывания/закрывания его
 Пример списка меню ниже.
 P.S. Очень важно что бы вложеность могла быть любой
 */

type oneObj ={title: string, items?: oneObj[]};
type itemList = oneObj[];

let menu:itemList = [
    {
        title: 'Животные', items: [
        {
            title: 'Млекопитающие', items: [
                {title: 'Коровы'},
                {title: 'Ослы',
                    items:[{title:'весёлые'},
                        {title:'грустные',
                            items:[{title:'лопоухие'},
                                {title:'без хвоста',
                                    items:[{title:'кареглазые'},{title:'синеухие'},{title:'рыжие'}]}]}]},
                {title: 'Собаки'},
                {title: 'Тигры'}
            ]
        },
        {
            title: 'Другие', items: [
                {title: 'Змеи'},
                {title: 'Птицы'},
                {title: 'Ящерицы', items:[{title:'большие'},{title:'маленькие'}]}
            ]
        }
    ]
    },
    {
        title: 'Рыбы', items: [
        {
            title: 'Аквариумные', items: [
                {title: 'Гуппи'},
                {title: 'Скалярии'}
            ]
        },
        {
            title: 'Форель', items: [
                {title: 'Морская форель'}
            ]
        }
    ]
    }
];

function createMenu(list: itemList): string {
    // создание меню
    let arr = [];
    arr.push('<ul>');
    for (let a of list) {
        addLi(a, arr);
        for (let b of a.items) {
            createObj(b, arr);
        }
        arr.push("</ul></li>");
    }
    arr.push('</ul>');

    return arr.join("");
}

function addLi(obj:oneObj, arr:string[]):void {
    // добавление одного li
    if ( obj.items ) {
        arr.push(`<li><a class="title">${obj.title}</a><ul>`);
    }else {
        arr.push(`<li><a>${obj.title}</a></li>`);
    }
}

let createObj = function _me_(obj:oneObj, arr:string[]):void {
    // создание пункта меню из объекта oneObj
    addLi(obj, arr);
    if (obj.items) {
        for (let a of obj.items) {
            _me_(a, arr);
        }
        arr.push('</ul></li>');
    }
}

let navMenu = document.querySelector(".menu") as HTMLElement;
navMenu.innerHTML = createMenu(menu);
navMenu.onclick = (ev: MouseEvent) => {
    let el = ev.target as HTMLElement;
    let classList = el.classList;
    if (!classList.contains('title')) {
        return;
    }
    let parentLi = el.parentNode as HTMLLIElement;
    parentLi.classList.toggle("menu-open")
};
