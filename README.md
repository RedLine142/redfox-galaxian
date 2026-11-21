# RED FOX — Galaxy Invaders

Встраиваемая версия оригинальной игры из [patnaikshekhar/GalaxyInvaders](https://github.com/patnaikshekhar/GalaxyInvaders). Используются исходный JavaScript-движок, сцены, спрайт-лист и звуковые файлы. Источник зафиксирован на ревизии `9d82210b4ca1679f492c9153657f9055ba3467fd`.

## Встраивание на страницу задания RED FOX

В блоке задания оставьте контейнер `.oPos.nobr` и добавьте загрузчик:

```html
<div class="oPos nobr">&nbsp;</div>
<script src="https://cdn.jsdelivr.net/gh/RedLine142/redfox-galaxian@7334f6bea2554317d20d9d8be14069b601301a20/redfox-galaxian-embed.js"></script>
```

## Управление

- Стрелки влево / вправо — перемещение корабля.
- Пробел — начать игру, стрелять и перезапустить после Game Over.
- На телефонах доступны экранные кнопки.

Игровое поле 640 × 480, встраивается в адаптивное окно с пропорциями 4:3.

## Тестирование

Проверена загрузка RequireJS, игрового движка, игровых модулей, спрайт-листа и всех четырёх OGG-файлов в браузере. Canvas создаётся, загрузчик скрывается, ошибок загрузки в проверенном сеансе не зафиксировано.

Открыть страницу игры: https://raw.githack.com/RedLine142/redfox-galaxian/fbacacec2be724c7e83e78527518e1f38b3fab38/galaxy-invaders.html
