import { setCapturedImageUri } from "@/store/capturedImageStore";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState, useCallback } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const cameraIcon = require("@/assets/images/camera.png");

// Face capture modes configuration
const CAPTURE_MODES = [
  {
    id: 0,
    title: 'Front Face',
    subtitle: 'Look directly at the camera',
    icon: 'person-outline' as const,
    guideImage: null,
  },
  {
    id: 1,
    title: 'Right Profile',
    subtitle: 'Turn your head to the right',
    icon: 'arrow-forward-outline' as const,
    guideImage: null,
  },
  {
    id: 2,
    title: 'Left Profile',
    subtitle: 'Turn your head to the left',
    icon: 'arrow-back-outline' as const,
    guideImage: null,
  },
];

export default function TakePictureScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentModeIndex, setCurrentModeIndex] = useState(0);
  const [capturedPhotos, setCapturedPhotos] = useState<(string | null)[]>([null, null, null]);
  const cameraRef = useRef<CameraView>(null);

  const currentMode = CAPTURE_MODES[currentModeIndex];

  const [cameraKey, setCameraKey] = useState(0);

  // Reset state when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      setIsProcessing(false);
      setCurrentModeIndex(0);
      setCapturedPhotos([null, null, null]);
      setCameraKey(prev => prev + 1); // Force camera remount
    }, [])
  );

  const handleBack = () => {
    // Always exit the screen - with confirmation if photos were taken
    const hasAnyPhoto = capturedPhotos.some(p => p !== null);
    if (hasAnyPhoto) {
      Alert.alert(
        "Discard Photos?",
        "You have captured photos. Are you sure you want to go back?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Discard", style: "destructive", onPress: () => router.back() }
        ]
      );
    } else {
      router.back();
    }
  };

  const handlePreviousStep = () => {
    if (currentModeIndex > 0) {
      setCurrentModeIndex(currentModeIndex - 1);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current && !isProcessing) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });

        if (photo) {
          // Mirror the image horizontally (front camera captures non-mirrored, but preview is mirrored)
          // and convert to PNG
          const manipulatedPhoto = await ImageManipulator.manipulateAsync(
            photo.uri,
            [{ flip: ImageManipulator.FlipType.Horizontal }],
            { format: ImageManipulator.SaveFormat.PNG },
          );

          // Save photo for current mode - stay on this step to show preview
          const newPhotos = [...capturedPhotos];
          newPhotos[currentModeIndex] = manipulatedPhoto.uri;
          setCapturedPhotos(newPhotos);
          // Don't auto-advance - let user review and press Continue
        }
      } catch (error) {
        Alert.alert("Error", "Failed to take picture");
        setIsProcessing(false);
      }
    }
  };

  const retakePhoto = () => {
    const newPhotos = [...capturedPhotos];
    newPhotos[currentModeIndex] = null;
    setCapturedPhotos(newPhotos);
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

  // Check if current photo is already captured
  const hasCurrentPhoto = capturedPhotos[currentModeIndex] !== null;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButton}
            activeOpacity={0.6}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color="#383643" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Take a Picture</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          {CAPTURE_MODES.map((mode, index) => {
            const isCompleted = capturedPhotos[index] !== null && index < currentModeIndex;
            const isActive = index === currentModeIndex;

            return (
              <View key={mode.id} style={styles.progressItem}>
                <View
                  style={[
                    styles.progressDot,
                    isCompleted && styles.progressDotCompleted,
                    isActive && styles.progressDotActive,
                  ]}
                >
                  {isCompleted ? (
                    <Ionicons name="checkmark" size={16} color="#FFF" />
                  ) : (
                    <Text style={styles.progressNumber}>{index + 1}</Text>
                  )}
                </View>
                <Text style={[
                  styles.progressLabel,
                  isActive && styles.progressLabelActive
                ]}>
                  {mode.title}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Camera Container */}
        <View style={styles.cameraContainer}>
          <LinearGradient
            colors={["rgba(220,202,249,0.8)", "rgba(226,211,245,0.8)"]}
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
                  <Ionicons name={currentMode.icon} size={22} color="#f4f0e8" />
                </View>
                <View>
                  <Text style={styles.badgeTitle}>{currentMode.title}</Text>
                  <Text style={styles.badgeSubtitle}>
                    {currentMode.subtitle}
                  </Text>
                </View>
              </BlurView>
            </View>

            {/* Camera View or Preview */}
            {hasCurrentPhoto ? (
              <Image
                source={{ uri: capturedPhotos[currentModeIndex]! }}
                style={styles.camera}
                resizeMode="cover"
              />
            ) : (
              <CameraView
                key={cameraKey}
                ref={cameraRef}
                style={styles.camera}
                facing="front"
              />
            )}

            {/* Face Frame Overlay */}
            {!hasCurrentPhoto && (
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
            )}

            {/* Lighting Reminder Badge - Bottom */}
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

            {/* Processing Overlay */}
            {isProcessing && (
              <View style={styles.processingOverlay}>
                <BlurView intensity={30} tint="light" style={StyleSheet.absoluteFill} />
                <ActivityIndicator size="large" color="#383643" />
                <Text style={styles.processingText}>Processing Look...</Text>
              </View>
            )}
          </LinearGradient>
        </View>

        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          {/* Previous Button - show on step 2+ */}
          {currentModeIndex > 0 ? (
            <TouchableOpacity
              style={styles.navButton}
              onPress={handlePreviousStep}
            >
              <Ionicons name="chevron-back" size={24} color="#383643" />
              <Text style={styles.navButtonText}>Previous</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.navButtonPlaceholder} />
          )}

          {/* Center: Capture or Retake */}
          {hasCurrentPhoto ? (
            <TouchableOpacity
              style={styles.retakeButton}
              onPress={retakePhoto}
            >
              <Ionicons name="refresh" size={28} color="#383643" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.captureButton, isProcessing && { opacity: 0.5 }]}
              onPress={takePicture}
              disabled={isProcessing}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
          )}

          {/* Next/Finish Button */}
          {hasCurrentPhoto ? (
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => {
                if (currentModeIndex === CAPTURE_MODES.length - 1) {
                  // Finish - process all photos
                  setIsProcessing(true);

                  // Prepare request payload with all captured photos
                  const requestPayload = {
                    photos: [
                      {
                        type: 'front_face',
                        uri: capturedPhotos[0],
                        label: 'Front Face',
                      },
                      {
                        type: 'right_profile',
                        uri: capturedPhotos[1],
                        label: 'Right Profile',
                      },
                      {
                        type: 'left_profile',
                        uri: capturedPhotos[2],
                        label: 'Left Profile',
                      },
                    ],
                    capturedAt: new Date().toISOString(),
                    deviceInfo: {
                      platform: 'mobile',
                      cameraFacing: 'front',
                    },
                  };

                  // Log the payload for backend preparation
                  console.log('=== MAKEUP SCAN REQUEST PAYLOAD ===');
                  console.log(JSON.stringify(requestPayload, null, 2));
                  console.log('===================================');

                  // TODO: Send requestPayload to backend API
                  // const response = await api.analyzeMakeup(requestPayload);

                  // Show processing for a moment, then navigate
                  setTimeout(() => {
                    const frontFaceUri = capturedPhotos[0]!;
                    setCapturedImageUri(frontFaceUri);
                    router.push({
                      pathname: "/scan-score",
                      params: { imageUri: frontFaceUri, from: "camera" },
                    });
                  }, 1500);
                } else {
                  // Move to next step
                  setCurrentModeIndex(currentModeIndex + 1);
                }
              }}
            >
              <Text style={styles.navButtonText}>
                {currentModeIndex === CAPTURE_MODES.length - 1 ? "Finish" : "Next"}
              </Text>
              <Ionicons
                name={currentModeIndex === CAPTURE_MODES.length - 1 ? "checkmark" : "chevron-forward"}
                size={24}
                color="#383643"
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.navButtonPlaceholder} />
          )}
        </View>

        {/* Step indicator text */}
        <Text style={styles.stepText}>
          Step {currentModeIndex + 1} of {CAPTURE_MODES.length}
        </Text>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f0e8",
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
    color: "#383643",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Inter_500Medium",
  },
  permissionButton: {
    backgroundColor: "#b891f7",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  permissionButtonText: {
    color: "#f4f0e8",
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
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Inter_600SemiBold",
    color: "#383643",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 20,
  },
  progressItem: {
    alignItems: "center",
    gap: 4,
  },
  progressDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(184,145,247,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  progressDotActive: {
    backgroundColor: "#b891f7",
    transform: [{ scale: 1.1 }],
  },
  progressDotCompleted: {
    backgroundColor: "#4CAF50",
  },
  progressNumber: {
    color: "#FFF",
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  progressLabel: {
    fontSize: 10,
    fontFamily: "Inter_500Medium",
    color: "#565364",
  },
  progressLabelActive: {
    color: "#383643",
    fontFamily: "Inter_600SemiBold",
  },
  cameraContainer: {
    paddingHorizontal: 26,
    paddingTop: 4,
    paddingBottom: 12,
    alignItems: "center",
  },
  cameraWrapper: {
    width: 338,
    height: 400,
    borderRadius: 20,
    borderWidth: 6,
    borderColor: "#b891f7",
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
    width: 24,
    height: 24,
    borderColor: "#b891f7",
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderLeftWidth: 3,
    borderTopWidth: 3,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderRightWidth: 3,
    borderTopWidth: 3,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderRightWidth: 3,
    borderBottomWidth: 3,
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
    backgroundColor: "rgba(184, 145, 247, 0.30)",
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
    backgroundColor: "rgba(184, 145, 247, 0.30)",
  },
  badgeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#b891f7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  badgeIcon: {
    width: 22,
    height: 22,
    tintColor: "#f4f0e8",
  },
  badgeTitle: {
    color: "#f4f0e8",
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
  },
  badgeSubtitle: {
    color: "#f4f0e8",
    fontSize: 16,
    fontFamily: "Inter_400Regular",
  },
  bottomControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
    paddingTop: 8,
    paddingHorizontal: 20,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f0e8",
    borderWidth: 2,
    borderColor: "#b891f7",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 4,
    minWidth: 100,
    justifyContent: "center",
  },
  navButtonText: {
    color: "#383643",
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  navButtonPlaceholder: {
    minWidth: 100,
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#f4f0e8",
    borderWidth: 5,
    borderColor: "#b891f7",
    justifyContent: "center",
    alignItems: "center",
  },
  retakeButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#f4f0e8",
    borderWidth: 3,
    borderColor: "#b891f7",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonInner: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#b891f7",
  },
  processingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  processingText: {
    marginTop: 16,
    color: "#383643",
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
  },
  stepText: {
    textAlign: "center",
    color: "#565364",
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    paddingBottom: 8,
  },
});
