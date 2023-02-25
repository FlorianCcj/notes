json-schema.md
================

* "$schema": "http://json-schema.org/schema#": permet d'indiquer que c'est un json schema
* title (string): nommer un fichier
* description (string): permet de decrire l'utilité du json schema
* enum: (list): liste de valeur autorisé
* anyOf (list): au moins une des config doit etre verifiées
* allOf (list): toutes les config doivent etre verifées
* oneOf (list): une seule des config doit etre verifie
* not (list): permet de declarer quelques chose qui ne doit pas etre present
* required (list): permet de définir une liste d'éléments obligatoires clés au format string
* pattern (string): commencant par "^" et finissant par "$" permet de stipuler une REGEX

## les types
* boolean: json => true/false, python => True/False
* number: (integer valid aussi)
    * minimum (int ou float): permet de stipuler une valeur minimale attendue ;
    * exclusiveMinimum (boolean): true => valeur > minimum, false => valeur >= minimum ;
    * maximum (int ou float): permet de stipuler une valeur minimale attendue ;
    * exclusiveMaximum (boolean): true => "valeur < maximum", false => "valeur <= maximum" ;
    * multipleOf (int ou float): permet de stipuler qu'on attend un multiple de la valeur indiqué.
* string:
    * minLength (int): longueur minimale attendue
    * maxLength (int): longueur maximal attendue
    * format: (rarement prit en compte)
        * date-time (string): verifie la conformité d'une date selon la norme RFC3339
        * email (string): verifie la validité d'un mail selon la norme RFC3339
        * hostname (string): verifie la validité d'un nom de domaine selon la norme RFC1034
        * ipv4 (string): verifie la validité d'une adresse IP V4 selon la norme RFC2673
        * ipv6 (string): verifie la validité d'une adresse IP V6 selon la norme RFC2373
        * uri (string): verifie la validité d'une adresse réseau selon la norme RFC3986
* array:
    * items: permet de definir un type global pour toute la liste
    * minItems (int): nombre minimum d items
    * maxItems (int): nombre maximum d items
    * uniqueItems (boolean): autorise (false) ou non la presence de doublons dans une liste (unicité)
* object:
    * minProperties (int): nombre minimum de clés attendus
    * maxProperties (int): nombre maximum de clés attendus
    * additionalProperties (bool): autorise (true) ou non la présence de clés non definies dans le JSON SCHEMA
    * additionalProperties (dict): permet de definir les parametres des elements suplémentaires tels les types (ex "additionalProperties": ["type": "string"] les propriétés additionel devront etre des strings)
    * dependencies (list) : permet de créer des relations entres cles (ex: cle 1 obligatoire si cle 2 presente) Non reciproque, attention
    * patternProperties (object): permet de definir un pattern de nomage des propriétés ajouter des contraintes (ex. "^S_": {"type": "string"} tout les param commencant par S_ sont des string)


## Regex

* `^` : begining of string
* `$` : end of string
* `(...)` : group
* `|` : either the regular expression preceding or following the symbol
* `[abc]` : one of the characcter in brackets
* `[a-z]` : in range of char
* `[^abc]` : a character not listed
* `[^a-z]` : not in range of char
* `+` : one or more repetition
* `*` : zero or more repetition
* `?` : one or zero repetition
* `+?`, `*?`, `??` : `*`, `+`, `?` are greedy, so catch the fewer
* `{x}` : x occurence
* `{x, y}` : at least x, at most y occurence
* `{x,}` : x or more occurence
* `{x}?`, `{x, y}?`, `{x,}?` : lazy mode

## Reference

` # dans le meme fichier
{
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "address": [{"$ref": "#/definitions/address"}, {"$ref": "definitions.json#/adress"}]
    }
}
`

to extend a reference
` # dans le meme fichier
{
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "address": {"allOf": [{"$ref": "#/definitions/address"}, {
            "properties": {
                "type": {"enum": ["residential", "business"]}
            },
            "required": ["type"]
        }]}
    }
}
`

## Mise en pratique

pip install jsonschema
```
# json_ok.json
{
    "AGE": 12,
    "NAME": "DVP",
    "MAIL": "aa",
    "FAVORITE_COLOR": "red",
    "PHONE": "0000",
}
```
```
# json_schema.json
{
    "$schema": "http://json-scheam.org/scheam#",
    "title": "JSON SCHEMA de demonstration",
    "description": "Ceci est un JSON SCHEMA pour le site de developpement",
    "type": "object",
    "anyOf": [
        {"required": ["AGE", "NAME", "PHONE"]},
        {"required": ["AGE", "NAME", "PHONE_CELL"]}
    ],
    "properties": {
        "AGE": {
          "type": "number",
          "minimum": 0,
          "maximum": 130,
          "multipleOf": 1
        },
        "NAME": {"type": "string"},
        "MAIL": {"format":"email"},
        "FAVORITE_COLOR": {
          "type": "string",
          "enum": ["red", "blue", "yellow"]
        },
        "PHONE": {"type": "string", "pattern": "^[0-9]{4}$"},
        "CELL": {"type": "string", "pattern": "^[0-9]{4}$"}

    }
}
```
```
# validation.py
import json
from jsonschema import validate

def function_demo(dict_to_test, dict_valid):
    try:
        validate(dict_to_test, dict_valid)
    except Exception as valid_err:
        print("Validation KO: ()".format(valid_err))
        raise valid_err
    else:
        print("JSON validé")

if __name__ == '__main__':
    with open("./json.ok.json", "r") as fichier:
        dict_to_test = json.load(fichier)

    with open("./json_schema.json", "r") as fichier:
        dict_valid = json.load(fichier)

    function_demo(dict_to_test, dict_valid)
```
