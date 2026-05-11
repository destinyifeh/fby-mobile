import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
} from 'react-native';

interface Message {
  id: number;
  text: string;
  isOutgoing: boolean;
  status?: string;
}

const conversation: Message[] = [
  {
    id: 1,
    text: "Hey girl you missed your birthday appointment. Did you want to reschedule?",
    isOutgoing: false,
  },
  {
    id: 2,
    text: "Hey no I'm ok thanks for asking",
    isOutgoing: true,
  },
  {
    id: 3,
    text: "Really? I always do your make up did you find a new MUA?",
    isOutgoing: false,
  },
  {
    id: 4,
    text: "Actually I did, I'm sorry girl 😔",
    isOutgoing: true,
  },
  {
    id: 5,
    text: "You're fine… who is it if you don't mind me asking?",
    isOutgoing: false,
  },
  {
    id: 6,
    text: "Me.",
    isOutgoing: true,
    status: "Delivered",
  },
];

const KEYBOARD_ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

interface TypingDotsProps {
  visible: boolean;
}

function TypingDots({ visible }: TypingDotsProps) {
  const dot1 = useRef(new Animated.Value(0.4)).current;
  const dot2 = useRef(new Animated.Value(0.4)).current;
  const dot3 = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    if (!visible) return;

    const animate = (dot: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0.4,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const anim1 = animate(dot1, 0);
    const anim2 = animate(dot2, 200);
    const anim3 = animate(dot3, 400);

    anim1.start();
    anim2.start();
    anim3.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={{ alignSelf: 'flex-start', marginBottom: 8 }}>
      <View
        style={{
          backgroundColor: '#e9e9eb',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          flexDirection: 'row',
          gap: 4,
        }}
      >
        {[dot1, dot2, dot3].map((dot, i) => (
          <Animated.View
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: 'rgba(0,0,0,0.4)',
              opacity: dot,
            }}
          />
        ))}
      </View>
    </View>
  );
}

interface MessageBubbleProps {
  message: Message;
}

function MessageBubble({ message }: MessageBubbleProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        alignSelf: message.isOutgoing ? 'flex-end' : 'flex-start',
        marginBottom: 8,
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
      }}
    >
      <View
        style={{
          maxWidth: '75%',
          paddingHorizontal: 16,
          paddingVertical: 8,
          backgroundColor: message.isOutgoing ? '#007aff' : '#e9e9eb',
          borderTopLeftRadius: message.isOutgoing ? 20 : 0,
          borderTopRightRadius: message.isOutgoing ? 0 : 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            lineHeight: 20,
            color: message.isOutgoing ? '#FFFFFF' : '#000000',
            fontFamily: 'Inter_400Regular',
          }}
        >
          {message.text}
        </Text>
      </View>
      {message.status && (
        <Text
          style={{
            fontSize: 10,
            color: 'rgba(0,0,0,0.4)',
            marginTop: 4,
            alignSelf: 'flex-end',
            fontFamily: 'Inter_500Medium',
          }}
        >
          {message.status}
        </Text>
      )}
    </Animated.View>
  );
}

interface KeyProps {
  letter: string;
  isActive: boolean;
  flex?: number;
  isSpecial?: boolean;
}

function Key({ letter, isActive, flex = 1, isSpecial = false }: KeyProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isActive) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isActive]);

  return (
    <Animated.View
      style={{
        flex,
        height: 42,
        backgroundColor: isActive ? '#E5E5E5' : isSpecial ? 'rgba(255,255,255,0.6)' : '#FFFFFF',
        borderRadius: 5,
        marginHorizontal: 2,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ scale: scaleAnim }],
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 1,
        elevation: 1,
      }}
    >
      <Text
        style={{
          fontSize: isSpecial ? 14 : 20,
          color: '#000',
          fontFamily: 'Inter_500Medium',
        }}
      >
        {letter}
      </Text>
    </Animated.View>
  );
}

interface ChatAnimationProps {
  compact?: boolean;
}

