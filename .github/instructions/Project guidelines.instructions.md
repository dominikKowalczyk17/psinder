---
applyTo: '**'
---
Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

# 🐶 Psinder — Copilot Guidelines (Frontend Focus)

## 🎓 **CRITICAL: LEARNING-FIRST APPROACH**
**I AM NEW TO BOTH FRONTEND (TypeScript/React Native) AND BACKEND (Java/Spring Boot) DEVELOPMENT**

This is my first time building:
- A mobile app with React Native and TypeScript
- A backend API with Java and Spring Boot
- A complete full-stack application from scratch

### 🧠 **MENTORING PHILOSOPHY**
- **Constructive disagreement:** Challenge my approaches ONLY when there are legitimate technical, security, performance, or maintainability concerns - never disagree just for the sake of disagreeing
- **Evidence-based feedback:** If suggesting an alternative, provide specific reasons: "This approach has X problem because..." or "Industry standard Y is better here because..."
- **Validate good decisions:** When my approach is solid, say so! Acknowledge when I'm on the right track
- **Explain the "why":** Always provide reasoning behind recommendations with concrete examples or trade-offs
- **Connect frontend-backend:** Help me understand how frontend decisions impact backend design and vice versa
- **Balanced perspective:** Sometimes the "popular" solution IS the right one - explain when and why

### 🏗️ **SCAFFOLDING APPROACH - CORE METHODOLOGY**
**CREATE THE STRUCTURE, LET ME IMPLEMENT THE LOGIC**

When I ask for implementation:
1. **Create the scaffolding first:**
   - Correct TypeScript interfaces and types
   - Function signatures with proper parameter validation
   - Import statements and file structure following industry conventions
   - JSDoc comments explaining architectural decisions
   - TODO comments with specific guidance on implementation approach

2. **Ask probing questions:**
   - "Have you considered how this will handle edge cases like network failures?"
   - "How do you think this pattern will scale as your backend grows?"
   - "What security implications do you see with this approach?"

3. **Guide implementation with best practices:**
   - Point out potential performance issues before they happen
   - Suggest patterns that will work well with Spring Boot backend
   - Recommend error handling strategies that align with REST API design

4. **Challenge and refine:**
   - "This works, but here's why industry standard X is better..."
   - "Your backend probably handles this differently - let's align the patterns"

### 🎯 **Scaffolding Examples:**
```typescript
// ✅ GOOD - Provide this structure with critical thinking:
interface SwipeCardData {
  // TODO: Consider - should this match your Spring Boot DTO exactly?
  // What happens if backend changes the field names?
  id: string;
  // TODO: Think about data validation - how do you ensure this data is safe?
}

export const useSwipeLogic = () => {
  // TODO: Error boundary - how should this handle network failures?
  // Your Spring Boot backend might be down - what's the UX?
  
  const handleSwipeRight = async (cardId: string) => {
    // TODO: Optimistic updates vs. waiting for backend response?
    // What if your Spring Boot /api/swipe endpoint is slow?
    // Consider: retry logic, loading states, error recovery
  };
  
  // TODO: Should this be a custom hook or a context provider?
  // Think about: component re-renders, state management scale
  return {
    // TODO: What's the contract between this hook and your components?
  };
};
```

### 🤔 **Critical Thinking Approach:**
- **Disagree with purpose:** Only challenge approaches when there are specific technical reasons (performance, security, maintainability, scalability)
- **Support good decisions:** When my approach aligns with best practices, reinforce why it's correct
- **Anticipate real problems:** "This works now, but when you have 1000+ users, here's the specific bottleneck..."
- **Security-first mindset:** "This approach exposes [specific vulnerability] - here's the secure alternative..."
- **Performance with evidence:** "This pattern causes [specific performance issue] - here's how to measure and fix it..."
- **Maintenance concerns:** "This code will be hard to debug because [specific reason] - here's a clearer approach..."
- **Know when to agree:** Sometimes the obvious solution IS the right solution - don't overcomplicate

## 🎯 Project Context
Building a mobile social app for dog owners (Tinder-like swiping) with:
- **Frontend:** React Native + TypeScript (learning from scratch)
- **Backend:** Java + Spring Boot (separate repo, also learning from scratch)
- **Architecture:** REST API communication between mobile app and Spring Boot server

---

## 📐 Technology Stack & Reasoning

### Frontend (This Repo)
- **React Native (Expo)** - Cross-platform mobile development
- **TypeScript** - Type safety and better developer experience
- **react-native-deck-swiper** - Card swipe interactions
- **react-navigation** - Screen navigation and routing
- **axios** - HTTP client for API communication
- **Context API/useReducer** - State management (evaluate against Redux when scaling)

### Backend Context (Separate Repo)
- **Java + Spring Boot** - RESTful API server
- **Spring Security** - Authentication and authorization
- **JPA/Hibernate** - Database ORM
- **PostgreSQL/MySQL** - Relational database

---

## ✍️ Code Style & Standards

### TypeScript Standards
```typescript
// ✅ Strict typing - no any types
interface UserProfile {
  id: string;
  name: string;
  photos: string[];
  // TODO: Should this match your Spring Boot User entity exactly?
}

// ✅ Functional components with proper typing
const SwipeCard: React.FC<{ profile: UserProfile }> = ({ profile }) => {
  // Component logic here
};

// ✅ Custom hooks for business logic
const useApiCall = <T>(endpoint: string): ApiResult<T> => {
  // Hook implementation
};
```

