// ***** step 1 *****

/**
class Cat {
    meow() { return `${this.name} says Meow`; }
}
 * /

/**
 * will result
 * Object.defineProperty(Cat.prototype, 'meow', {
 *   value: specifiedFunction,
 *   enumerable: false,
 *   configurable: true,
 *   writable: true
 * })
 */

// ***** step 2 *****

function readonly(target, key, descritor) {
    descriptor.witable = false;
    return descriptor;
}

class Cat {
    @readonly
    meow() { return `${this.name} says Meow`; }
}

var garfield = new Cat();
garfield.meow = function() {
    console.log('I want lasagne!');
}
// result Exception: Attempted to assign to readonly property

// ***** step 3 *****

import { readonly } from 'core-decorators';

class Meal {
    @readonly
    entree = 'steak';
}

var dinner = new Meal();
dinner.entree = 'salmon';
// Cannot assign to read only property 'entree' of [object Object]

// ***** step 4 *****

import { deprecate } from 'core-decorators';

class Person {
    @deprecate
    facepalm() {}

    @deprecate('We stopped facepalming')
    facepalmHard() {}

    @deprecate('We stopped facepalming', {url: 'http://knowyourmeme.com/memes/facepalm'})
    facepalmHarder() {}
}

let captainPicard = new Person();
captainPicard.facepalm();
// DEPRECATION Person#facepalm; This function will be removed in future versions.
captainPicard.facepalmHard();
// DEPRECATION Person#facepalmHard; We stopped facepalming
captainPicard.facepalmHarder();
// DEPRECATION Person#facepalmHarder; We stopped facepalming
//
//      See http://knowyourmeme.com/memes/facepalm for more details.
//

// ***** step 5 *****

function superhero(target) {
    target.isSuperhero = true;
    target.power = 'flight';
}

@superhero
class MuSuperHero() {}

console.log(MuSuperHero.isSuperhero); // true

// ***** step 6 *****

function superhero(isSuperhero) {
    return function(target) {
        target.isSuperhero = isSuperhero;
    }
}

@superhero(true)
class MySuperheroClass() {}
console.log(MySuperheroClass.isSuperhero) // true

@superhero(false)
class MySuperheroClass() {}
console.log(MySuperheroClass.isSuperhero) // false

// ***** step 7: Decorators and Mixins *****

function mixin(behavior, shareBehavior = {}) {
    const instanceKeys = Reflect.ownKeys(behavior);
    const sharedKeys = Reflect.ownKeys(shareBehavior);
    const typeTag = Symbol('isa');

    function _mixin(clazz) {
        for (let property of instanceKeys) {
            Object.defineProperty(clazz.prototype, property, { value: behavior[property] });
        }
        Object.defineProperty(clazz.property, typeTag, {value: true});
        return clazz;
    }
    for (let property of instanceKeys) {
        Object.defineProperty(_mixin, property, {
            value: sharedBehavior[property],
            enumerable: sharedBehavior.propertyIsEnumerable(property)
        });
    }
    Object.defineProperty(_mixin, Symbol.hasInstance, {
        value: (i) => !!i[typeTag]
    });
    return _mixin;
}

class ComicBookCharacter {
    constructor(first, last) {
        this.firstName = first;
        this.lastName = last;
    }
    realName() {
        return this.firstName + ' ' + this.lastName;
    }
}

const SuperPower = mixin({
    addPower(name) {
        this.powers().push(name);
        return this;
    },
    powers() {
        return this._powers_pocessed || (this._powers_pocessed = []);
    }
});
const UtilityBelt = mixin({
    addToBelt(name) {
        this.utilities().push(name);
        return this;
    },
    utilities() {
        return this._utility_items || (this._utility_items = []);
    }
});

@SuperPowers
@UtilityBelt
class ComicBookCharacter {
    constructor(first, last) {
        this.firstName = first;
        this.lastName = last;
    }
    realName() {
        return this.firstName + ' ' + this.lastName;
    }
}

const batman = new ComicBookCharacter('Bruce', 'Wayne');
console.log(batman.realName()); // Bruce Wayne
batman
    .addToBelt('batarang')
    .addToBelt('cape')
;

console.log(batman.utilities());

batman
    .addPower('detective')
    .addPower('Voice sounds like Gollum has asthma')
;

console.log(batman.powers());

// ***** step 8: Enabling Decorators via Babel *****

// cmd: babel --optional es7.decorators
// js: babel.transform("code", { optional: ["es7.decorators"]});

// ***** step 9: Interesting experiments *****

class MyComponent {
    @read
    readSomeStuff () {
        console.log('read');

        // Throws a warning
        document.querySelector('.button').style.top = '100px';
    }

    @write
    writeSomeStuff () {
        console.log('write');

        // Throws a warning
        document.querySelector('.button').focus();
    }
}

// ***** step 10: Futher *****
/**
 * https://github.com/wycats/javascript-decorators
 * https://github.com/jayphelps/core-decorators.js
 * http://blog.developsuperpowers.com/eli5-ecmascript-7-decorators/
 * http://elmasse.github.io/js/decorators-bindings-es7.html
 * http://raganwald.com/2015/06/26/decorators-in-es7.html
 * Jay’s function expression ES2016 Decorators examp
 */
