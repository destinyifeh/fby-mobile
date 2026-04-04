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

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface ScoreItemProps {
  label: string;
  score: number;
}

function ScoreItem({ label, score }: ScoreItemProps) {
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
            stroke="rgba(141, 82, 65, 0.1)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <Circle
            cx={27}
            cy={27}
            r={radius}
            stroke="#E3BCB5"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${progress} ${circumference}`}
            strokeDashoffset={0}
            strokeLinecap="round"
            transform={`rotate(${-90 - (score / 100) * 360} 27 27)`}
          />
        </Svg>
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
              color="#8D5241"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function ScanScoreScreen() {
  const router = useRouter();
  const [imageUri, setImageUri] = useState<string | null>(null);

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
    { label: "Contour", score: 66 },
    { label: "Blend Quality", score: 71 },
    { label: "Foundation", score: 79 },
    { label: "Base finish", score: 71 },
    { label: "Symmetry", score: 88 },
    { label: "Color Balance", score: 63 },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Semi-transparent Header Overlay */}
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#8D5241" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Scan & score</Text>
            <View style={{ width: 40 }} />
          </View>
        </SafeAreaView>
        {/* Image Section with Overlays */}
        <View style={styles.imageSection}>
          <Image
            source={
              imageUri ? { uri: imageUri } : require("@/assets/images/user.png")
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

          {/* Dotted Cheek / Under-Eye Highlights */}
          <View style={styles.cheekHighlightLeft} pointerEvents="none">
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
          </View>
        </View>

        {/* Scores Bottom Sheet */}
        <View style={styles.scoresContainer}>
          <View style={styles.scoresGrid}>
            {scores.map((item, index) => (
              <ScoreItem key={index} label={item.label} score={item.score} />
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
    backgroundColor: "#FAF3E8",
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
    color: "#8D5241",
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  imageSection: {
    height: SCREEN_WIDTH * 1.3,
    backgroundColor: "#E3BCB5",
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
    backgroundColor: "rgba(100, 50, 40, 0.3)",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(251, 230, 211, 0.4)",
    overflow: "hidden",
  },
  detectedText: {
    color: "#E8D4C4",
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
    backgroundColor: "rgba(100, 50, 40, 0.3)",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    maxWidth: 160,
    overflow: "hidden",
  },
  calloutText: {
    color: "#E8D4C4",
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
    backgroundColor: "#FAF3E8",
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
    backgroundColor: "#E3BCB533",
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#8D5241",
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
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
    color: "#8D5241",
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
    color: "#8D5241",
  },
  infoButtonContainer: {
    padding: 2,
    marginRight: 4,
  },
  analysisButton: {
    backgroundColor: "#8D5241",
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
    color: "#FFF2DA",
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
  },
});
