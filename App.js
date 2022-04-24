// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit'
// import {Picker} from '@react-native-picker/picker'
import { TypePicker } from './components/Picker'
import { getUserData, getDates } from './data'

export default function App() {
  const [userData, setUserData] = useState([])
  const [current, setCurrent] = useState({})
  const [labels, setLabels] = useState([])
  const [currentStat, setCurrentStat] = useState({
    title: 'Anxiety Level',
    value: 'anxietyLevel'
  })

  useEffect(() => {
    let data = getUserData({
      limit: 5000,
      day: 2,
      hour: 9
    })
    setUserData(data)
    // setCurrent(data[data.length-1])

    let dateInfo = getDates()
    setDates(dateInfo)
  }, [])

  useEffect(() => {
    let format = 'HH:mm:ss'
    let dates = userData.filter((d,i) => i % 10 === 0).map((data) => {
      return data.displayTime.format(format)
    })
    setLabels(dates)
  }, [userData])

  function onClick(info){
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

  const [dataPickerOpen, setDataPickerOpen] = useState(false)
  const [dayPickerOpen, setDayPickerOpen] = useState(false)
  const [dates, setDates] = useState([])
  const [hours, setHours] = useState([])
  const [currentDay, setCurrentDay] = useState()
  const [currentHour, setCurrentHour] = useState()

  useEffect(()=> {
    // selectHour(hours[0])
  }, [currentDay])

  function openPicker(type){
    // setPickerOpen(!pickerOpen)
    if(type === 'data'){
      setDataPickerOpen(!dataPickerOpen)
    } else if (type === 'day'){
      setDayPickerOpen(!dayPickerOpen)
    }
  }
  function selectChoice(choice){
    setCurrentStat(choice)
  }
  function selectDay(choice){
    // console.log('select day', choice)
    // let data = getUserData({
    //   day: choice.value.day(),
    //   limit: 5000
    // })
    // setUserData(data)
    if(choice.hours.length){
      setHours(choice.hours)
    }
    setCurrentDay(choice.value.day())
  }

  function selectHour(hour){
    let data = getUserData({
      day: currentDay,
      hour: hour.value,
      limit: 5000
    })
    console.log('current', currentDay, hour.value)
    setUserData(data)
  }


  return (
    <View style={styles.container}>
      
      <View style={styles.select_container}>
        <View>
          <Pressable style={styles.select_button} onPress={() => openPicker('data')}>
            <Text>Data Type</Text>
          </Pressable>
        </View>

        <View>
          <Pressable style={styles.select_button} onPress={() => openPicker('day')}>
            <Text>Date</Text>
          </Pressable>
        </View>
      </View>

        {
          dataPickerOpen ?
          <TypePicker
            choices={[
              {
                title: 'Anxiety Level',
                value: 'anxietyLevel'
              },
              {
                title: 'BPM',
                value: 'currentBpm'
              },
            ]}
            selectChoice={selectChoice}
            selectHour={selectHour}
          />
          : null
        }


        {
          dayPickerOpen ?
          <TypePicker
            selected={currentStat}
            choices={dates}
            selectChoice={selectDay}
            hours={hours}
            selectHour={selectHour}
          />
          : null
        }
      <View>

      </View>

      <View style={styles.chart_container}>
        <Text>{currentStat.title}</Text>
        {/* <Text>Anxiety Level</Text> */}
        <ScrollView horizontal style={styles.scroll}>
          <LineChart 
            data={{
              labels: labels,
              // labels: ['8:00', '9:00', '10:00'],
              datasets: [{
                data: userData.map(d => d[currentStat.value])
                // data: userData.map(d => d.anxietyLevel)
              }]
            }}
            height={300}
            width={Dimensions.get("window").width * 4}
            chartConfig={chartConfig}
            onDataPointClick={onClick}
            getDotColor={(data, index) => index === current.index ? '#343434' : '#000'}
          />        
        </ScrollView>
      </View>



      { current.anxietyLevel !== undefined ?
        <View style={styles.current_stats_container}>
          <View style={styles.current_stat}>
            <Text>Anxiety Level: </Text>
            <Text>{current.anxietyLevel}</Text>
          </View>
          <View style={styles.current_stat}>
            <Text>Anxiety State: </Text>
            <Text>{current.anxietyState}</Text>
          </View>
          <View style={styles.current_stat}>
            <Text>BPM: </Text>
            <Text>{current.currentBpm}</Text>
          </View>
          <View style={styles.current_stat}>
            <Text>Time: </Text>
            <Text>{current.displayTime ?  current.displayTime.format() : null}</Text>
          </View>
        </View>
        : null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  },
  // picker: {
  //   width: 300
  // },
  select_container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: Dimensions.get('screen').width,
  },  
  select_button: {
    width: 100,
    height: 50,
    borderWidth: 2,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  scroll: {
    // flexDirection: 'row',
    // width: Dimensions.get('screen').width * 3,
  },
  chart_container: {
    // flex: 2,
    height: 300
  }
});