export function ChatAnimation({ compact = false }: ChatAnimationProps) {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMUATyping, setIsMUATyping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const cursorAnim = useRef(new Animated.Value(1)).current;

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Cursor blink animation
  useEffect(() => {
    if (isTyping) {
      const blink = Animated.loop(
        Animated.sequence([
          Animated.timing(cursorAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(cursorAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      );
      blink.start();
      return () => blink.stop();
    }
  }, [isTyping]);

  // Main conversation logic
  useEffect(() => {
    if (currentIndex >= conversation.length) {
      const timer = setTimeout(() => {
        setVisibleMessages([]);
        setCurrentIndex(0);
        setTypingText('');
      }, 7000);
      return () => clearTimeout(timer);
    }

    const currentMsg = conversation[currentIndex];

    if (currentMsg.isOutgoing) {
      const startTypingDelay = setTimeout(() => {
        setIsTyping(true);
        let charIndex = 0;
        const typeInterval = setInterval(() => {
          if (charIndex < currentMsg.text.length) {
            const char = currentMsg.text[charIndex].toLowerCase();
            if (char === ' ') {
              setActiveKey('space');
            } else if (/[a-z]/.test(char)) {
              setActiveKey(char);
            } else {
              setActiveKey('123');
            }
            setTypingText(currentMsg.text.slice(0, charIndex + 1));
            charIndex++;
            setTimeout(() => setActiveKey(null), 100);
          } else {
            clearInterval(typeInterval);
            setActiveKey('return');
            setTimeout(() => {
              setActiveKey(null);
              setVisibleMessages((prev) => [...prev, currentMsg]);
              setTypingText('');
              setIsTyping(false);
              setCurrentIndex((prev) => prev + 1);
            }, 500);
          }
        }, 130);
        return () => clearInterval(typeInterval);
      }, 2000);
      return () => clearTimeout(startTypingDelay);
    } else {
      setIsMUATyping(true);
      const timer = setTimeout(() => {
        setIsMUATyping(false);
        setTimeout(() => {
          setVisibleMessages((prev) => [...prev, currentMsg]);
          setCurrentIndex((prev) => prev + 1);
        }, 50);
      }, currentIndex === 0 ? 2500 : 5000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [visibleMessages, isMUATyping]);

  const phoneWidth = compact ? 320 : 310;
  const phoneHeight = compact ? 300 : 580;
  const borderRadius = compact ? 30 : 40;

  return (
    <View
      style={{
        width: phoneWidth,
        height: phoneHeight,
        backgroundColor: '#000',
        borderRadius: borderRadius,
        borderWidth: compact ? 6 : 8,
        borderColor: '#1a1a1a',
        overflow: 'hidden',
      }}
    >
      {/* Dynamic Island */}
      <View
        style={{
          position: 'absolute',
          top: compact ? 4 : 8,
          left: '50%',
          marginLeft: compact ? -50 : -60,
          width: compact ? 100 : 120,
          height: compact ? 26 : 35,
          backgroundColor: '#000',
          borderRadius: compact ? 13 : 20,
          zIndex: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: compact ? 36 : 48,
            height: compact ? 3 : 4,
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: 2,
          }}
        />
      </View>

      {/* Status Bar */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: compact ? 32 : 44,
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          paddingHorizontal: compact ? 24 : 32,
          paddingBottom: compact ? 4 : 6,
          zIndex: 40,
          backgroundColor: '#FFFFFF',
        }}
      >
        <Text style={{ fontSize: compact ? 12 : 14, fontWeight: '600', color: '#000' }}>{currentTime}</Text>
        {/* Battery Icon */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: compact ? 18 : 22,
              height: compact ? 9 : 11,
              borderRadius: 2,
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.4)',
              position: 'relative',
            }}
          >
            {/* Battery nub */}
            <View
              style={{
                position: 'absolute',
                right: -3,
                top: compact ? 2 : 3,
                width: 2,
                height: compact ? 4 : 5,
                backgroundColor: 'rgba(0,0,0,0.4)',
                borderRadius: 1,
              }}
            />
            {/* Battery fill */}
            <View
              style={{
                position: 'absolute',
                left: 1,
                top: 1,
                bottom: 1,
                width: '80%',
                backgroundColor: '#000',
                borderRadius: 1,
              }}
            />
          </View>
        </View>
      </View>

      {/* Chat Header */}
      <View
        style={{
          position: 'absolute',
          top: compact ? 32 : 44,
          left: 0,
          right: 0,
          height: compact ? 44 : 60,
          backgroundColor: '#FFFFFF',
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(0,0,0,0.05)',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: compact ? 6 : 8,
          zIndex: 30,
        }}
      >
        <View
          style={{
            width: compact ? 26 : 32,
            height: compact ? 26 : 32,
            borderRadius: compact ? 13 : 16,
            backgroundColor: '#8D5241',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: compact ? 10 : 12, fontWeight: 'bold' }}>M</Text>
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: compact ? 14 : 16, color: '#000' }}>MUA</Text>
      </View>

      {/* Messages Container - fills entire screen like web version */}
      <ScrollView
        ref={scrollViewRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: compact ? 20 : 180,
          backgroundColor: '#FFFFFF',
        }}
        contentContainerStyle={{
          paddingTop: compact ? 76 : 112,
          paddingHorizontal: compact ? 8 : 16,
          paddingBottom: compact ? 8 : 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        {visibleMessages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <TypingDots visible={isMUATyping} />
      </ScrollView>

      {/* Input Area - hidden in compact mode */}
      {!compact && <View
        style={{
          position: 'absolute',
          bottom: 145,
          left: 12,
          right: 12,
          zIndex: 20,
        }}
      >
        <View
          style={{
            height: 32,
            backgroundColor: '#FFF',
            borderRadius: 16,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.1)',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
          }}
        >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 14,
                color: !typingText && !isTyping ? 'rgba(0,0,0,0.3)' : '#000',
                fontFamily: 'Inter_400Regular',
              }}
              numberOfLines={1}
            >
              {typingText || (isTyping ? '' : 'iMessage')}
            </Text>
            {isTyping && (
              <Animated.View
                style={{
                  width: 2,
                  height: 16,
                  backgroundColor: '#007aff',
                  marginLeft: 1,
                  opacity: cursorAnim,
                }}
              />
            )}
          </View>
          <View
            style={{
              width: 22,
              height: 22,
              borderRadius: 11,
              backgroundColor: '#007aff',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 8,
            }}
          >
            <Text style={{ color: '#FFF', fontSize: 12 }}>↑</Text>
          </View>
        </View>
      </View>}

      {/* Keyboard - hidden in compact mode */}
      {!compact && <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 145,
          backgroundColor: '#D1D5DB',
          paddingTop: 6,
          paddingHorizontal: 3,
          paddingBottom: 20,
        }}
      >
        {/* Row 1 */}
        <View style={{ flexDirection: 'row', marginBottom: 6 }}>
          {KEYBOARD_ROWS[0].map((k) => (
            <Key key={k} letter={k} isActive={activeKey === k} />
          ))}
        </View>

        {/* Row 2 */}
        <View style={{ flexDirection: 'row', marginBottom: 6, paddingHorizontal: 12 }}>
          {KEYBOARD_ROWS[1].map((k) => (
            <Key key={k} letter={k} isActive={activeKey === k} />
          ))}
        </View>

        {/* Row 3 */}
        <View style={{ flexDirection: 'row', marginBottom: 6 }}>
          <Key letter="⇧" isActive={false} flex={1.5} isSpecial />
          {KEYBOARD_ROWS[2].map((k) => (
            <Key key={k} letter={k} isActive={activeKey === k} />
          ))}
          <Key letter="⌫" isActive={false} flex={1.5} isSpecial />
        </View>

        {/* Row 4 */}
        <View style={{ flexDirection: 'row' }}>
          <Key letter="123" isActive={activeKey === '123'} flex={2} isSpecial />
          <Key letter="" isActive={activeKey === 'space'} flex={5} />
          <Key letter="return" isActive={activeKey === 'return'} flex={2} isSpecial />
        </View>

        </View>}

      {/* Home Indicator - at bottom of phone */}
      <View
        style={{
          position: 'absolute',
          bottom: 8,
          left: 0,
          right: 0,
          alignItems: 'center',
          zIndex: 60,
        }}
      >
        <View
          style={{
            width: 100,
            height: 4,
            backgroundColor: '#000',
            borderRadius: 2,
          }}
        />
      </View>
    </View>
  );
}
