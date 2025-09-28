# ⚡Voltify

**Volitfy** is an online store website that allows users to browse products by categories, search for products, and add them to the shopping cart with a chosen quantity. The total price is automatically calculated.  
The project also supports viewing more product details and applying **CRUD operations** (Create, Read, Update, Delete, Search) on products with validation, using **json-server** as a fake backend.

---

## 🚀 Tech Stack
- **Framework:** Angular 17  
- **Language:** TypeScript  
- **Styling:** CSS  
- **Build Tool:** Angular CLI  

---

## 📂 Project Structure
```
src/
 ├── app/
 │   ├── add-product/
 │   ├── card/
 │   ├── footer/
 │   ├── home/
 │   ├── navbar/
 │   ├── product/
 │   ├── product-form/
 │   │
 │   ├── interface/
 │   │   └── IProduct.ts
 │   │
 │   ├── service/
 │   │   ├── voltify.service.ts
 │   │   └── voltify.service.spec.ts
 │   │
 │   ├── app.component.css
 │   ├── app.component.html
 │   ├── app.component.ts
 │   ├── app.component.spec.ts
 │   ├── app.config.ts
 │   ├── app.config.server.ts
 │   └── app.routes.ts
 │
 ├── assets/
 │   └── images/
 │
 ├── favicon.ico
 ├── index.html
 ├── main.ts
 ├── main.server.ts
 ├── styles.css
 │
 ├── db.json
 ├── server.ts
 │
 ├── angular.json
 ├── tsconfig.app.json
 ├── package.json
 ├── package-lock.json
 ├── README.md
 ├── .gitignore
 └── .editorconfig

```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Yacoub777/Voltify-angular17.git
cd Voltify-angular17
```
### 2. Install dependencies
```bash
npm install
```
### 3. Run the project
```bash
npm run dev
```
#### The app will run at: `http://localhost:4200/`
---

## 🚀 Features
- 🛍️ Render products with categories.
- 🔎 Search for products by name or category.
- ➕ Add products to the cart and choose the quantity you want.
- 💰 Calculate the total price of the cart.
- ℹ️ Show more details about each product if needed.
- ✏️ Full CRUD operations on products:
  - Add a new product.
  - Edit existing product details.
  - Delete a product.
  - Search for a product.
- ✅ Input validation for adding and editing products.
- 🗄️ Powered by **json-server** to simulate an API.
---

## 👥 Contributors

Thanks to the following people who contributed to this project 💙:

- **Mostafa Yacoub**  
- **Dolagy Sameh**  
- **Mariam Said**

---
## 📖 License
This project is licensed under the MIT License.



