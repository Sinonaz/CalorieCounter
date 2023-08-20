# Техническое задание проекта "Счётчик калорий"

## Состояние по умолчанию
- Выбран мужской пол.
- В полях ввода стоит 0
- Выбрана «минимальная» физическая активность.
- Кнопка «Рассчитать» неактивна.
- Кнопка сброса данных из полей ввода неактивна.
- Блок с выводом информации о калориях скрыт.

## Кнопка «Рассчитать»
- Становится активна только когда заполнены все поля ввода.
- По клику на кнопку появляется блок с информацией о калориях, если до этого он не был показан. Если блок уже находится на странице, клик по кнопке
обновляет расчёты, выводится актуальная информация.

## Кнопка «Очистить поля и расчёт»
- Становится активна, когда хотя бы одно числовое поле заполнено.
- При клике все элементы приложения сбрасываются до состояния по умолчанию: числовые поля очищаются (плейсхолдер 0), пол становится мужской, физическая активность «минимальная», блок с информацией о калориях скрывается.