import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type TabName = 'home' | 'scan' | 'bookings' | 'profile';

interface BottomNavProps {
  activeTab: TabName;
  onTabPress: (tab: TabName) => void;
}

interface NavItemProps {
  name: TabName;
  icon: keyof typeof Ionicons.glyphMap;
  isActive: boolean;
  onPress: () => void;
}

function NavItem({ name, icon, isActive, onPress }: NavItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`
        w-[50px]
        h-[50px]
        rounded-full
        items-center
        justify-center
        ${isActive ? 'bg-v2-purple' : 'bg-transparent'}
      `}
    >
      <Ionicons
        name={icon}
        size={24}
        color={isActive ? '#f4f0e8' : '#737080'}
      />
    </TouchableOpacity>
  );
}

export function BottomNav({ activeTab, onTabPress }: BottomNavProps) {
  const tabs: { name: TabName; icon: keyof typeof Ionicons.glyphMap }[] = [
    { name: 'home', icon: 'home-outline' },
    { name: 'scan', icon: 'scan-outline' },
    { name: 'bookings', icon: 'calendar-outline' },
    { name: 'profile', icon: 'person-outline' },
  ];

  return (
    <View
      className="
        absolute
        bottom-0
        left-0
        right-0
        h-[77px]
        bg-v2-bg-base
        rounded-t-[52px]
        flex-row
        items-center
        justify-around
        px-8
        pb-2
      "
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -6 },
        shadowOpacity: 0.06,
        shadowRadius: 18,
        elevation: 8,
      }}
    >
      {tabs.map((tab) => (
        <NavItem
          key={tab.name}
          name={tab.name}
          icon={tab.icon}
          isActive={activeTab === tab.name}
          onPress={() => onTabPress(tab.name)}
        />
      ))}
    </View>
  );
}
