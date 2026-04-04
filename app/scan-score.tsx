import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Circle, Line, Path } from "react-native-svg";
import { BlurView } from "expo-blur";

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
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            transform="rotate(-90 27 27)"
          />
        </Svg>
      </View>
      <View style={styles.scoreTextContainer}>
        <Text style={styles.scoreLabel}>{label}</Text>
        <Text style={styles.scoreValue}>{score}%</Text>
      </View>
      <TouchableOpacity style={styles.infoButtonContainer}>
        <Ionicons name="information-circle-outline" size={18} color="#8D5241" />
      </TouchableOpacity>
    </View>
  );
}

export default function ScanScoreScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ imageUri: string }>();
  const imageUri = params.imageUri;

  const handleBack = () => {
    router.back();
  };

  const handleViewFullAnalysis = () => {
    router.push({
      pathname: "/full-analysis",
      params: { imageUri },
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

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Image Section with Overlays */}
        <View style={styles.imageSection}>
          <Image
            source={
              imageUri
                ? { uri: imageUri }
                : require("@/assets/images/user.png")
            }
            style={styles.capturedImage}
            resizeMode="cover"
          />

          {/* Detected Look Badge */}
          <View style={styles.detectedBadgeWrapper}>
            <BlurView intensity={40} tint="light" style={styles.detectedBadge}>
              <Text style={styles.detectedText}>Detected look is full glam</Text>
            </BlurView>
          </View>

          {/* Callout 1: Top Right */}
          <View style={styles.callout1Wrapper}>
            <View style={styles.calloutBubble}>
              <Text style={styles.calloutText}>
                This worked well,{"\n"}but isn't blended{"\n"}properly
              </Text>
            </View>
            <Svg height="40" width="60" style={styles.calloutLine1}>
              <Line
                x1="0"
                y1="0"
                x2="50"
                y2="30"
                stroke="white"
                strokeWidth="1.5"
                strokeDasharray="3, 3"
              />
              <Circle cx="52" cy="32" r="4" fill="#E3BCB5" stroke="#8D5241" strokeWidth="1" />
            </Svg>
          </View>

          {/* Callout 2: Bottom Left */}
          <View style={styles.callout2Wrapper}>
            <View style={styles.calloutBubble}>
              <Text style={styles.calloutText}>Your blush{"\n"}looks amazing</Text>
            </View>
            <Svg height="40" width="60" style={styles.calloutLine2}>
              <Line
                x1="60"
                y1="0"
                x2="10"
                y2="30"
                stroke="white"
                strokeWidth="1.5"
                strokeDasharray="3, 3"
              />
              <Circle cx="8" cy="32" r="4" fill="white" stroke="#8D5241" strokeWidth="1" />
              <Circle cx="8" cy="32" r="2" fill="#8D5241" />
            </Svg>
          </View>

          {/* Callout 3: Bottom Right */}
          <View style={styles.callout3Wrapper}>
            <View style={styles.calloutBubble}>
              <Text style={styles.calloutText}>Try lining your{"\n"}lips more</Text>
            </View>
            <Svg height="40" width="80" style={styles.calloutLine3}>
              <Line
                x1="40"
                y1="0"
                x2="0"
                y2="10"
                stroke="white"
                strokeWidth="1.5"
                strokeDasharray="3, 3"
              />
              <Circle cx="0" cy="10" r="4" fill="#E3BCB5" stroke="#8D5241" strokeWidth="1" />
            </Svg>
          </View>

          {/* Dotted Cheek Highlights */}
          <View style={styles.cheekHighlightLeft}>
             <Svg height="80" width="100">
               <Path
                 d="M 10 40 Q 30 10 60 20 Q 80 40 60 70 Q 30 80 10 40"
                 fill="rgba(255, 255, 255, 0.15)"
                 stroke="white"
                 strokeWidth="1.5"
                 strokeDasharray="4, 4"
               />
             </Svg>
          </View>
          <View style={styles.cheekHighlightRight}>
             <Svg height="80" width="100">
               <Path
                 d="M 90 40 Q 70 10 40 20 Q 20 40 40 70 Q 70 80 90 40"
                 fill="rgba(255, 255, 255, 0.15)"
                 stroke="white"
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
    backgroundColor: "rgba(251, 230, 211, 0.5)",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(251, 230, 211, 0.8)",
    overflow: "hidden",
  },
  detectedText: {
    color: "#8D5241",
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
    backgroundColor: "rgba(141, 82, 65, 0.4)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    maxWidth: 150,
  },
  calloutText: {
    color: "#FAF3E8",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    lineHeight: 15,
  },
  calloutLine1: {
    position: "absolute",
    left: -40,
    top: 40,
  },
  calloutLine2: {
    position: "absolute",
    right: -40,
    top: 40,
  },
  calloutLine3: {
    position: "absolute",
    left: -40,
    top: -20,
  },
  cheekHighlightLeft: {
    position: "absolute",
    top: "55%",
    left: "15%",
  },
  cheekHighlightRight: {
    position: "absolute",
    top: "55%",
    right: "15%",
  },
  scoresContainer: {
    backgroundColor: "#FAF3E8",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -40,
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 40,
  },
  scoresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  scoreItem: {
    width: (SCREEN_WIDTH - 44) / 2,
    backgroundColor: "#FBE6D3",
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#E3BCB5",
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
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: "#8D5241",
  },
  scoreValue: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "#8D5241",
    marginTop: 2,
  },
  infoButtonContainer: {
    padding: 2,
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
    color: "#FAF3E8",
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
  },
});
