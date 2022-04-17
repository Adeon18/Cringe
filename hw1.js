
function reverseStringSplit(string) {
    return string.split("").reverse().join("");
}

function reverseStringForLoop(string) {
    let result = "";

    for(let i = string.length - 1; i > -1; i--) {
        result += string[i];
    }

    return result;
}

function reverseStringWhileLoop(string) {
    let result = "";

    let i = string.length - 1
    
    while (i > -1) {
        result += string[i];
        i--;
    }

    return result;
}

function reverseStringRecursion(string) {
    if (!string) {
        return ""
    } else {
        return reverseStringRecursion(string.substring(1)) + string.charAt(0);
    }
}

function reverseStringStupidSplit(string) {
    return [...string].reverse().join("");
}

function reverseStringReduce(string) {
    return string.split("").reduce((r, char)=> char + r, ''); 
}

function reverseStringStupid(string) {
    let result = "";

    let part = ""
    for(let i = string.length; i > 0; i--) {
        part = string.substring(0, i);
        result += part.substr(-1, 1);
    }

    return result;
}

function reverseStringAAAAAAAAA(string) {
    return string.split("").reverse().join("").split("").reverse().join("").split("").reverse().join("");
}

function reverseStringReverseForLoop(string) {
    let result = "";

    for(let i = 0; i < string.length; i++) {
        result += string[string.length - 1 - i];
    }

    return result;
}

function reverseStringReverseWhileLoop(string) {
    let result = "";

    let i = 0
    
    while (i < string.length) {
        result += string[string.length - 1 - i];
        i++;
    }

    return result;
}

function reverseStringStupidForLoop(string) {
    let result = []

    for (let j = 0, i = string.length - 1; i > -1; i--, j++){
        result[j] = string[i];
    }

    return result.join("")
}


console.log(reverseStringSplit("Writing code"))
console.log(reverseStringForLoop("Thinking about death"))
console.log(reverseStringWhileLoop("Finding the nearest window"))
console.log(reverseStringRecursion("YEET"))
console.log(reverseStringStupidSplit("Dying"))
console.log(reverseStringReduce("Dead"))
console.log(reverseStringStupid("Why am I not dead?"))
console.log(reverseStringAAAAAAAAA("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!"))
console.log(reverseStringReverseForLoop("I mean, I still want to die..."))
console.log(reverseStringReverseWhileLoop("*Gunshot*"))
console.log(reverseStringStupidForLoop("*He's dead*"))
