import { setCapturedImageUri } from "@/store/capturedImageStore";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const cameraIcon = require("@/assets/images/camera.png");
const resetIcon = require("@/assets/images/reset.png");

// Face capture modes configuration - commented out for now
// const CAPTURE_MODES = [
//   { id: 0, title: 'Front Face', subtitle: 'Look directly at the camera' },
//   { id: 1, title: 'Left Profile', subtitle: 'Turn your head to the left' },
//   { id: 2, title: 'Right Profile', subtitle: 'Turn your head to the right' },
//   { id: 3, title: 'Tilted Up', subtitle: 'Tilt your head slightly up' },
// ];

export default function TakePictureScreen() {
  const router = useRouter();
  const [facing, setFacing] = useState<"front" | "back">("front");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const handleBack = () => {
    router.back();
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        if (photo) {
          // router.push({
          //   pathname: "/scan-score",
          //   params: { imageUri: photo.uri },
          // });
          // Convert the JPG photo directly to a PNG using ImageManipulator
          const manipulatedPhoto = await ImageManipulator.manipulateAsync(
            photo.uri,
            [], // No resizing/cropping, just format conversion
            { format: ImageManipulator.SaveFormat.PNG },
          );

          // By passing the URI in memory, it averts the Expo Router param corruption
          setCapturedImageUri(manipulatedPhoto.uri);
          router.push({ pathname: "/scan-score" });
        }
      } catch (error) {
        Alert.alert("Error", "Failed to take picture");
      }
    }
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Loading camera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.permissionContainer}>
          <Text style={styles.permissionText}>
            We need your permission to show the camera
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#8D5241" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Take a Picture</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Camera Container */}
        <View style={styles.cameraContainer}>
          <LinearGradient
            colors={["rgba(255,242,218,0.8)", "rgba(249,188,153,0.8)"]}
            style={styles.cameraWrapper}
          >
            {/* Instruction Badge - Top */}
            <View style={styles.instructionBadgeTopWrapper}>
              <BlurView
                intensity={25}
                tint="light"
                style={styles.instructionBadgeTopInner}
              >
                <View style={styles.badgeIconContainer}>
                  <Image source={cameraIcon} style={styles.badgeIcon} />
                </View>
                <View>
                  <Text style={styles.badgeTitle}>Front Face</Text>
                  <Text style={styles.badgeSubtitle}>
                    Look directly at the camera
                  </Text>
                </View>
              </BlurView>
            </View>

            {/* Camera View */}
            <CameraView ref={cameraRef} style={styles.camera} facing={facing} />

            {/* Face Frame Overlay - positioned absolutely on top of camera */}
            <View style={styles.faceFrame}>
              {/* Top left corner */}
              <View style={[styles.corner, styles.cornerTopLeft]} />
              {/* Top right corner */}
              <View style={[styles.corner, styles.cornerTopRight]} />
              {/* Bottom left corner */}
              <View style={[styles.corner, styles.cornerBottomLeft]} />
              {/* Bottom right corner */}
              <View style={[styles.corner, styles.cornerBottomRight]} />
            </View>

            {/* Instruction Badge - Bottom */}
            <BlurView
              intensity={25}
              tint="light"
              style={styles.instructionBadgeBottom}
            >
              <View style={styles.badgeIconContainer}>
                <Image source={cameraIcon} style={styles.badgeIcon} />
              </View>
              <View>
                <Text style={styles.badgeSubtitle}>Ensure good</Text>
                <Text style={styles.badgeSubtitle}>lighting</Text>
              </View>
            </BlurView>
          </LinearGradient>
        </View>

        {/* Camera Mode Selector - commented out for now */}
        {/* <View style={styles.modeSelector}>
          {CAPTURE_MODES.map((mode, index) => (
            <TouchableOpacity
              key={mode.id}
              style={[
                styles.modeButton,
                styles.modeButtonInactive,
                selectedMode === index && styles.modeButtonActive,
              ]}
              onPress={() => handleModeSelect(index)}
            >
              {capturedPhotos[index] ? (
                <Ionicons name="checkmark" size={28} color="#FFF2DA" />
              ) : (
                <Image source={cameraIcon} style={styles.modeIcon} />
              )}
            </TouchableOpacity>
          ))}
        </View> */}

        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          {/* <TouchableOpacity onPress={handleBack}>
            <Image source={resetIcon} style={styles.resetIcon} />
          </TouchableOpacity> */}

          {/* Capture Button */}
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>

          {/* <View style={{ width: 40 }} /> */}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF2DA",
  },
  safeArea: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionText: {
    color: "#8D5241",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Inter_500Medium",
  },
  permissionButton: {
    backgroundColor: "#8D5241",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  permissionButtonText: {
    color: "#FFF2DA",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Inter_600SemiBold",
    color: "#8D5241",
  },
  cameraContainer: {
    paddingHorizontal: 26,
    paddingTop: 8,
    paddingBottom: 12,
    alignItems: "center",
  },
  cameraWrapper: {
    width: 338,
    height: 441,
    borderRadius: 20,
    borderWidth: 6,
    borderColor: "#E3BCB5",
    overflow: "hidden",
    position: "relative",
  },
  camera: {
    flex: 1,
  },
  faceFrame: {
    position: "absolute",
    top: "22%",
    left: "18%",
    right: "18%",
    bottom: "32%",
  },
  corner: {
    position: "absolute",
    width: 20,
    height: 20,
    borderColor: "#C4A68D",
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderLeftWidth: 2,
    borderTopWidth: 2,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderRightWidth: 2,
    borderTopWidth: 2,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderRightWidth: 2,
    borderBottomWidth: 2,
  },
  instructionBadgeTopWrapper: {
    position: "absolute",
    top: 8,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10,
  },
  instructionBadgeTopInner: {
    borderRadius: 49,
    paddingHorizontal: 13,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    width: 288,
    height: 60,
    overflow: "hidden",
    backgroundColor: "rgba(166, 123, 91, 0.30)",
  },
  instructionBadgeBottom: {
    position: "absolute",
    bottom: 16,
    left: 16,
    borderRadius: 49,
    paddingRight: 16,
    paddingLeft: 8,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
    overflow: "hidden",
    backgroundColor: "rgba(166, 123, 91, 0.30)",
  },
  badgeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#8D5241",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  badgeIcon: {
    width: 22,
    height: 22,
    tintColor: "#FFF2DA",
  },
  badgeTitle: {
    color: "#FFF2DA",
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
  },
  badgeSubtitle: {
    color: "#FFF2DA",
    fontSize: 16,
    fontFamily: "Inter_400Regular",
  },
  modeSelector: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  modeButton: {
    width: 70,
    height: 70,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  modeButtonInactive: {
    backgroundColor: "#A67B5B",
  },
  modeButtonActive: {
    backgroundColor: "#8D5241",
  },
  modeIcon: {
    width: 24,
    height: 24,
    tintColor: "#FFF2DA",
  },
  bottomControls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 24,
    paddingTop: 12,
    gap: 60,
  },
  resetIcon: {
    width: 50,
    height: 50,
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#FFF2DA",
    borderWidth: 5,
    borderColor: "#8D5241",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonInner: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#C4A68D",
  },
});