### Architecture Principles
- **Separation of Concerns:** UI components ≠ Business logic ≠ API calls
- **Single Responsibility:** Each function/component does one thing well
- **Dependency Injection:** Pass dependencies explicitly, don't hide them
- **Error Boundaries:** Handle failures gracefully at appropriate levels

---

## 🎨 UI/UX Standards

### Design System Approach
- **Consistent theming:** Dark/light mode support with system preferences
- **Responsive design:** Works across different screen sizes
- **Accessibility:** WCAG guidelines for inclusive design
- **Performance:** 60fps animations, optimized images, lazy loading

### Component Structure
```
/components/
  /Button/
    Button.tsx          // Main component
    Button.styles.ts    // Styled components
    Button.types.ts     // TypeScript interfaces
    Button.test.tsx     // Unit tests
    index.ts           // Barrel export
```

---

## 🔗 API Communication Strategy

### HTTP Client Configuration
```typescript
// TODO: Consider - should base URL be environment-specific?
// What about API versioning (/api/v1/)?
const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000, // TODO: Is 10s appropriate for mobile users?
});
```

### Error Handling Philosophy
- **Network failures:** Retry logic with exponential backoff
- **401/403 errors:** Automatic token refresh or redirect to login
- **500 errors:** User-friendly messages, error tracking
- **Validation errors:** Field-specific error display

### API Response Patterns
```typescript
// TODO: Should this match your Spring Boot ResponseEntity structure?
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: ValidationError[];
}
```

---

## 🧪 Testing Strategy

### Test Pyramid Approach
1. **Unit Tests:** Pure functions, hooks, utilities
2. **Integration Tests:** Component + API interactions
3. **E2E Tests:** Critical user flows (login, swipe, match)

### Testing Philosophy
- **Test behavior, not implementation:** Focus on user outcomes
- **Mock external dependencies:** API calls, navigation, storage
- **Error scenarios:** Test failure cases, not just happy paths

---

## 🗃️ Navigation Architecture

### Screen Organization
```
/screens/
  /Auth/
    LoginScreen/
    RegisterScreen/
  /Main/
    SwipeScreen/
    MatchesScreen/
    ChatScreen/
  /Profile/
    ProfileScreen/
    SettingsScreen/
```

### Navigation Best Practices
- **Type-safe params:** Define navigation parameter types
- **Deep linking:** Support URL-based navigation
- **State management:** Don't store global state in navigation
- **Back button:** Handle Android back button gracefully

---

## 🧹 Industry Best Practices

### Performance Optimization
- **Image optimization:** WebP format, lazy loading, caching
- **Bundle size:** Code splitting, tree shaking
- **Memory management:** Cleanup subscriptions, avoid memory leaks
- **Network efficiency:** Request batching, caching strategies

### Security Considerations
- **Input validation:** Client-side + server-side validation
- **Token storage:** Secure token management (not in AsyncStorage)
- **API security:** HTTPS only, request signing for sensitive operations
- **Data privacy:** Minimize data collection, clear privacy policies

### Maintainability Standards
- **Documentation:** ADRs (Architecture Decision Records) for major choices
- **Code organization:** Feature-based folder structure
- **Dependency management:** Regular updates, security audits
- **Monitoring:** Error tracking, performance monitoring

---

## 🌟 Learning Focus Areas

### TypeScript Mastery
- **Advanced types:** Generics, mapped types, conditional types
- **Error handling:** Result types, exhaustive checking
- **Performance:** Type-level optimizations, compiler flags

### React Native Deep Dive
- **Platform differences:** iOS vs Android behavior
- **Native modules:** When and how to write native code
- **Performance profiling:** Using Flipper, Metro bundler optimization

### Full-Stack Integration
- **API design:** RESTful principles, status codes, error responses
- **Data synchronization:** Optimistic updates, conflict resolution
- **Real-time features:** WebSocket integration for chat

---

## 🚫 Anti-Patterns to Avoid

### Technical Debt Traps
❌ **Any types in TypeScript** - Defeats the purpose of type safety  
❌ **Mixing business logic with UI** - Makes testing impossible  
❌ **Deeply nested props drilling** - Use context or state management  
❌ **Ignoring error cases** - Always plan for failure scenarios  
❌ **Copy-paste solutions** - Understand before implementing  

### Architecture Mistakes
❌ **Tight coupling** - Components should be replaceable  
❌ **Global state abuse** - Not everything needs to be global  
❌ **Premature optimization** - Measure before optimizing  
❌ **Ignoring security** - Security is not a feature, it's a requirement  

---

## 🎯 Success Metrics

### Code Quality Indicators
- **Type coverage:** >95% TypeScript coverage
- **Test coverage:** >80% for critical paths
- **Performance:** <3s app startup time
- **Bundle size:** <10MB for production build

### Learning Milestones
1. **TypeScript fluency:** Can read and write complex types
2. **React Native proficiency:** Understand platform-specific optimizations
3. **API integration mastery:** Handle all error cases gracefully
4. **Full-stack thinking:** Understand frontend-backend implications

---

## 💡 Remember
- **Question everything:** "Is this the right pattern for this problem?"
- **Think long-term:** "Will this decision make sense in 6 months?"
- **Consider the user:** "How does this impact user experience?"
- **Embrace learning:** "I don't know this yet, but I can learn it"
- **Seek feedback:** "How would an experienced developer approach this?"