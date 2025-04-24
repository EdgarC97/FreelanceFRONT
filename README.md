# 🧩 Freelance Management Frontend

This is the **frontend SPA** built in **Angular 19** for the Freelance Project Management system. It connects with a PHP/MySQL backend and allows freelancers to register, log in, and manage their projects and associated files.

> 🛠️ Built with Angular CLI v19.2.5  
> 🎯 Backend API: [`http://localhost:8000`](http://localhost:8000)  
> 👨‍💻 Frontend Dev Server: [`http://localhost:4200`](http://localhost:4200)

---

## 🚀 Features

- 🔐 Authentication (Register/Login) with JWT
- 📁 Create, view, edit and delete projects
- 📎 Upload, list, download and delete files per project
- 🧭 Modular architecture with routing and lazy loading
- 🎨 SCSS styling and responsive layout

---

## ⚙️ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
ng serve
```

Then open your browser at:  
👉 `http://localhost:4200`

---

## 🧪 API Integration

Make sure the backend is running at `http://localhost:8000`.  
All API requests are made to this backend (see `environment.ts`).

To test endpoints manually, use Postman or cURL:
- `POST /register`
- `POST /login`
- `GET /projects`
- etc.

---

## 🧱 Project Structure

```
src/
│
├── app/
│   ├── core/         → Auth, Interceptors, Guards
│   ├── shared/       → Reusable components (e.g. Header)
│   ├── features/
│   │   ├── auth/     → Login/Register modules
│   │   └── projects/ → Project CRUD & file upload
│   ├── app-routing.module.ts
│   └── app.component.ts
│
└── environments/
    └── environment.ts
```

## 📎 Environment Configuration

Check your `src/environments/environment.ts` file to configure API URLs and options:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000'
};
```

---

## 📚 Learn More

- [Angular Docs](https://angular.dev/)
- [Angular CLI](https://angular.dev/tools/cli)
- [TypeScript](https://www.typescriptlang.org/)
- [RxJS](https://rxjs.dev/)

---

¿Querés que te genere también uno para el backend (`FreelanceBACK`) incluyendo rutas y ejemplos de cuerpos JSON?
