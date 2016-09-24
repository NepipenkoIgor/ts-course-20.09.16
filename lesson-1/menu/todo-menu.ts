var menuList = [
    {
        title: 'Животные', items: [
        {
            title: 'Млекопитающие', items: [
            {title: 'Коровы'},
            {title: 'Ослы'},
            {title: 'Собаки'},
            {title: 'Тигры'}
        ]
        },
        {
            title: 'Другие', items: [
            {title: 'Змеи'},
            {title: 'Птицы'},
            {title: 'Ящерицы'},
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
function generateMenu(list) {
    var str = "<ul>";
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var a = list_1[_i];
        if (a.items) {
            str += "<li><a class=\"title\">" + a.title + "</a>";
            str += generateMenu(a.items);
        }
        else {
            str += "<li><a>" + a.title + "</a>";
        }
        str += "</li>";
    }
    str += "</ul>";
    return str;
}
var navMenuList = document.querySelector(".menu") as HTMLElement;
navMenuList.innerHTML = generateMenu(menuList);
navMenuList.onclick = function (ev) {
    var el = ev.target as HTMLElement;
    var classList = el.classList;
    if (!classList.contains('title')) {
        return;
    }
    var parentLi = el.parentElement;
    parentLi.classList.toggle("menu-open");
};
