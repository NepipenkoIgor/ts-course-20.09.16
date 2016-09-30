/**
 писать функцию summator(), которая сумирует переданые ей аргументы.
 Аргументы могут быть либо строкового либо числового типа. Количество их не ограничено
 */

function summator(...args: number[]): number;
function summator(...args: string[]): number;
function summator(...args: any[]): number{
    let sum = 0;

    for(let a of args){
        sum += parseInt(a, 10);
    }

    return sum;
}
