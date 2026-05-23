import { fbyIcons } from "@/types";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface AvatarProps {
  source?: any;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl" | "xxl";
  showOnline?: boolean;
  showEdit?: boolean;
  onEdit?: () => void;
}

export function Avatar({
  source,
  name,
  size = "md",
  showOnline = false,
  showEdit = false,
  onEdit,
}: AvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-[50px] h-[50px]",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
    xxl: "w-32 h-32",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
    xl: "text-3xl",
    xxl: "text-4xl",
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <View className="relative">
      <View
        className={`
          ${sizeClasses[size]}
          rounded-full
          bg-v2-purple
          items-center
          justify-center
          overflow-hidden
          border-2
          border-v2-purple/20
        `}
      >
        {source ? (
          <Image
            source={typeof source === "string" ? { uri: source } : source}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <Text
            className={`
              text-v2-bg-base
              font-abhaya-bold
              ${textSizeClasses[size]}
            `}
          >
            {name ? getInitials(name) : "U"}
          </Text>
        )}
      </View>
      {showOnline && (
        <View
          className={`
            absolute
            bottom-0
            right-0
            w-4 h-4
            bg-green-500
            rounded-full
            border-2
            border-v2-bg-base
          `}
        />
      )}
      {showEdit && (
        <TouchableOpacity
          onPress={onEdit}
          className="absolute bottom-0 right-0 w-10 h-10 bg-v2-text-dark rounded-full border-2 border-v2-text-dark items-center justify-center shadow-sm p-5"
        >
          {/* <Ionicons name="pencil-outline" size={20} color="#FFF2DA" /> */}
          <Image
            source={fbyIcons.pencil}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
