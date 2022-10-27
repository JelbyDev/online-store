# Jelby market (online-store)

## Требования к проекту

### Верхняя часть(шапка):

- [x] Логотип (текстовая или SVG версия)
- [x] Кнопка `Корзина`:
  - [x] Должна включать в себя иконку и кол-во товаров добавленных в корзину
  - [x] При клике осуществляться переход на страницу `Корзина товаров`
- [x] Кнопка `Список избранного`:
  - [x] Должна включать в себя иконку и кол-во товаров добавленных в список избранного
  - [x] При клике осуществляться переход на страницу `Избранные товары`

### Нижняя часть(подвал):

- [x] Ссылка на гит репозиторий проекта
- [x] Список использованных технологий
- [x] Год создания проекта

### Страница Каталог:

- [x] Вывод товаров в виде карточек:
  - [x] Карточка включает в себя картинку, цену, название и кнопки добавления в корзину и список избранного
  - [x] При клике на карточку осуществляется переход на страницу этого товара
- [x] Возможность постраничной навигации
- [x] Возможность сортировки товаров
- [x] Возможность текстового поиска товаров по названию
- [x] Возможность фильтрации товаров по категории, размеру, цене и пр. (минимум 3 фильтра)

### Страница Товар:

- [x] Изображение, список опций (категория, размер, цвет и пр.), описание, цена
- [x] Кнопки добавления в корзину и список избранного

### Страница Избранные товары:

- [x] Вывод товаров в виде карточек (таких же как на странице `Каталог`)
- [x] Возможность сохранения списка избранного при перезагрузке страницы(например в localStorage)

### Страница Корзина товаров:

- [x] Вывод товаров в табличном виде:
  - [x] Кнопка удаления товара из корзины
  - [x] Картинка, название, кол-во в корзине, кол-во на складе, общая стоимость (цена 1 шт. \* на кол-во в корзине)
  - [x] Возможность изменять кол-во товара в корзине. Диапазон от 1 до того кол-ва, что есть на складе
- [x] Возможность сохранения корзины при перезагрузке страницы(например в localStorage)
- [x] Отображение общей стоимости Корзины
- [x] Кнопка для вызова формы оформления заказа. Форма включает в себя:
  - [x] Поля `Имя` (от 3 до 10 символов) и `Email`. Поля являются обязательными
  - [x] Обработка ответа и вывод сообщения об успешном заказе или ошибке
  - [x] Очистка корзины при успешном заказе

### Страница 404 ошибки:

- [x] При вводе некорректного url отображать страницу с ошибкой

### Дополнительные требования:

- [x] Реализована адаптивная верстка с минимальным разрешением в 320px
- [x] Серверная часть сделана `Моками`, которые эмулируют ответ сервера в виде промиса со случайной задержкой

## Список технологий

- [x] **Vue 3** в качестве фронтенд фреймворка
- [x] **TypeScript** для типизации кода
- [x] **Vuetify** в качестве UI фреймворка
- [x] **VueRouter** для постраничной навигации
- [x] **Pinia** в качестве глобального хранилища данных для реализации `Корзины` и `Списка избранного`

## Цель создания проекта:

- [x] Опробовать ряд технологий в условиях небольшого пет проекта (Pinia, Vuetify, VueRouter)
- [x] Получить дополнительную практику при работе с Vue 3 (Composition API через setup())

## Запуск проекта

### Установить зависимости

```
npm install
```

### Запустить сервер

```
npm run serve
```

### Создание продакшен версии

```
npm run build
```