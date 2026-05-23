import { getCapturedImageUri } from "@/store/capturedImageStore";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Line, Path } from "react-native-svg";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface ScoreItemProps {
  label: string;
  score: number;
  icon: ImageSourcePropType;
}

function ScoreItem({ label, score, icon }: ScoreItemProps) {
  const radius = 22;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <View style={styles.scoreItem}>
      <View style={styles.scoreCircleContainer}>
        <Svg width={54} height={54}>
          {/* Background circle */}
          <Circle
            cx={27}
            cy={27}
            r={radius}
            stroke="rgba(184,145,247,0.2)"
            strokeWidth={strokeWidth}
            //fill="transparent"
            fill="#F2EAFF"
          />
          {/* Progress circle */}
          <Circle
            cx={27}
            cy={27}
            r={radius}
            stroke="#b891f7"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${progress} ${circumference}`}
            strokeDashoffset={0}
            strokeLinecap="round"
            transform={`rotate(${-90 - (score / 100) * 360} 27 27)`}
          />
        </Svg>
        <View style={styles.centerIcon}>
          <Image source={icon} style={{ width: 20, height: 20 }} />
        </View>
      </View>
      <View style={styles.scoreTextContainer}>
        <Text style={styles.scoreLabel} numberOfLines={1}>
          {label}
        </Text>
        <View style={styles.scoreValueRow}>
          <Text style={styles.scoreValue}>{score}%</Text>
          <TouchableOpacity style={styles.infoButtonContainer}>
            <Ionicons
              name="information-circle-outline"
              size={18}
              color="#383643"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function ScanScoreScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const fromCamera = params.from === "camera";
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [showAiDemo, setShowAiDemo] = useState(fromCamera);

  useFocusEffect(
    useCallback(() => {
      setImageUri(getCapturedImageUri());
    }, []),
  );

  const handleBack = () => {
    router.back();
  };

  const handleViewFullAnalysis = () => {
    router.push({
      pathname: "/full-analysis",
    });
  };

  const scores = [
    {
      label: "Contour",
      score: 66,
      icon: require("@/assets/icons/color-face-icon.png"),
    },
    {
      label: "Blend Quality",
      score: 71,
      icon: require("@/assets/icons/color-blend-icon.png"),
    },
    {
      label: "Foundation",
      score: 79,
      icon: require("@/assets/icons/color-foundation-icon.png"),
    },
    {
      label: "Base finish",
      score: 71,
      icon: require("@/assets/icons/color-base-finish-icon.png"),
    },
    {
      label: "Symmetry",
      score: 88,
      icon: require("@/assets/icons/color-face-icon.png"),
    },
    {
      label: "Color Balance",
      score: 63,
      icon: require("@/assets/icons/color-balance-icon.png"),
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Semi-transparent Header Overlay */}
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
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
            source={
              imageUri
                ? { uri: imageUri }
                : require("@/assets/images/user-v2.png")
            }
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

          {/* AI Internal Clue Message (Temporary Bottom Sheet) */}
          <Modal
            visible={showAiDemo}
            transparent
            animationType="slide"
            onRequestClose={() => setShowAiDemo(false)}
          >
            <View style={styles.modalOverlay}>
              <TouchableOpacity
                style={{ flex: 1 }}
                activeOpacity={1}
                onPress={() => setShowAiDemo(false)}
              />
              <View style={styles.demoSheet}>
                <View style={styles.sheetHandle} />
                <View style={styles.demoHeader}>
                  <View style={styles.sparkleIcon}>
                    <Ionicons name="sparkles" size={24} color="#383643" />
                  </View>
                  <Text style={styles.demoTitle}>Proof of Concept</Text>
                  <TouchableOpacity
                    onPress={() => setShowAiDemo(false)}
                    style={styles.closeIcon}
                  >
                    <Ionicons name="close" size={24} color="#383643" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.demoSheetText}>
                  This is just a demo preview, no real data is being used yet.
                  Once the app is fully live, all scores, analysis, and
                  recommendations will be generated dynamically by Face By You
                  AI.
                </Text>

                <TouchableOpacity
                  style={styles.gotItButton}
                  onPress={() => setShowAiDemo(false)}
                >
                  <Text style={styles.gotItText}>Got it!</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

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

        {/* Scores Bottom Sheet */}
        <View style={styles.scoresContainer}>
          <View style={styles.scoresGrid}>
            {scores.map((item, index) => (
              <ScoreItem
                key={index}
                label={item.label}
                score={item.score}
                icon={item.icon}
              />
            ))}
          </View>

          <TouchableOpacity
            style={styles.analysisButton}
            onPress={handleViewFullAnalysis}
          >
            <Text style={styles.analysisButtonText}>View full Analysis</Text>
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
    alignItems: "center",
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
  imageSection: {
    height: SCREEN_WIDTH * 1.3,
    backgroundColor: "#F4F0E8",
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
    backgroundColor: "rgba(255, 79, 139, 0.20)",
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
  aiMessageWrapper: {
    position: "absolute",
    top: 160,
    left: 20,
    right: 20,
    zIndex: 20,
  },
  aiMessageInner: {
    padding: 12,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.6)",
    overflow: "hidden",
  },
  aiMessageText: {
    color: "#383643",
    fontSize: 13,
    fontFamily: "Inter_500Medium",
    flex: 1,
    marginLeft: 8,
    lineHeight: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  demoSheet: {
    backgroundColor: "#f4f0e8",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: "rgba(184,145,247,0.3)",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  demoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  sparkleIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(184,145,247,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  demoTitle: {
    flex: 1,
    fontSize: 22,
    fontFamily: "Inter_600SemiBold",
    color: "#383643",
  },
  closeIcon: {
    padding: 8,
  },
  demoSheetText: {
    fontSize: 16,
    color: "#383643",
    fontFamily: "Inter_400Regular",
    lineHeight: 24,
    marginBottom: 30,
  },
  gotItButton: {
    backgroundColor: "#b891f7",
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  gotItText: {
    color: "#f4f0e8",
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
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
    backgroundColor: "rgba(115, 112, 128, 0.20)",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(115, 112, 128, 0.20)",
    maxWidth: 160,
    overflow: "hidden",
  },
  calloutText: {
    color: "#F4F0E8",
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
  scoresContainer: {
    backgroundColor: "#f4f0e8",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -40,
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 80,
  },
  scoresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  scoreItem: {
    width: (SCREEN_WIDTH - 44) / 2,
    backgroundColor: "#f4f0e8",
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#f4f0e8",
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
  },
  scoreCircleContainer: {
    width: 54,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreTextContainer: {
    marginLeft: 4,
    flex: 1,
  },
  scoreLabel: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    color: "#383643",
    marginBottom: 2,
  },
  scoreValueRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
  },
  scoreValue: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: "#383643",
  },
  infoButtonContainer: {
    padding: 2,
    marginRight: 4,
  },
  analysisButton: {
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
  analysisButtonText: {
    color: "#f4f0e8",
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
  },
  centerIcon: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});
