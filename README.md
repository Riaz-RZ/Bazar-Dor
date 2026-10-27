# 🛒 বাজার দর | Bazar Dor

*A Bengali market-price tracker for exploring the prices of everyday essentials in Bangladesh.*

[🌐 Live Demo](https://bazar-dor-two-tau.vercel.app/) · [📦 GitHub Repository](https://github.com/Riaz-RZ/Bazar-Dor)

---

## 📑 Table of Contents

- [About the Project](#-about-the-project)
- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Dependencies](#-dependencies)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Folder Structure](#-folder-structure)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 📖 About the Project

**বাজার দর (Bazar Dor)** is a Bengali-language web application designed to help people explore the prices of everyday essentials in Bangladesh.

The application presents market-price information in a simple, accessible format, making it easier for users to check product prices and understand how prices change over time.

From rice, lentils, and cooking oil to vegetables, fish, meat, dairy products, and spices, Bazar Dor brings essential grocery-price information together in one place.

The project was built as part of my journey in full-stack web development, with a focus on creating a practical application using modern web technologies and a Bengali-first user interface.

## 🎯 Project Overview

- **Project Name:** বাজার দর (Bazar Dor)
- **Project Type:** Web Application
- **Purpose:** Everyday market-price tracking
- **Target Audience:** Consumers and households in Bangladesh
- **Language:** Bengali
- **Live Application:** [bazar-dor-two-tau.vercel.app](https://bazar-dor-two-tau.vercel.app/)
- **Repository:** [Riaz-RZ/Bazar-Dor](https://github.com/Riaz-RZ/Bazar-Dor)
- **Development Status:** Deployed

The application focuses on presenting product prices, categories, and price-change information through a responsive interface designed for everyday use.

**Note:** The displayed prices are indicative and may vary depending on market conditions.

## ✨ Key Features

- **📊 Daily Price Overview:** Browse prices of everyday essentials in one place.
- **📈 Price Change Indicators:** Identify products with increasing or decreasing prices.
- **🔥 Top Price Movers:** Explore products with the largest displayed price changes.
- **🗂️ Category-Based Browsing:** Explore products across categories such as rice, lentils, oil, vegetables, fish, meat, dairy, and spices.
- **🔢 Bengali Number Formatting:** View product prices and units in a Bengali-friendly format.
- **📱 Responsive Interface:** Browse the application on desktop, tablet, and mobile devices.
- **📅 Bengali Date Display:** View the date in a localized Bengali format.
- **🛍️ Product Cards:** Quickly review product names, units, prices, and price-change percentages.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | React framework and application routing |
| React | Building reusable user-interface components |
| TypeScript | Type-safe application development |
| Tailwind CSS | Styling and responsive layouts |
| DaisyUI | UI components and theme styling |
| Git & GitHub | Version control and source-code management |
| Vercel | Application deployment |

*Verify the exact versions against your current `package.json` before publishing this section.*

## 📦 Dependencies

The project uses npm for dependency management.

To inspect all installed dependencies and their versions, see [`package.json`](./package.json).

Key technologies include:

- `next`
- `react`
- `react-dom`
- `typescript`
- `tailwindcss`
- `daisyui`

*Confirm the package names and versions in `package.json`. Add other libraries only if they are actually used by the project.*

## 🚀 Installation & Setup

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Riaz-RZ/Bazar-Dor.git
cd Bazar-Dor
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

If the project requires environment variables, create the appropriate `.env.local` file in the project root and configure the required values.

```env
# Add the environment variables required by your project
```

Do not commit real API keys, database credentials, authentication secrets, or other sensitive values to GitHub.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
```

*Check `package.json` for the available scripts and adjust these commands if your configuration differs.*

## ⚙️ Environment Variables

Add only the variables actually required by your application.

| Variable | Description |
|---|---|
| `API_URL` | Placeholder for the API endpoint, if configurable through an environment variable |
| `MONGODB_URI` | Placeholder for a MongoDB connection string, only if required |
| `BETTER_AUTH_SECRET` | Placeholder for an authentication secret, only if required |

**Important:** These are examples, not confirmed environment-variable names for this repository. Check your existing configuration before adding them to your `.env.local` file or documentation.

If no environment variables are required, remove this section or state that no additional configuration is needed.

## 📁 Folder Structure

The following is an illustrative structure for a Next.js application. Update it to match the actual files and folders in your repository.

```text
Bazar-Dor/
├── public/
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── types/
│   └── utils/
├── package.json
├── package-lock.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

*Your actual folder names may differ. Keep only directories that exist in your project.*

## 🔮 Future Improvements

Potential enhancements for future development include:

- Adding more detailed market-wise price comparisons.
- Improving price-history visualization.
- Enhancing product discovery and filtering.
- Improving accessibility and user experience.
- Expanding error handling and loading states.

*These are possible future enhancements, not claims about existing functionality.*

## 🤝 Contributing

Suggestions, feedback, and bug reports are welcome.

To contribute:

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add your feature"
   ```

4. Push your branch:

   ```bash
   git push origin feature/your-feature
   ```

5. Open a Pull Request describing your changes.

## 📄 License

No license has been specified here.

If you decide to distribute the project under an open-source license, add the appropriate license file to the repository and update this section accordingly.

## 📬 Contact

**Developer:** Riazul Islam

- **GitHub:** [@Riaz-RZ](https://github.com/Riaz-RZ)
- **LinkedIn:** [Riazul Islam](https://www.linkedin.com/in/riazul-islam89)
- **Live Application:** [Bazar Dor](https://bazar-dor-two-tau.vercel.app/)
- **Email:** [riazacc89@gmail.com]

---

*Built with 💚 by Riazul Islam.*


---

⭐ If you find this project useful, consider giving it a star on GitHub.

