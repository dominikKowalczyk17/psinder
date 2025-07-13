---
applyTo: '**'
---
Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

# 🐶 Psinder — Copilot Guidelines (Frontend)

## 🎯 Cel projektu
Tworzysz mobilną aplikację społecznościową dla właścicieli psów i fanów psów, w której użytkownicy mogą przeglądać profile psów w formie kart (swipe jak w Tinderze), czatować i umawiać się na spacery.  
Kod ma być czysty, nowoczesny i zgodny z poniższymi zasadami.

---

## 📐 Technologia
- React Native (Expo)
- TypeScript
- react-native-deck-swiper (swipe UI)
- react-navigation (nawigacja między ekranami)
- axios (do komunikacji z backendem)
- Context API lub `useState` / `useReducer` do zarządzania stanem

---

## ✍️ Styl kodu
- Używaj TypeScript, definiuj typy dla propsów i stanów
- Funkcjonalne komponenty (`const Comp: FC<Props> = () => {}`)
- Hooks (`useState`, `useEffect`, `useNavigation`) zamiast klas
- Props przekazuj jawnie, nie jako `any`
- Komentarze tylko tam, gdzie nietrywialna logika
- Małe, czytelne komponenty

---

## 🎨 UI/UX
- Komponenty muszą być responsywne
- Zdjęcia psów wypełniają kartę proporcjonalnie, z zaokrąglonymi rogami
- Teksty czytelne, kontrastowe
- Używaj `SafeAreaView` dla bezpiecznych obszarów
- Przyciski i interakcje intuicyjne, z odpowiednim feedbackiem
- Używaj `ActivityIndicator` podczas ładowania danych
- Aplikacja powinna być dostępna na iOS i Android
- Aplikacja powinna używać ciemnego lub jasnego motywu w zależności od ustawień systemowych
- Jasny motyw ma czarne teksty, ciemny motyw ma białe teksty
- Używaj kolorów z palety `Colors.ts` w `/app/constants/`

---

## 🔗 Komunikacja z backendem
- Używaj `axios` z centralną konfiguracją `BASE_URL`
- Funkcje API w `/src/api/`, nie w komponentach
- Obsługuj błędy i pokazuj komunikaty w razie niepowodzenia
- REST API — wysyłaj odpowiednie metody HTTP (GET, POST, DELETE, PATCH)

---

## 🧪 Testowanie
- Każdy komponent powinien działać niezależnie
- Ekrany testuj manualnie na emulatorze i urządzeniu
- Opcjonalnie: przygotuj komponenty pod Storybook

---

## 🗃️ Nawigacja
- Używaj `react-navigation`
  - stack navigator dla logowania, rejestracji
  - tab/bottom navigator dla głównych ekranów
  - przekazuj parametry ekranów jawnie (`route.params`)

---

## 🧹 Dobre praktyki
✅ Każdy ekran ma własny folder w `/screens/` z komponentem, stylami i typami  
✅ Komponenty wielokrotnego użytku w `/components/`  
✅ Używaj `SafeAreaView`  
✅ Logika biznesowa poza JSX — wyciągaj do helperów lub hooków  
✅ Używaj `ActivityIndicator` na czas ładowania

---

## 🌟 Przykładowe ekrany
- LoginScreen.tsx
- RegisterScreen.tsx
- SwipeScreen.tsx
- MatchesScreen.tsx
- ChatScreen.tsx
- ProfileScreen.tsx

---

## 🚫 Czego unikać
❌ `any` w typach  
❌ logiki biznesowej w JSX  
❌ nadmiernego zagnieżdżania komponentów  
❌ kopiowania kodu — twórz komponenty reużywalne

---

## 📦 Opcjonalne na później
- Animacje (`react-native-reanimated`)
- Obsługa offline (`AsyncStorage`)
- Ciemny motyw
- Storybook dla komponentów

---

