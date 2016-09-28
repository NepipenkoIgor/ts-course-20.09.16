type baseElement = {title: string; items?: baseElement[]};
type menuList= baseElement[];

function generateMenu(list: menuList): string {
  let str: string = `<ul>`;
  for (let val of list) {
    if (val.title) {
      str += `<li><a${val.items? ' class="title"' : ''}>${val.title}</a>
            ${val.items ? generateMenu(val.items) : ''}</li>`;
    }
  }
  str += `</ul>`;
  return str;
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
                    {
                        title: 'Собаки',
                        items: [
                            {title: 'Американский бульдог'},
                            {title: 'Кокер спаниель'},
                            {title: 'Овчарка'}
                        ]
                    },
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
            },
        ]
    },
    {
        title: 'Рыбы',
        items: [
            {
                title: 'Аквариумные',
                items: [
                    {title: 'Гуппи'},
                    {title: 'Скалярии'},
                    {title: 'Барбусы'}
                ]
            },
            {
                title: 'Морские',
                items: [
                    {title: 'Морская форель'},
                    {title: 'Морской окунь'},
                    {title: 'Кефаль'}
                ]
            },
            {
                title: 'Прудовые',
                items: [
                    {title: 'Линь'},
                    {title: 'Сом'},
                    {title: 'Радужная форель'},
                ]
            },
            {
                title: 'Речные',
                items: [
                    {title: 'Карп'},
                    {title: 'Карась'},
                    {title: 'Щука'},
                ]
            }
        ]
    }
];

let navMenuList = document.querySelector(".menu") as HTMLElement;
navMenuList.innerHTML = generateMenu(menuList);
navMenuList.onclick = (event: MouseEvent) => {
    let el = event.target as HTMLElement;
    let classList = el.classList;

    if (!classList.contains('title')) {
        return;
    }

    let parentLi = el.parentNode as HTMLLIElement;
    parentLi.classList.toggle("menu-open");
};