# Компоненты UI

Исходники React-интерфейса (ранее — один минифицированный файл в `_components/v2/`).

## Структура

```
components/
├── App.jsx                 # Корень: авторизация, роль, вкладки
├── auth/
│   └── AuthScreen.jsx      # Выбор профиля и вход
├── layout/
│   └── AppShell.jsx        # Шапка, сайдбар, контент
├── navigation/
│   └── roleConfig.js       # Заголовки и пункты меню по ролям
├── shared/                 # Переиспользуемые блоки
├── irk/                    # Кладовщик ИРК
├── tool-warehouse/         # Инструментальный склад
├── laboratory/             # Метрологическая лаборатория
└── reports/                # Отчёты (общие для ролей)
```

## Сборка

```bash
npm run build:client   # → client-dist/
npm run dev:client     # Vite dev-сервер с proxy /api
npm start              # Express: API + client-dist
```

Старый экспорт Figma Make (`_components/`, `index.html` с SitesRuntime) оставлен для справки; рабочий UI — из `client-dist/` после сборки.
