import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import getUserData from './data'

export default function App() {
  const [userData, setUserData] = useState([])
  const [current, setCurrent] = useState({})

  useEffect(() => {
    let data = getUserData({
      limit: 500
    })
    // console.log('get user data', data.length)
    setUserData(data)
    // let filtered = data.filter((d, i) => i < 10)
    // setUserData(filtered)
    setCurrent(data[data.length-1])
  }, [])


  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      {/* <StatusBar style="auto" /> */}
      <View style={styles.current_stats_container}>
        <Text>Current Mood:</Text>
        <View style={styles.current_stat}>
          <Text>Anxiety Level:</Text>
          <Text>{current.anxietyLevel}</Text>
        </View>
        <View style={styles.current_stat}>
          <Text>Anxiety State:</Text>
          <Text>{current.anxietyState}</Text>
        </View>
        <View style={styles.current_stat}>
          <Text>BPM:</Text>
          <Text>{current.currentBpm}</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.data_container}>
          {
            userData.map((data, index) => {
              return (
                <View key={`data-point-${index}`} style={styles.data_point}>
                  <Text>User Data:</Text>
                  {
                    Object.keys(data).map((key, i) => {
                      if(typeof data[key] === 'object' || key.includes('Id')) return null
                      // console.log('why',key, data[key])

                      return (
                        <View key={`key-${index}-${key}`}>
                          <Text>{key}:</Text>
                          <View>
                            <Text>{data[key]}</Text>
                          </View>
                        </View>
                      )
                    })
                  }
                </View>
              )
            })
          }
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  data_container: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1
  },
  data_point: {
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 2,
    paddingBottom: 2,
  },
  current_stat: {
    flexDirection: 'row',
  }
});
