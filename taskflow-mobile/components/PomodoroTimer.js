import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

const FOCUS_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60;  // 5 minutes in seconds

export default function PomodoroTimer() {
  const [timeRemaining, setTimeRemaining] = useState(FOCUS_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    } else if (isActive && timeRemaining === 0) {
        Alert.alert(isBreak ? "Break's Over!" : "Time for a break!");
        setIsActive(false);
        setIsBreak(!isBreak);
        setTimeRemaining(isBreak ? FOCUS_TIME : BREAK_TIME);
    }
    return () => clearInterval(interval);
  }, [isActive, timeRemaining]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
      <Text style={styles.modeText}>{isBreak ? "Break Time" : "Focus Time"}</Text>
      <View style={styles.buttonContainer}>
        <Button title={isActive ? 'Pause' : 'Start'} onPress={() => setIsActive(!isActive)} />
        <Button title="Reset" onPress={() => {
            setIsActive(false);
            setTimeRemaining(FOCUS_TIME);
            setIsBreak(false);
        }} color="red"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { alignItems: 'center', marginBottom: 20, padding: 15, backgroundColor: '#fff', borderRadius: 10 },
    timerText: { fontSize: 48, fontWeight: 'bold' },
    modeText: { fontSize: 18, marginBottom: 10, color: '#555' },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '60%' },
});
