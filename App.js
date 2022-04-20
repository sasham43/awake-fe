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
      <ScrollView>

        <View style={styles.data_container}>
          {
            userData.map(data => {
              return (
                <View style={styles.data_point}>
                  <Text>User Data:</Text>
                  {
                    Object.keys(data).map(key => {
                      if(typeof data[key] === 'object' || key.includes('Id')) return null
                      // console.log('why',key, data[key])

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
  }
});
