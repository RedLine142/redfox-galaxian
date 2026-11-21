# RED FOX — Galaxy Invaders

Встраиваемая версия оригинальной игры из [patnaikshekhar/GalaxyInvaders](https://github.com/patnaikshekhar/GalaxyInvaders). Используются исходный JavaScript-движок, сцены, спрайт-лист и звуковые файлы. Источник зафиксирован на ревизии `9d82210b4ca1679f492c9153657f9055ba3467fd`.

## Встраивание на страницу задания RED FOX

В блоке задания оставьте контейнер `.oPos.nobr` и добавьте загрузчик:

```html
<div class="oPos nobr">&nbsp;</div>
<script src="https://cdn.jsdelivr.net/gh/RedLine142/redfox-galaxian@46c773ad41960cb8d1a1a604aa522e9016c0b5e3/redfox-galaxian-embed.js"></script>
```

## Управление

- Стрелки влево / вправо — перемещение корабля.
- Пробел — начать игру, стрелять и перезапустить после Game Over.
- На телефонах доступны экранные кнопки.

Игровое поле 640 × 480, встраивается в адаптивное окно с пропорциями 4:3.

## Тестирование

Проверена загрузка RequireJS, игрового движка, игровых модулей, спрайт-листа и всех четырёх OGG-файлов в браузере. Canvas создаётся, загрузчик скрывается, ошибок загрузки в проверенном сеансе не зафиксировано.

Открыть страницу игры: https://raw.githack.com/RedLine142/redfox-galaxian/a1cf1efa62da52ffc5b2d6210c84c95521439e63/galaxy-invaders.html
