# Psinder - Restructured Codebase

## New Directory Structure

```
app/
├── api/                    # API layer
│   ├── client/            # Enhanced ApiAdapter
│   │   └── ApiAdapter.ts
│   ├── services/          # Resource-specific services
│   │   ├── createUserSerive.ts
│   │   └── notificationService.ts
│   ├── types/             # Generated from your Spring Boot OpenAPI
│   └── transformers/      # Data transformation utilities
│       └── dataTransformers.ts
├── components/            # Reusable components
│   ├── ui/               # Basic components (ThemedText, ThemedView)
│   │   ├── ThemedText.tsx
│   │   ├── ThemedView.tsx
│   │   ├── IconSymbol.tsx
│   │   └── index.ts
│   ├── forms/            # Form-specific components
│   │   ├── PhotoUpload.tsx
│   │   └── index.ts
│   ├── profile/          # Profile-related components
│   │   ├── DogDetailsSection.tsx
│   │   ├── DogPhotosSection.tsx
│   │   ├── ProfileActions.tsx
│   │   ├── ProfileHeader.tsx
│   │   ├── UserInfoSection.tsx
│   │   └── index.ts
│   └── shared/           # Cross-feature components
│       ├── MatchModal.tsx
│       └── ExternalLink.tsx
├── features/             # Feature-based organization
│   ├── auth/             # Login, registration, profile-setup
│   │   └── profile-setup.tsx
│   ├── matching/         # Home, matches, match modal
│   │   ├── home.tsx
│   │   ├── matches.tsx
│   │   └── match.tsx
│   ├── profile/          # Profile viewing/editing
│   │   ├── profile.tsx
│   │   └── profile-edit.tsx
│   ├── settings/         # Settings and preferences
│   │   └── settings.tsx
│   └── chat/             # Chat functionality
│       ├── chat.tsx
│       └── [matchId].tsx
├── hooks/                # Custom hooks for API integration
│   ├── useColorScheme.ts
│   ├── useColorScheme.web.ts
│   ├── useNotificationService.ts
│   └── useThemeColor.ts
├── stores/               # State management (includes existing contexts)
│   └── ThemeContext.tsx
├── utils/                # Utility functions
├── constants/            # App constants (Theme, Colors, etc.)
│   ├── Colors.ts
│   └── Theme.ts
├── types/                # Global TypeScript types
│   ├── chat.ts
│   ├── energyLevelType.ts
│   ├── sizeType.ts
│   ├── Dog.ts
│   └── User.ts
├── _layout.tsx          # Root layout
├── +not-found.tsx       # 404 page
├── index.tsx            # Entry point
├── home.tsx             # → exports from features/matching/home
├── matches.tsx          # → exports from features/matching/matches
├── match.tsx            # → exports from features/matching/match
├── profile.tsx          # → exports from features/profile/profile
├── profile-edit.tsx     # → exports from features/profile/profile-edit
├── profile-setup.tsx    # → exports from features/auth/profile-setup
├── settings.tsx         # → exports from features/settings/settings
├── chat.tsx             # → exports from features/chat/chat
└── chat/
    └── [matchId].tsx    # → exports from features/chat/[matchId]
```

## Key Changes

### 1. Feature-Based Architecture
- Organized screens by feature domains (auth, matching, profile, settings, chat)
- Each feature contains related screens and logic
- Better separation of concerns

### 2. Enhanced API Layer
- `app/api/client/` - Contains the enhanced ApiAdapter
- `app/api/services/` - Resource-specific API services
- `app/api/types/` - API response types (ready for OpenAPI generation)
- `app/api/transformers/` - Data transformation utilities

### 3. Component Organization
- `app/components/ui/` - Basic reusable components
- `app/components/forms/` - Form-specific components
- `app/components/profile/` - Profile-related components
- `app/components/shared/` - Cross-feature shared components

### 4. State Management Ready
- `app/stores/` - Centralized state management directory
- Existing ThemeContext moved here
- Ready for Zustand integration

### 5. Type Safety
- `app/types/` - Global TypeScript definitions
- Entity types (Dog, User) moved here
- API types ready for code generation

## Path Mappings

Updated `tsconfig.json` with new path mappings:
- `@/api/*` → `./app/api/*`
- `@/components/*` → `./app/components/*`
- `@/features/*` → `./app/features/*`
- `@/hooks/*` → `./app/hooks/*`
- `@/stores/*` → `./app/stores/*`
- `@/utils/*` → `./app/utils/*`
- `@/constants/*` → `./app/constants/*`
- `@/types/*` → `./app/types/*`

## Next Steps

1. **Update Import Paths**: Update remaining import statements in feature files to use new paths
2. **Add Zustand**: Implement Zustand for better state management in `app/stores/`
3. **API Services**: Create resource-specific services in `app/api/services/`
4. **Type Generation**: Set up OpenAPI type generation for `app/api/types/`
5. **Remove Old Directories**: Clean up the original directories after confirming everything works

## Benefits

- **Scalability**: Easy to add new features and components
- **Maintainability**: Clear separation of concerns
- **Developer Experience**: Better IntelliSense and navigation
- **Team Collaboration**: Feature-based structure makes parallel development easier
- **Testing**: Easier to unit test individual features and components
