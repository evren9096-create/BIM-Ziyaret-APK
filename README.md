# BİM Ziyaret

BİM mağaza ziyaret uygulamasının kaynak kodu.

## Web olarak çalıştırma

```bash
npm install
npm run build
```

Bu proje Vercel üzerinde Vite/TanStack Start + Nitro (Vercel preset) olarak dağıtılabilir.

## Android APK

Android APK, dağıtılmış HTTPS adresini WebView içinde açan ayrı bir Android kabuğu ile oluşturulacaktır. APK içindeki `MainActivity.kt` içinde bulunan `SAYFA` değişkenine dağıtım adresi yazılacaktır.
