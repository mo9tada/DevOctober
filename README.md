# Sneaker Store — React Native App

![React Native](https://img.shields.io/badge/React_Native-20232a?logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?logo=expo&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?logo=redux&logoColor=white)

A cross-platform (iOS, Android, web) sneaker shop built with Expo: browse products, open a detail page with an image carousel and size selection, add to cart, and adjust quantities with a live total.

Built while learning React Native, starting from the [notJust.dev](https://www.youtube.com/@notjustdev) e-commerce series and its demo product data, then extended with size-aware cart lines and quantity controls.

## Features

- Product grid and product detail screens (native stack navigation)
- Image carousel and size picker
- Cart keyed by product **and** size, with increase / decrease / remove
- Subtotal, delivery and total computed live
- Cart badge with item count in the header

## State management

The app combines two state approaches:

| State | Tool | Why |
| --- | --- | --- |
| Product catalogue, selected product | Redux Toolkit slice | Global, read by several screens |
| Cart | React Context + `useState` | Local to the shopping flow, simple updates |

## Run it

```bash
npm install
npx expo start      # then press i (iOS), a (Android) or w (web), or scan the QR code with Expo Go
```

## Author

**Moktada Zaidi** — [GitHub](https://github.com/mo9tada)
