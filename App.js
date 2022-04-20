import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import getUserData from './data'

export default function App() {
  const [userData, setUserData] = useState([])

  useEffect(() => {
    let data = getUserData()
    let filtered = data.filter((d, i) => i < 10)
    setUserData(filtered)
  }, [])


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {/* <StatusBar style="auto" /> */}
      <ScrollView style={styles.data_container}>
        {
          userData.map(data => {
            return (
              <View>
                <Text>User Data:</Text>
                {
                  Object.keys(data).map(key => {
                    if(typeof data[key] === 'object') return null
                    console.log('why',key, data[key])

                    return (
                      <View>
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
  },
  data_container: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1
  }
});
