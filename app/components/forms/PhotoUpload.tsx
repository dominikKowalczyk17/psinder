import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActionSheetIOS,
  Alert,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../stores/ThemeContext";
import { ThemedText } from "../ui/ThemedText";

interface PhotoUploadProps {
  onPhotoSelected: (uri: string) => void;
  currentPhoto?: string;
  style?: any;
  label?: string;
}

export default function PhotoUpload({
  onPhotoSelected,
  currentPhoto,
  style,
  label = "Add Photo",
}: PhotoUploadProps) {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const requestPermissions = async () => {
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    const { status: libraryStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== "granted" || libraryStatus !== "granted") {
      Alert.alert(
        "Permissions Required",
        "Please grant camera and photo library permissions to upload photos.",
        [{ text: "OK" }]
      );
      return false;
    }
    return true;
  };

  const selectPhoto = async (useCamera: boolean = false) => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    setIsLoading(true);

    try {
      const result = useCamera
        ? await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
          })
        : await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
          });

      if (!result.canceled && result.assets && result.assets[0]) {
        onPhotoSelected(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Photo selection error:", error);
      Alert.alert("Error", "Failed to select photo. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const showPhotoOptions = () => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Cancel", "Take Photo", "Choose from Library"],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            selectPhoto(true);
          } else if (buttonIndex === 2) {
            selectPhoto(false);
          }
        }
      );
    } else {
      Alert.alert("Select Photo", "Choose how you want to add a photo", [
        { text: "Cancel", style: "cancel" },
        { text: "Take Photo", onPress: () => selectPhoto(true) },
        { text: "Choose from Library", onPress: () => selectPhoto(false) },
      ]);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={showPhotoOptions}
      disabled={isLoading}
    >
      {currentPhoto ? (
        <View style={styles.photoContainer}>
          <Image source={{ uri: currentPhoto }} style={styles.photo} />
          <View style={styles.overlay}>
            <ThemedText
              style={[styles.changeText, { color: theme.text.inverse }]}
            >
              {isLoading ? "Loading..." : "Change Photo"}
            </ThemedText>
          </View>
        </View>
      ) : (
        <View
          style={[
            styles.addPhotoContainer,
            {
              borderColor: theme.primary,
              backgroundColor: `${theme.primary}10`,
            },
          ]}
        >
          <ThemedText style={[styles.addPhotoText, { color: theme.primary }]}>
            {isLoading ? "⏳" : "+"}
          </ThemedText>
          <ThemedText style={[styles.addPhotoLabel, { color: theme.primary }]}>
            {isLoading ? "Loading..." : label}
          </ThemedText>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 12,
    overflow: "hidden",
  },
  photoContainer: {
    flex: 1,
    position: "relative",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  changeText: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  addPhotoContainer: {
    flex: 1,
    borderWidth: 2,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  addPhotoText: {
    fontSize: 32,
    marginBottom: 4,
  },
  addPhotoLabel: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
});
