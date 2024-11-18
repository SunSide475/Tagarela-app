import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';

export const Loading = () => {
    const animations = useRef([
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
    ]).current;

    useEffect(() => {
        const animate = () => {
            const animationList = animations.map((animation, index) => 
                Animated.sequence([
                    Animated.delay(index * 300),
                    Animated.timing(animation, {
                        toValue: -10,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(animation, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ])
            );

            Animated.loop(
                Animated.parallel(animationList)
            ).start();
        };

        animate();
    }, [animations]);

    return (
        <View style={styles.loadingContainer}>
            <View style={styles.loading}>
                {animations.map((animation, index) => (
                    <Animated.View 
                        key={index} 
                        style={[styles.dots, { transform: [{ translateY: animation }] }]} 
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: "center"
    },
    loading: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dots: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#7E57C2",
        marginHorizontal: 5,
    }
});