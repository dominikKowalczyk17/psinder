import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "../../stores/ThemeContext";
import PhotoUpload from "../forms/PhotoUpload";
import { ThemedText } from "../ui/ThemedText";

interface DogPhotosSectionProps {
  dogName: string;
  dogPhotos: string[];
  onAddPhoto: (uri: string) => void;
}

export const DogPhotosSection: React.FC<DogPhotosSectionProps> = ({
  dogName,
  dogPhotos,
  onAddPhoto,
}) => {
  const { theme } = useTheme();
  return (
    <View style={styles.dogPhotosSection}>
      <ThemedText style={[styles.sectionTitle, { color: theme.text.primary }]}>
        Meet {dogName}
      </ThemedText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.photosScroll}
      >
        {dogPhotos.map((photo, index) => (
          <Image key={index} source={{ uri: photo }} style={styles.dogPhoto} />
        ))}
        <PhotoUpload
          onPhotoSelected={onAddPhoto}
          style={styles.addPhotoButton}
          label="Add Photo"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dogPhotosSection: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    paddingTop: 12,
  },
  photosScroll: {
    flexDirection: "row",
    marginBottom: 16,
  },
  dogPhoto: {
    width: 140,
    height: 140,
    borderRadius: 16,
    marginRight: 16,
  },
  addPhotoButton: {
    width: 140,
    height: 140,
  },
});
