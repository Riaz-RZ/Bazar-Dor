# 🛒 BazaarDor — বাজার দর

**BazaarDor** is a Bengali-language market price tracking web application that helps users easily explore the latest prices of essential products. It provides a simple, responsive interface to compare prices, monitor daily price changes, and browse products by category.

## ✨ Features

- 📊 **Today's Market Prices** — View the latest prices of essential products in one place.
- 📈 **Daily Price Changes** — Track whether product prices have increased or decreased, including the percentage change.
- 🗂️ **Category-Based Browsing** — Explore products by category for easier navigation.
- 🔍 **Product Details** — View individual product information, price history comparisons, and market-wise price ranges.
- 🏪 **Market-Wise Prices** — Compare minimum and maximum prices across different markets and divisions when data is available.
- ↕️ **Price Sorting** — Sort products from low to high or high to low.
- 📱 **Fully Responsive Design** — Enjoy a mobile-friendly experience on smartphones, tablets, laptops, and desktops.
- 🇧🇩 **Bengali User Interface** — Browse market information with Bengali text and localized number formatting.
- 🔐 **Authentication** — Support user sign-in and account management using Better Auth.
- 👤 **User Profile Management** — View and manage profile information.
- 🔔 **Toast Notifications** — Receive feedback through interactive notifications.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| [Next.js](https://nextjs.org/) | React framework for building the application |
| [React](https://react.dev/) | Component-based user interface |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe development |
| [Tailwind CSS](https://tailwindcss.com/) | Responsive styling |
| [DaisyUI](https://daisyui.com/) | UI components and themes |
| [Better Auth](https://www.better-auth.com/) | Authentication and session management |
| [MongoDB](https://www.mongodb.com/) | Database integration |
| [React Toastify](https://fkhadra.github.io/react-toastify/) | Toast notifications |

## 🚀 Getting Started

Follow these steps to run BazaarDor locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm, or another compatible package manager
- Git

### Installation

**1. Clone the repository**

```bash
git clone YOUR_REPOSITORY_URL
```

**2. Navigate to the project directory**

```bash
cd bazardor
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a `.env.local` file in the project root and add the environment variables required by your application, such as your authentication secret, database connection string, and API configuration.

Use the variable names expected by your project. Never commit secrets or credentials to GitHub.

**5. Start the development server**

```bash
npm run dev
```

**6. Open the application**

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

A typical structure for this Next.js project looks like this:

```text
bazardor/
├── public/              # Static assets
├── src/
│   ├── app/             # App Router pages and layouts
│   ├── components/      # Reusable UI components
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Helper functions and utilities
├── .env.local           # Local environment variables
├── package.json
├── tsconfig.json
└── README.md
```

*Your actual folder structure may differ.*

## 🎯 Project Goal

The goal of BazaarDor is to make essential market price information easier to access and understand through a clean, user-friendly Bengali interface. The application aims to help users compare prices and stay informed about daily market fluctuations.

## 🔮 Future Improvements

- 📉 Interactive historical price charts
- ❤️ Favorite products and personalized watchlists
- 🔔 Price-change alerts
- 🏙️ Advanced filtering by location and market
- 📅 Historical price reports and trend analysis

## 👨‍💻 Developer

Developed with ❤️ using Next.js, TypeScript, and modern web technologies.

---

⭐ If you find this project useful, consider giving it a star on GitHub.

