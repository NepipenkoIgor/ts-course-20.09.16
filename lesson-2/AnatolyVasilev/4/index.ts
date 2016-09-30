/**

 Написать функцию котороя будет разворачивать буквы в словах предложения, но только лишь буквы
 цифры и специальные символы должны остаться на месте
 s1tar3t 2 hellow  ->  t1rat3s 2 wolleh
 s1ta$%r3t 2 hel^low  ->  t1ra$%t3s 2 wol^leh
 s1tar3t 2   low5  ->  t1rat3s 2   wol5

 */

function reverse(sentence: string): string{
    let spec: {key: number, value: string}[] = [];
    let letters: string[] = [];
    let regexp = /[^a-zA-Z]/g;
    let sentenceArray = sentence.split('');

    for(let i = 0; i < sentenceArray.length; i++){
        let letter = sentenceArray[i];
        if(letter != ' ' && letter.search(regexp) != -1){
            spec.push({
                key: i,
                value: letter
            });
        }else{
            letters.push(sentenceArray[i]);
        }
    }

    let temp = letters.join('');
    let groups = temp.split(' ');
    let reversed: string[] = [];
    for(let g of groups){
        let wordArray = g.split('');
        wordArray.reverse();
        let newWord = wordArray.join('');
        reversed.push(newWord);
    }

    let result:string[] = reversed.join(' ').split('');

    for(let s of spec){
        result.splice(s.key, 0, s.value);
    }

    return result.join('');
}