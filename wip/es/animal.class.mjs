export class Animal {
    constructor(type, wild) {
        this.type = type;
        this.wild = wild;
    }

    get metaData() {
        return `Type: ${this.type}, Wild: ${this.wild};`;
    }

    roar(sound) {
        return `Here me ${sound}!!!`;
    }

    static favoriteAnimal(type) {
        return `My favorite animal is ${type}`;
    }
}

export class Cat extends Animal {
    constructor(type, wild, tail) {
        super(type, wild);
        this.tail = tail;
    }

    roar(sound) {
        return `The beast is here!!! ${sound}!!!`;
    }
}
