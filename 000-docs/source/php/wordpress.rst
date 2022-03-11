Wordpress
#########

Shortcode
**********

:source: https://grafikart.fr/tutoriels/Shortcode-149

Utilisation
===========

* :code:`[<my short code name> <sc attribut1>=<sc value1>]`
* ex: :code:`[dailymotion id=azer12]`

Creation
========

.. code-block:: php
    :name: functions.php

    add_shortcode('dailymotion', 'daily_shortcode');
    function daily_shortcode($atts, $content='') {
        $atts = shortcode_atts([
            'id' => '',
            'heigth' => 350
        ], $atts);
        return '<div class="dailymotion"><object width="700" heigth="'.$heigth.'">
                <param name="movie" value="http://www.dailymotion.com/swf/'.$id.'&related=0"></param>
                <param name="allowFullScreen" value="true"></param>
                <param name="allowScriptAccess" value="always"></param>
                <embed src="https://www.dailymotion.com/swf/'.$id.'&related=0" type="application/x-shockwave-flash" width="700" heigth="'.$heigth.'" allowFullScreen="true" allowScriptAccess="always" wmode="transparent"></embed>
            </object>'.$content.'</div>';
    }

    add_action('init', 'add_buttons');
    function add_buttons() {
        if (current_user_can('edit_posts') && current_user_can('edit_pages')) {
            add_filter('mce_external_plugins', 'add_plugins');
            add_filter('mce_buttons', 'register_buttons');
        }
    }

    function add_plugins($plugins) {
        $plugins['dailymotion'] = get_blog_info('template_url').'/js/dailymotion.js';
        return $plugins;
    }
    function register_buttons($buttons) {
        $buttons[] = 'dailymotion';
        return $buttons;
    }

.. code-block:: php
    :name: js/dailymotion.php

    tinymce.create('tinymce.plugins.daily',{
        init: function(ed, url) {
            ed.addButton('dailymotion', {
                title: 'Ajouter une video Dailymotion',
                image: url + '/daily.png',
                onclick: function() {
                    var dailyID = prompt('Id de la video dailymotion','');
                    ed.selection.setContent('[dailymotion id=' + dailyID + ']' + ed.selection.getContent() + '[/dailymotion]');
                }
            });
        },
        createControl: function(n, cm) {
            return null;
        }
    });
    tinymce.PluginManager.add('dailymotion', tinymce.plugins.daily);