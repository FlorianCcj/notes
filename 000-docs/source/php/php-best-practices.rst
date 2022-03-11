PHP - best-practices
####################

:source: https://www.arthurweill.fr/guide-des-bonnes-pratiques-php/ (Arthur Weill	15/02/2019)

convention de nomage
********************

* variable et fonction en camelCase
* clé de tableau en snake_case
* constantes en MAJUSCULE
* class en PascalCase
* en SQL les noms des tables et des champs en snake_case

.. code-block:: php

    $maVariableNumerique = 3;
    function sommeDesEntiers($maximum) {...}
    $user = [
        'username' => 'monadresse@mail.com',
        'first_name' => 'John',
        'last_name' => 'Doe',
        'active' => 1
    ];
    define('CHIFFRE_PORTE_BONHEUR', 13);
    class Aventurier
    {}

Accolades et espaces
********************

* declaration d une classe, fonction ou methode : accolade a la ligne
* if, switch, while, for, foreach, etc: accolade obligatoire, sur la meme ligne, precedé d une espace
* pas d espace, entre fonction et arguments

Typage
******

* a function must always return the same values type
* try to don t use multi type in an array, if you need, use associative array

.. code-block:: Php

    // don t do
    function isValueInDoble($values)
    {
        // look for 2 value which are the same ina  table
        // If find return

        if ($pairsFound) {
            return $valuesPairsFound;
        }

        return false;
    }

    // prefer to do
    function isValueInDoble($values)
    {
        // look for 2 value which are the same in a table
      
        // whatever values type, always return table
        return [
            'pairs_found' => $pairsFound,
            'values_pairs_found' => $valuesPairsFound
        ];
    }

.. code-block:: PHP

    // don t do :
    $utilisateur = [1, 'Arthur', 'Weill', 32, ['PHP', 'HTML', 'CSS', 'JS'], true];

    // do :
    $utilisateur = [
        'id' => 1,
        'prenom' => 'Arthur',
        'nom' => 'Weill',
        'age' => 32,
        'competences' => ['PHP', 'HTML', 'CSS', 'JS'],
        'maitrise_cakephp' => true
    ];

String
******

* Favorisez les quotes simples aux doubles et favoriser la concaténation.
* use constant to comparison

.. code-block:: PHP

    // we want
    if (in_array('html', $competences)) {
        // Certaines instructions
    }

    // we fail but no error
    if (in_array('hmtl', $competences)) {
        // Certaines instructions
    }

    // we fail => error
    if (in_array(LANGAGE_HMTL, $competences)) {
        // Certaines instructions
    }

Other
*****

* don t do to much parameter
* 5 steps to code a function
    1. put the :code:`function` key word yeah !!!
    2. named it and be sure that the name is clear
    3. parameter: which data is needed, are they mandatory, is there default value, can I use option table
    4. return: what do I give back
    5. logic: let s implement it, now that you have the begin and the end
* don t use php magic
    * allways be sure that you return boolean
    * :code:`if($nbOccurences != 0)` instead of :code:`if($nbOccurences)`
    * :code:`if (!empty($competences))` instead of :code:`if ($competences)`
* error code: never return the same code error
    * We had a fail [code: U001] => like that U for user and you can find it easily

.. code-block:: php

    // don t
    // function input($name, $type = 'text', $value = '', $placeholder = '', $id = '', $required = false)

    // do
    function input($name, $options = [])
    {
        // Traitement de la value
        if (isset($options['value'])) {
            // Prise en considération de cette option
        }

        // Valeur par défaut pour le type
        $type = 'text';
        if (isset($options['type'])) {
            $type = $options['type'];
        }

    }