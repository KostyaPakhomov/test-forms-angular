Препроцессор: scss/stylus

Сборка: angular CLI version 13.3.9.

Загрузка фреймворка, библиотек и модулей: npm

## Реализация генератора форм, где каждый элемент формы - angular компонент

### Структура компонента:

● element.component.html 

● element.component.scss 

● element.component.ts

### Всего 4 компонента:
1. testInput
2. testSelect
3. testNumber 
4. testCheckbox

### Описание:

● из четырёх компонентов может быть сгенерировано сколько угодно полей формы

● форма на сервер отправляется одной моделью testForm

● каждое поле возвращает значение для общей модели

● json формат, по которому происходит генерация, приходит с сервера (в данном случае локально)

● форма принимает данные с бэка, по ним динамически выстраиваются элементы формы

● валидация полей формы (настроена по обязательности полей)
