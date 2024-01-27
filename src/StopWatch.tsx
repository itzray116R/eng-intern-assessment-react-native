import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Image, StyleSheet, Text} from 'react-native';
import StopWatchButton from "./components/StopWatchButton";
import TimeDisplay from "./components/timeDisplay";
import LapsRecord from "./components/LapRecord";
export default function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [started,setStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [lapTimes, setLapTimes] = useState<number[]>([]);

  useEffect(() => {
    let interval = 0;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const start: () => void = () => {
    setStarted(true);
    setTime(0);
    setIsRunning(true);
  }

  const stop = () => {
    setIsRunning(false);
    setStarted(false);
    setTime(-1);
    setLapTimes(lapTimes => []);
  };

  const reset = () => {
    setStarted(false);
    setIsRunning(false);
    setTime(0);
    setLapTimes(lapTimes => []);
  };

  const pause = () => {
    setIsRunning(false);
  }
  const resume = () => {
    setIsRunning(true);
  }

  const handleLaps = () => {
    setLapTimes(lapTimes => [...lapTimes, time])
  };

  //main Body for the app page of Stopwatch
  return (
    <SafeAreaView style={styles.container}>
      <Text
        onPress={start}
        onLongPress={stop}
        style={headingStyles.headingText}
      >Stopwatch
      </Text>
      <View style={styles.timerDisplay}>
        <TimeDisplay timeInSeconds={time}/>
      </View>
      <View style={styles.buttonContainer}>
        <StopWatchButton
          title={'Reset'}
          onClick={reset}
          color={'#001F3FFF'}
        />
        <StopWatchButton
          title={isRunning ? 'Stop' : 'Start'}
          onClick={isRunning ? stop : start}
          color={isRunning ? 'red' : '#001F3FFF'}  // Update the color value here
        />

        <StopWatchButton
          title={'Lap'}
          onClick={handleLaps}
          color={(started && isRunning) ? '#001F3FFF' : 'darkgrey'}
          isDisabled={!(started && isRunning)}
        />
        <StopWatchButton
          title={isRunning ? 'Pause' : 'Resume'}
          onClick={isRunning ? pause : resume}
          color={started ? '#001F3FFF' : 'darkgrey'}
          isDisabled={!started}
        />
      </View>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Lap Number</Text>
        <Text style={styles.headerText}>Time</Text>
      </View>
      <LapsRecord lapTimes={lapTimes}/>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start'
  },
  timerDisplay: {
    flex: 0.6,
    margin: 0
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: 'darkgrey',
    borderBottomWidth: 2,
    width: '90%',
    alignSelf: 'center'
  },
  headerText: {
    fontWeight: 'bold',
    color: "white",
    fontSize: 16,
  },
});
const headingStyles = StyleSheet.create({
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white', // Change the color to your desired text color
    marginBottom: 5,
  },
});