import { getCapturedImageUri } from "@/store/capturedImageStore";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useFocusEffect, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Line, Path } from "react-native-svg";
import { fbyIcons } from "@/types";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function FullAnalysisScreen() {
  const router = useRouter();
  // const { imageUri } = useLocalSearchParams<{ imageUri: string }>();

  const [imageUri, setImageUri] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      setImageUri(getCapturedImageUri());
    }, []),
  );

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#383643" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Scan & score</Text>
            <View style={{ width: 40 }} />
          </View>
        </SafeAreaView>
        {/* Image Section with Overlays */}
        <View style={styles.imageSection}>
          <Image
            source={imageUri ? { uri: imageUri } : fbyIcons.makeupLady}
            style={styles.capturedImage}
            resizeMode="cover"
          />

          {/* Detected Look Badge */}
          <View style={styles.detectedBadgeWrapper}>
            <BlurView intensity={40} tint="dark" style={styles.detectedBadge}>
              <Text style={styles.detectedText}>
                Detected look is full glam
              </Text>
            </BlurView>
          </View>

          {/* Callout 1: Top Right */}
          <View style={[styles.callout1Wrapper, { zIndex: 10 }]}>
            <BlurView intensity={40} tint="dark" style={styles.calloutBubble}>
              <Text style={styles.calloutText}>
                This worked well,{"\n"}but isn't blended{"\n"}properly
              </Text>
            </BlurView>
            <Svg height="80" width="100" style={styles.calloutLine1}>
              {/* Path from bottom-left of bubble (80,0) gently diagonally to the cheek (30,50), then straight left to (15,50) */}
              <Path
                d="M 80 0 L 30 50 L 15 50"
                stroke="white"
                strokeWidth="1.5"
                strokeDasharray="3, 3"
                fill="none"
              />
              <Circle cx="15" cy="50" r="10" fill="rgba(255,255,255,0.4)" />
              <Circle cx="15" cy="50" r="4" fill="#E88282" />
            </Svg>
          </View>

          {/* Callout 2: Bottom Left */}
          <View style={[styles.callout2Wrapper, { zIndex: 10 }]}>
            <Svg height="80" width="100" style={styles.calloutLine2}>
              {/* Path from top-right of bubble (20,80) diagonally up-right to cheek (70,30), then right to (85,30) */}
              <Path
                d="M 20 80 L 70 30 L 85 30"
                stroke="white"
                strokeWidth="1.5"
                strokeDasharray="3, 3"
                fill="none"
              />
              <Circle cx="85" cy="30" r="10" fill="rgba(255,255,255,0.4)" />
              <Circle cx="85" cy="30" r="4" fill="#E88282" />
            </Svg>
            <BlurView intensity={40} tint="dark" style={styles.calloutBubble}>
              <Text style={styles.calloutText}>
                Your blush{"\n"}looks amazing
              </Text>
            </BlurView>
          </View>

          {/* Callout 3: Bottom Right */}
          <View style={[styles.callout3Wrapper, { zIndex: 10 }]}>
            <BlurView intensity={40} tint="dark" style={styles.calloutBubble}>
              <Text style={styles.calloutText}>
                Try lining your{"\n"}lips more
              </Text>
            </BlurView>
            <Svg height="40" width="100" style={styles.calloutLine3}>
              {/* Straight path left horizontally from bubble middle-left (100,20) to lip (20,20) */}
              <Line
                x1="100"
                y1="20"
                x2="20"
                y2="20"
                stroke="white"
                strokeWidth="1.5"
                strokeDasharray="3, 3"
                fill="none"
              />
              <Circle cx="20" cy="20" r="10" fill="rgba(255,255,255,0.4)" />
              <Circle cx="20" cy="20" r="4" fill="#E88282" />
            </Svg>
          </View>

          {/* Dotted Cheek / Under-Eye Highlights - Commented out for now */}
          {/* <View style={styles.cheekHighlightLeft} pointerEvents="none">
            <Svg height="80" width="100">
              <Path
                d="M 15 20 Q -5 40 20 60 Q 50 80 80 60 Q 100 40 85 25 Q 70 15 50 25 Q 30 35 15 20"
                fill="none"
                stroke="rgba(255, 255, 255, 0.7)"
                strokeWidth="1.5"
                strokeDasharray="4, 4"
              />
            </Svg>
          </View>
          <View style={styles.cheekHighlightRight} pointerEvents="none">
            <Svg height="80" width="100">
              <Path
                d="M 85 20 Q 105 40 80 60 Q 50 80 20 60 Q 0 40 15 25 Q 30 15 50 25 Q 70 35 85 20"
                fill="none"
                stroke="rgba(255, 255, 255, 0.7)"
                strokeWidth="1.5"
                strokeDasharray="4, 4"
              />
            </Svg>
          </View> */}
        </View>

        {/* Analysis Card */}
        <View style={styles.analysisCard}>
          {/* Title */}
          <View style={styles.analysisTitleRow}>
            <Text style={styles.analysisTitle}>Analysis</Text>
            <TouchableOpacity style={styles.infoButton}>
              <Ionicons
                name="information-circle-outline"
                size={24}
                color="#b891f7"
              />
            </TouchableOpacity>
          </View>

          {/* Overall Score */}
          <View style={styles.overallScoreBadge}>
            <Text style={styles.overallScoreText}>
              Your Overall Score: 78/100
            </Text>
          </View>

          {/* Summary */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryText}>
              A confident full-glam look with strong color balance and smooth
              foundation blending.
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryText}>
              Small refinements in symmetry, contour definition, and lip
              precision can elevate this look to professional level.
            </Text>
          </View>

          {/* What You Did Well Section */}
          <View style={styles.sectionBadge}>
            <Text style={styles.sectionBadgeText}>What You Did Well</Text>
          </View>

          <View style={styles.feedbackCard}>
            <Text style={styles.feedbackText}>
              <Text style={styles.feedbackBold}>Foundation:</Text> Even tone and
              natural skin finish.
            </Text>
            <Text style={styles.feedbackText}>
              <Text style={styles.feedbackBold}>Blending:</Text> Eyeshadow
              transitions are smooth with no harsh edges.
            </Text>
          </View>

          {/* Areas to Improve Section */}
          <View style={[styles.sectionBadge, styles.sectionBadgeWarning]}>
            <Text style={styles.sectionBadgeText}>Areas to Improve</Text>
          </View>

          <View style={styles.feedbackCard}>
            <Text style={styles.feedbackText}>
              <Text style={styles.feedbackBold}>Contour:</Text> Slightly uneven
              on right side. Try blending upward toward the ear.
            </Text>
            <Text style={styles.feedbackText}>
              <Text style={styles.feedbackBold}>Lips:</Text> Liner is visible
              outside natural lip line. Use a lip brush for precision.
            </Text>
            <Text style={styles.feedbackText}>
              <Text style={styles.feedbackBold}>Symmetry:</Text> Brow arch is
              higher on left side. Consider mapping before filling.
            </Text>
          </View>

          {/* Pro Tips Section */}
          <View style={[styles.sectionBadge, styles.sectionBadgeTip]}>
            <Text style={styles.sectionBadgeText}>Pro Tips</Text>
          </View>

          <View style={styles.feedbackCard}>
            <Text style={styles.feedbackText}>
              - Use setting spray to lock in your look
            </Text>
            <Text style={styles.feedbackText}>
              - Try a lighter hand with bronzer for a more natural finish
            </Text>
            <Text style={styles.feedbackText}>
              - Consider color-correcting before foundation for an even base
            </Text>
          </View>

          {/* Done Button */}
          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => router.push("/(tabs)")}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f0e8",
  },
  safeArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: "Inter_600SemiBold",
    color: "#383643",
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  imageSection: {
    height: SCREEN_WIDTH * 1.3,
    backgroundColor: "#e2d3f5",
    position: "relative",
  },
  capturedImage: {
    width: "100%",
    height: "100%",
  },
  detectedBadgeWrapper: {
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10,
  },
  detectedBadge: {
    backgroundColor: "rgba(255,79,139,0.2)",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(201,168,255,0.2)",
    overflow: "hidden",
  },
  detectedText: {
    color: "#383643",
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  callout1Wrapper: {
    position: "absolute",
    top: "35%",
    right: 20,
  },
  callout2Wrapper: {
    position: "absolute",
    bottom: "22%",
    left: 20,
  },
  callout3Wrapper: {
    position: "absolute",
    bottom: "10%",
    right: 20,
  },
  calloutBubble: {
    backgroundColor: "rgba(201,168,255,0.2)",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    maxWidth: 160,
    overflow: "hidden",
  },
  calloutText: {
    color: "#f4f0e8",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
  },
  calloutLine1: {
    position: "absolute",
    left: -70,
    bottom: -45,
  },
  calloutLine2: {
    position: "absolute",
    right: -80,
    top: -70,
  },
  calloutLine3: {
    position: "absolute",
    left: -90,
    top: "50%",
    marginTop: -20,
  },
  cheekHighlightLeft: {
    position: "absolute",
    top: "50%",
    left: "23%",
  },
  cheekHighlightRight: {
    position: "absolute",
    top: "50%",
    right: "23%",
  },
  analysisCard: {
    backgroundColor: "#f4f0e8",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -40,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 80,
    shadowColor: "#b891f7",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  analysisTitleRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    position: "relative",
  },
  analysisTitle: {
    fontSize: 24,
    fontFamily: "Inter_600SemiBold",
    color: "#383643",
    textAlign: "center",
  },
  infoButton: {
    position: "absolute",
    right: 0,
  },
  overallScoreBadge: {
    backgroundColor: "rgba(201,168,255,0.2)",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  overallScoreText: {
    color: "#b891f7",
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  summaryCard: {
    backgroundColor: "rgba(244,240,232,0.2)",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  summaryText: {
    color: "#383643",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
  },
  sectionBadge: {
    backgroundColor: "#b891f7",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignSelf: "flex-start",
    marginTop: 8,
    marginBottom: 12,
  },
  sectionBadgeWarning: {
    backgroundColor: "#b891f7",
  },
  sectionBadgeTip: {
    backgroundColor: "#b891f7",
  },
  sectionBadgeText: {
    color: "#f4f0e8",
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  feedbackCard: {
    backgroundColor: "rgba(244,240,232,0.2)",
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    gap: 8,
  },
  feedbackText: {
    color: "#383643",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
  },
  feedbackBold: {
    fontFamily: "Inter_600SemiBold",
  },
  doneButton: {
    backgroundColor: "#b891f7",
    borderRadius: 35,
    paddingVertical: 20,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    marginHorizontal: 10,
  },
  doneButtonText: {
    color: "#f4f0e8",
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
  },
});
