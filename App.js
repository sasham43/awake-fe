// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit'
import getUserData from './data'

export default function App() {
  const [userData, setUserData] = useState([])
  const [current, setCurrent] = useState({})
  const [labels, setLabels] = useState([])

  useEffect(() => {
    let data = getUserData({
      limit: 50
    })
    // console.log('get user data', data.length)
    setUserData(data)
    // let filtered = data.filter((d, i) => i < 10)
    // setUserData(filtered)
    setCurrent(data[data.length-1])
  }, [])

  useEffect(() => {
    // userData.forEach(data => {
    //   let hour = data.displayTime.hour()
    //   if(!labels.includes(hour)) setLabels([...labels, hour])
    // })
    let format = 'HH:mm:ss'
    let dates = userData.filter((d,i) => i % 10 === 0).map((data) => {
      return data.displayTime.format(format)
    })
    setLabels(dates)
  }, [userData])

  function onClick(info){
    // console.log('click', info)
    let dataPoint = userData[info.index]
    setCurrent({...dataPoint, index: info.index})
  }

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#ffffff",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };


  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      {/* <StatusBar style="auto" /> */}
      <View style={styles.current_stats_container}>
        {/* <Text>Current Mood:</Text> */}
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
        <View style={styles.current_stat}>
          <Text>Time:</Text>
          <Text>{current.displayTime ?  current.displayTime.format() : null}</Text>
        </View>
      </View>
      {/* <ScrollView>
        <View style={styles.data_container}>
          {
            userData.map((data, index) => {
              return (
                <View key={`data-point-${index}`} style={styles.data_point}>
                  <Text>User Data:</Text>
                  {
                    Object.keys(data).map((key, i) => {
                      if(typeof data[key] === 'object' || key.includes('Id')) return null

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
      </ScrollView> */}

      <View>
        <Text>Anxiety Level</Text>
        <LineChart 
          data={{
            labels: labels,
            // labels: ['8:00', '9:00', '10:00'],
            datasets: [{
              data: userData.map(d => d.anxietyLevel)
            }]
          }}
          height={200}
          width={Dimensions.get("window").width}
          chartConfig={chartConfig}
          onDataPointClick={onClick}
          getDotColor={(data, index) => index === current.index ? '#343434' : '#000'}
        />        
      </View>
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
