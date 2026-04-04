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
          backgroundColor: '#FFEDCC',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
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
              backgroundColor: '#8D5241',
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
          paddingHorizontal: 14,
          paddingVertical: 10,
          backgroundColor: message.isOutgoing ? '#8D5241' : '#FFEDCC',
          borderTopLeftRadius: message.isOutgoing ? 20 : 4,
          borderTopRightRadius: message.isOutgoing ? 4 : 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            lineHeight: 20,
            color: message.isOutgoing ? '#FFF2DA' : '#8D5241',
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
  const scrollViewRef = useRef<ScrollView>(null);
  const cursorAnim = useRef(new Animated.Value(1)).current;

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
          top: compact ? 6 : 8,
          left: '50%',
          marginLeft: compact ? -40 : -50,
          width: compact ? 80 : 100,
          height: compact ? 22 : 28,
          backgroundColor: '#000',
          borderRadius: compact ? 11 : 14,
          zIndex: 50,
        }}
      />

      {/* Chat Header */}
      <View
        style={{
          position: 'absolute',
          top: compact ? 30 : 40,
          left: 0,
          right: 0,
          height: compact ? 40 : 50,
          backgroundColor: '#FFF2DA',
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(0,0,0,0.1)',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: compact ? 6 : 8,
          zIndex: 30,
        }}
      >
        <View
          style={{
            width: compact ? 22 : 28,
            height: compact ? 22 : 28,
            borderRadius: compact ? 11 : 14,
            backgroundColor: '#8D5241',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#FFF2DA', fontSize: compact ? 10 : 12, fontWeight: 'bold' }}>M</Text>
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: compact ? 12 : 14, color: '#000' }}>MUA</Text>
      </View>

      {/* Messages Container */}
      <ScrollView
        ref={scrollViewRef}
        style={{
          position: 'absolute',
          top: compact ? 70 : 90,
          left: 0,
          right: 0,
          bottom: compact ? 20 : 180,
          backgroundColor: '#FFF2DA',
        }}
        contentContainerStyle={{ padding: compact ? 8 : 12 }}
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
                  backgroundColor: '#8D5241',
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
              backgroundColor: '#8D5241',
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

        {/* Home Indicator */}
        <View
          style={{
            position: 'absolute',
            bottom: 6,
            left: '50%',
            marginLeft: -40,
            width: 80,
            height: 4,
            backgroundColor: '#000',
            borderRadius: 2,
          }}
        />
      </View>}
    </View>
  );
}
