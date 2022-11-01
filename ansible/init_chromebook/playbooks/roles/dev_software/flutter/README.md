# Flutter role

In android studio: file > settings > android sdk
In android studio: file > settings > pluggins > flutter > install

## Android Studio

Tools > AVD Manager: generate simulator
RMB > Reformat Code with dartfmt: reformat to respect flutter format rules
Terminal > flutter format <filename>: reformat to respect flutter format rules
flutter run: launch app
flutter run > r: hot reload
flutter run > R: hot restart
flutter create my_app
flutter create --org com.<my orga> <my_app>
fvm: flutter version management cli

## Flutter file

https://www.youtube.com/watch?v=HXA_rqpEBTE
by Stack labs

lib/main.dart: main file
pubspec.yaml: dependencies and conf
penser a faire les tests egalement sur telephone physique, exemple l'emulateur ne permet pas d utiliser les notifications et le bluetooth
hot reload: met a jour automatique votre page, mais ne reload que le build context (pas le state)
hot restart: remet tout a 0 et retourne a la page de depart

install linter
```yaml
# pubspec.yaml
dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^1.0.0
```

```yaml
# analysis_options.yaml
include: package:flutter_lints/flutter.yaml
linter:
  rules:
    always_declare_return_types: true
    require_trailing_commas: true
```

macketer vos appli (figma, zepelin, ...)
flutterflow.io (dreamweather mais avec du bon code)
theming:
  import 'package:flutter/widgets.dart': composant deja tout fait non dependant a un design
  import 'package:flutter/material.dart'
  import 'package:flutter/cupertino.dart'
theme du futur: material you

Light & dark theme
```
// get the systeme theme
MaterialApp(
  theme: lightThemeData,
  darkTheme: darkThemeData,
  themeMode: ref.watch(theme.provider.state).state, // manual change
)
```

a11y
already include in flutter (with some semantic)

responsive: all screen size
adaptative: phone vs tablet vs computer

i18n

coding rules
exemple file.scope.dart
scope: page, widget (reusable widget), service, model (classe model, parsing json), data (static information), provider (state management), utils, theme, config

archi:
* folder by type (generally for small project)
* folder by layer (model, view, controller)
* folder by feature (auth, user, ...)
* folder by feature lvl up (common_widget, constants, exceptions, features (auth, user), i18n, utils)

state
* setState: local
* inheritedWidget

a lot of lib: provider (new name riverpod), BLoC (event oriented), MobX, Redux

data persistency
* shared Preference (key, value)
* Flutter Secure Storage (key, value)
* Hive (object)
* SQLite (relational data)
* File storage
* Hydrated BLoC (can save state management)

Testing
* test unitaire
* test widget
* test golden (widget sous steroid, generation d image et diff avec image de reference)
* test d integration (generate everything, than test)
* `flutter test --machine --coverage/`

devtools

appstore & google play store
very long ... 
https://gitlab.com/stack-labs/oss/flutter-tips-and-tricks
https://bit.ly/3qSsWO4
