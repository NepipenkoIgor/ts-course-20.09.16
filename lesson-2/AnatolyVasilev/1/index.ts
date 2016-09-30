/**
 Написать функцию isInArray(), которая начиная со второго принимает переменное количество аргументов.
 Возвращает true, если все аргументы, кроме первого входят в первый.
 Первым всегда должен быть массив.
*/

function isInArray(array: any[], ...args: any[]): boolean{
    let returnValue = true;

    for(let a of args){
        if(array.indexOf(a) == -1){
            returnValue = false;
            break;
        }
    }

    return args.length>0?returnValue:false;
}