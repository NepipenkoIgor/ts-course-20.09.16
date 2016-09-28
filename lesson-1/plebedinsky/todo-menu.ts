type menuItem = {title:string, items?: menuItem[]};

let menu:menuItem[] = [
  {
    title: 'Животные', items: [
    {
      title: 'Млекопитающие', items: [
      { title: 'Коровы' },
      { title: 'Ослы' },
      { title: 'Собаки' },
      { title: 'Тигры' }
    ]
    },
    {
      title: 'Другие', items: [
      { title: 'Змеи' },
      { title: 'Птицы' },
      { title: 'Ящерицы' },
    ],
    },
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
    },
  ]
  }
];

function generateMenu(list: menuItem[]): string {
  let str: string = `<ul>`;

  for (let a of list) {
    str += `<li>`;

    if (a.items && a.items.length) {
      str += `<a class="title">${a.title}</a>${generateMenu(a.items)}`;
    } else {
      str += `<span class="leaf">${a.title}</span>`;
    }

    str += `</li>`;
  }

  str += `</ul>`;
  return str;
}

let navMenuList = document.querySelector(".menu") as HTMLElement;
navMenuList.innerHTML = generateMenu(menu);
navMenuList.onclick = (ev: MouseEvent) => {
  let el = ev.target as HTMLElement;
  let classList = el.classList;
  if (!classList.contains('title')) {
    return;
  }
  let parentLi = el.parentNode as HTMLLIElement;
  parentLi.classList.toggle("menu-open")
};