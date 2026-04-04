import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function FullAnalysisScreen() {
  const router = useRouter();
  const { imageUri } = useLocalSearchParams<{ imageUri: string }>();

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#8D5241" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Scan & score</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Detected Look Badge */}
          <View style={styles.detectedBadge}>
            <Text style={styles.detectedText}>Detected look is full glam</Text>
          </View>

          {/* Image with Analysis Overlays */}
          <View style={styles.imageContainer}>
            <Image
              source={
                imageUri
                  ? { uri: imageUri }
                  : require('@/assets/images/splash-icon.png')
              }
              style={styles.capturedImage}
              resizeMode="cover"
            />

            {/* Analysis Callouts */}
            <View style={[styles.callout, styles.calloutTopRight]}>
              <Text style={styles.calloutText}>
                This worked well,{'\n'}but isn't blended{'\n'}properly
              </Text>
            </View>

            <View style={[styles.callout, styles.calloutBottomLeft]}>
              <Text style={styles.calloutText}>
                Your blush{'\n'}looks amazing
              </Text>
            </View>

            <View style={[styles.callout, styles.calloutBottomRight]}>
              <Text style={styles.calloutText}>
                Try lining your{'\n'}lips more
              </Text>
            </View>
          </View>

          {/* Analysis Card */}
          <View style={styles.analysisCard}>
            {/* Title */}
            <View style={styles.analysisTitleRow}>
              <Text style={styles.analysisTitle}>Analysis</Text>
              <TouchableOpacity>
                <Ionicons name="information-circle-outline" size={24} color="#A67B5B" />
              </TouchableOpacity>
            </View>

            {/* Overall Score */}
            <View style={styles.overallScoreBadge}>
              <Text style={styles.overallScoreText}>Your Overall Score: 78/100</Text>
            </View>

            {/* Summary */}
            <View style={styles.summaryCard}>
              <Text style={styles.summaryText}>
                A confident full-glam look with strong color balance and smooth foundation blending.
              </Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryText}>
                Small refinements in symmetry, contour definition, and lip precision can elevate this look to professional level.
              </Text>
            </View>

            {/* What You Did Well Section */}
            <View style={styles.sectionBadge}>
              <Text style={styles.sectionBadgeText}>What You Did Well</Text>
            </View>

            <View style={styles.feedbackCard}>
              <Text style={styles.feedbackText}>
                <Text style={styles.feedbackBold}>Foundation:</Text> Even tone and natural skin finish.
              </Text>
              <Text style={styles.feedbackText}>
                <Text style={styles.feedbackBold}>Blending:</Text> Eyeshadow transitions are smooth with no harsh edges.
              </Text>
            </View>

            {/* Areas to Improve Section */}
            <View style={[styles.sectionBadge, styles.sectionBadgeWarning]}>
              <Text style={styles.sectionBadgeText}>Areas to Improve</Text>
            </View>

            <View style={styles.feedbackCard}>
              <Text style={styles.feedbackText}>
                <Text style={styles.feedbackBold}>Contour:</Text> Slightly uneven on right side. Try blending upward toward the ear.
              </Text>
              <Text style={styles.feedbackText}>
                <Text style={styles.feedbackBold}>Lips:</Text> Liner is visible outside natural lip line. Use a lip brush for precision.
              </Text>
              <Text style={styles.feedbackText}>
                <Text style={styles.feedbackBold}>Symmetry:</Text> Brow arch is higher on left side. Consider mapping before filling.
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
              onPress={() => router.push('/(tabs)')}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF2DA',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: '#8D5241',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  detectedBadge: {
    alignSelf: 'center',
    backgroundColor: '#FFF2DA',
    borderWidth: 1,
    borderColor: '#E8D4C4',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  detectedText: {
    color: '#8D5241',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  imageContainer: {
    marginHorizontal: 16,
    height: 280,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  capturedImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E8D4C4',
  },
  callout: {
    position: 'absolute',
    backgroundColor: '#FFF2DA',
    borderRadius: 12,
    padding: 8,
    maxWidth: 120,
  },
  calloutTopRight: {
    top: 60,
    right: 10,
  },
  calloutBottomLeft: {
    bottom: 60,
    left: 10,
  },
  calloutBottomRight: {
    bottom: 20,
    right: 10,
  },
  calloutText: {
    fontSize: 10,
    color: '#8D5241',
    fontFamily: 'Inter_400Regular',
  },
  analysisCard: {
    backgroundColor: '#FFF2DA',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    shadowColor: '#8D5241',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  analysisTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  analysisTitle: {
    fontSize: 24,
    fontFamily: 'Inter_600SemiBold',
    color: '#8D5241',
  },
  overallScoreBadge: {
    backgroundColor: '#8D5241',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  overallScoreText: {
    color: '#FFF2DA',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  summaryCard: {
    backgroundColor: '#F5E6D8',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  summaryText: {
    color: '#8D5241',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 22,
  },
  sectionBadge: {
    backgroundColor: '#8D5241',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
    marginBottom: 12,
  },
  sectionBadgeWarning: {
    backgroundColor: '#C9A178',
  },
  sectionBadgeTip: {
    backgroundColor: '#A67B5B',
  },
  sectionBadgeText: {
    color: '#FFF2DA',
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
  },
  feedbackCard: {
    backgroundColor: '#F5E6D8',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    gap: 8,
  },
  feedbackText: {
    color: '#8D5241',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 22,
  },
  feedbackBold: {
    fontFamily: 'Inter_600SemiBold',
  },
  doneButton: {
    backgroundColor: '#8D5241',
    borderRadius: 25,
    paddingVertical: 16,
    marginTop: 20,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#FFF2DA',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});
