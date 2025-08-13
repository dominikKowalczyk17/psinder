import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../stores/ThemeContext";
import { ThemedText } from "../ui/ThemedText";

interface MatchModalProps {
  visible: boolean;
  onClose: () => void;
  dogName: string;
  dogImages: string[];
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const MatchModal: React.FC<MatchModalProps> = ({
  visible,
  onClose,
  dogName,
  dogImages,
}) => {
  const { theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [message, setMessage] = useState("");

  React.useEffect(() => {
    if (visible) {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
      setMessage("");
    }
  }, [visible]);

  if (!visible) return null;
  const imageUri =
    dogImages && dogImages.length > 0
      ? dogImages[0]
      : "https://placehold.co/400x400?text=No+Photo";

  return (
    <Animated.View style={[styles.fullScreenOverlay, { opacity: fadeAnim }]}>
      <Animated.Image
        source={{ uri: imageUri }}
        style={[styles.backgroundImage, { opacity: fadeAnim }]}
        resizeMode="cover"
        blurRadius={1}
      />
      <View
        style={[styles.overlay, { backgroundColor: "rgba(30,30,30,0.45)" }]}
      />
      <KeyboardAvoidingView
        style={styles.contentContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.centeredMatchTextContainer}>
          <ThemedText style={[styles.matchText, { color: theme.success }]}>
            It&apos;s a match!
          </ThemedText>
        </View>
        <View style={styles.actionsContainer}>
          <TextInput
            style={[
              styles.input,
              {
                color: theme.text.primary,
                backgroundColor: theme.background.secondary,
                borderColor: theme.border.light,
              },
            ]}
            placeholder="Send a message..."
            placeholderTextColor={theme.text.tertiary}
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity style={[styles.button]} onPress={onClose}>
            <ThemedText
              style={[styles.buttonText, { color: theme.text.accent }]}
            >
              Keep Swiping
            </ThemedText>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fullScreenOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    width: "100%",
    height: screenHeight,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#222",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  contentContainer: {
    zIndex: 3,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 100,
    paddingBottom: 0,
  },
  centeredMatchTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  matchText: {
    fontSize: 46,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "#000a",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    paddingTop: 18,
  },
  actionsContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 48,
  },
  dogNameContainer: {
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 18,
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginBottom: 32,
  },
  dogName: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  input: {
    width: "100%",
    fontSize: 14,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 24,
    borderWidth: 1,
  },
  button: {
    width: "50%",
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
