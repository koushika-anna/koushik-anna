import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, SafeAreaView } from 'react-native';
import TaskItem from './components/TaskItem';
import PomodoroTimer from './components/PomodoroTimer';

const API_URL = 'http://127.0.0.1:5001'; // Use your computer's IP for a real device

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch(`${API_URL}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(error => console.error("Error fetching tasks:", error));
  };

  const handleAddTask = () => {
    if (inputText.trim() === '') return;

    fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: inputText, priority: 'High' }),
    })
      .then(res => res.json())
      .then(newTask => {
        setTasks([...tasks, newTask]);
        setInputText('');
      })
      .catch(error => console.error("Error adding task:", error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <PomodoroTimer />
      <Text style={styles.header}>TaskFlow</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={inputText}
          onChangeText={setInputText}
        />
        <Button title="Add" onPress={handleAddTask} />
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => <TaskItem task={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f0f0', padding: 20 },
    header: { fontSize: 32, fontWeight: 'bold', marginBottom: 20, textAlign: 'center'},
    inputContainer: { flexDirection: 'row', marginBottom: 20 },
    input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 10, marginRight: 10, borderRadius: 5 },
});
