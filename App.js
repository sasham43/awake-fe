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
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    let data = getUserData({
      limit: 5000,
      day: 2,
      hour: 9
    })
    setUserData(data)

    let dateInfo = getDates()
    setDates(dateInfo)
  }, [])

  useEffect(() => {
    let format = 'HH:mm:ss'
    let dates = userData.filter((d,i) => i % 10 === 0).map((data) => {
      return data.displayTime.format(format)
    })
    setLabels(dates)

    let chart_data = userData.map(d => d[currentStat.value])
    
    setChartData(chart_data)
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
  const [currentDay, setCurrentDay] = useState({})

  function openPicker(type){
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
    if(choice.hours.length){
      setHours(choice.hours)
    }
    setCurrentDay(choice)
  }

  function selectHour(hour){
    let data = getUserData({
      day: currentDay.value.day(),
      hour: hour.value,
      limit: 5000
    })
    
    setUserData(data)
  }


  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Text style={styles.header}>Patient Information</Text>
      </View>
      
      <View style={styles.select_container}>
        <View>
          <Pressable style={styles.select_button} onPress={() => openPicker('data')}>
            <Text style={dataPickerOpen ? styles.bold : null}>Data Type</Text>
          </Pressable>
        </View>

        <View>
          <Pressable style={styles.select_button} onPress={() => openPicker('day')}>
            <Text style={dayPickerOpen ? styles.bold : null}>Date</Text>
          </Pressable>
        </View>
      </View>


      <View>
        {
          dataPickerOpen ?
          <TypePicker
            selected={currentStat}
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
          <>
            <TypePicker
              selected={currentDay}
              choices={dates}
              selectChoice={selectDay}
              hours={hours}
              selectHour={selectHour}
            />
            <TypePicker
              selected={currentDay}
              choices={hours.map(hour => {
                return {
                  title: hour,
                  value: hour
                }
              })}
              hourPicker={true}
              selectChoice={selectHour}
              container_style={styles.hours_container}
              button_style={styles.hours_button}
            />
          </>
          : null
        }
      </View>

      <View style={styles.chart_container}>
        <View style={styles.title_container}>
          <Text>{currentStat.title}</Text>
        </View>
        {/* <Text>Anxiety Level</Text> */}
        <ScrollView horizontal style={styles.scroll}>
          <LineChart 
            data={{
              labels: labels,
              // labels: ['8:00', '9:00', '10:00'],
              datasets: [{
                data: chartData
                // data: userData.map(d => d[currentStat.value])
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
            <Text style={styles.label}>Anxiety Level: </Text>
            <Text>{current.anxietyLevel}</Text>
          </View>
          <View style={styles.current_stat}>
            <Text style={styles.label}>Anxiety State: </Text>
            <Text>{current.anxietyState}</Text>
          </View>
          <View style={styles.current_stat}>
            <Text style={styles.label}>BPM: </Text>
            <Text>{current.currentBpm}</Text>
          </View>
          <View style={styles.current_stat}>
            <Text style={styles.label}>Time: </Text>
            <Text>{current.displayTime ?  current.displayTime.format('hh:mm:ss ddd MM-DD-YYYY') : null}</Text>
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
  header: {
    fontSize: 22
  },
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
  chart_container: {
    // flex: 2,
    height: 300
  },
  current_stats_container: {
    marginTop: 20,
  },
  current_stat: {
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  title_container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
  },
  label: {
    fontWeight: '600',
  },
  value: {
    alignItems: 'flex-end'
  },
  bold: {
    fontWeight: '600'
  },
  // hours_container: {
  //   over
  // },
  hours_button: {
    width: 50,
  }
});
