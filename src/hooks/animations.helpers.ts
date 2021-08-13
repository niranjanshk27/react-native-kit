import { Animated, Easing } from 'react-native';

export const globalNativeDriver = false;

function animationFactory(animation: typeof Animated.spring, defaultOptions: {}) {
  return (driver: Animated.Value, toValue: number, options?: {}) => animation(driver, {
    ...defaultOptions,
    ...options,
    useNativeDriver: globalNativeDriver,
    toValue,
  });
}

export const spring = animationFactory(Animated.spring, { friction: 20, tension: 50 });
export const timing = animationFactory(Animated.timing, { duration: 600, easing: Easing.linear });


type AnimatedValueType = Animated.Value;

type DriverType = {
  [key: string]: AnimatedValueType,
};


export function createSpring(value: AnimatedValueType, toValue: number, options?: Object) {
  return Animated.spring(value, {
    toValue,
    tension: 10,
    friction: 4,
    useNativeDriver: globalNativeDriver,
    ...options,
  });
}

export function shake({ rotateZ, scale }: DriverType) {
  Animated.loop(Animated.sequence([
    Animated.timing(rotateZ, { toValue: 3, duration: 0, useNativeDriver: globalNativeDriver }),
    createSpring(rotateZ, 0, { tension: 150, friction: 1 }),
    Animated.delay(3000),
  ])).start();
}

export async function scaleAndFlip({ rotateY, scaleXY }: DriverType) {
  return new Promise(resolve => {
    Animated.sequence([
      createSpring(rotateY, 180),
      createSpring(scaleXY, 1.3),
      Animated.delay(1500),
    ]).start(res => resolve(res));
  });
}

export function flip({ rotateY }: DriverType) {
  Animated.sequence([
    Animated.delay(2000),
    createSpring(rotateY, 180),
  ]).start();
}

export function enlarge({ scaleXY }: DriverType) {
  createSpring(scaleXY, 1.4).start();
};

export function horizontalShake(translateX: Animated.Value) {
  translateX.setValue(-1);
  Animated.sequence([
    createSpring(translateX, 0, { tension: 150, friction: 1 }),
  ]).start();
};

export function rotate({ rotate, scale }: DriverType) {
  Animated.loop(Animated.sequence([
    timing(rotate, 0, { duration: 100 }),
    spring(rotate, 1, { friction: 1, tension: 80 }),
    Animated.delay(3000),
  ])).start();
}


export function ripple({ scale }: DriverType) {
  Animated.loop(
    Animated.sequence([
      spring(scale, 1.2, { friction: 0.8, tension: 10 }),
      // Animated.delay(200),
      spring(scale, 0.6),
      Animated.delay(200),
    ])
  ).start();
}

export function timedLinearEasing(value: Animated.Value, toValue: number, duration: number = 100) {
  return Animated.timing(value, {
    toValue,
    duration,
    useNativeDriver: true,
    easing: Easing.linear,
  });
};
