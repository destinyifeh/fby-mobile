import { Avatar } from "@/components/ui/Avatar";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PersonalInfoScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [nationality, setNationality] = useState("");

  const handleUpdate = () => {
    // Implement update logic here
    console.log("Updating profile:", { username, email, dob, nationality });
    router.back();
  };

  return (
    <View className="flex-1 bg-cream-light">
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center"
          >
            <Ionicons name="arrow-back" size={24} color="#8D5241" />
          </TouchableOpacity>
          <Text className="font-abhaya-bold text-3xl text-primary-brown">
            Personal Info
          </Text>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Avatar Section */}
          <View className="items-center mt-6 mb-8">
            <Avatar
              size="xxl"
              // source={require("@/assets/images/profile.png")}
              showEdit={!true}
              onEdit={() => console.log("Edit avatar")}
            />
            <TouchableOpacity className="mt-4">
              <Text className="font-abhaya-bold text-2xl text-primary-brown">
                Edit
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View className="gap-y-6">
            <View>
              <Text className="font-inter-medium text-lg text-primary-brown mb-2 ml-1">
                Username
              </Text>
              <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Enter username"
                placeholderTextColor="#A67B5B"
                className="bg-[#A67B5B1A] h-16 rounded-[20px] px-6 font-inter-medium text-primary-brown-light text-lg border border-primary-brown/5"
              />
            </View>

            <View>
              <Text className="font-inter-medium text-lg text-primary-brown mb-2 ml-1">
                Email
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email"
                placeholderTextColor="#A67B5B"
                keyboardType="email-address"
                autoCapitalize="none"
                className="bg-[#A67B5B1A] h-16 rounded-[20px] px-6 font-inter-medium text-primary-brown-light text-lg border border-primary-brown/5"
              />
            </View>

            <View>
              <Text className="font-inter-medium text-lg text-primary-brown mb-2 ml-1">
                Date of birth
              </Text>
              <TextInput
                value={dob}
                onChangeText={setDob}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#A67B5B"
                className="bg-[#A67B5B1A] h-16 rounded-[20px] px-6 font-inter-medium text-primary-brown-light text-lg border border-primary-brown/5"
              />
            </View>

            <View>
              <Text className="font-inter-medium text-lg text-primary-brown mb-2 ml-1">
                Nationality
              </Text>
              <TextInput
                value={nationality}
                onChangeText={setNationality}
                placeholder="Enter nationality"
                placeholderTextColor="#A67B5B"
                className="bg-[#A67B5B1A] h-16 rounded-[20px] px-6 font-inter-medium text-primary-brown-light text-lg border border-primary-brown/5"
              />
            </View>
          </View>

          {/* Update Button */}
          <TouchableOpacity
            onPress={handleUpdate}
            className="bg-primary-brown h-16 rounded-[40px] items-center justify-center mt-12 mb-8 shadow-lg active:opacity-90"
          >
            <Text className="text-cream text-2xl font-abhaya-bold">
              Update Profile
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
