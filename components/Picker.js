import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native'


export function TypePicker(props){
    // console.log('len', props.hours)
    return (
        <>
            <View style={styles.container}>
                {/* <Text>Here</Text> */}
                {
                    props.choices.map((choice, index) => {
                        return (
                            <Pressable onPress={() => props.selectChoice(choice)} key={`choice-${index}`}>
                                <Text>{choice.title}</Text>
                            </Pressable>
                        )
                    })
                }
            </View>
                {
                    props.hours?.length ?
                    <View style={styles.container}>
                        <Hours hours={props.hours} selectHour={props.selectHour} />
                    </View>
                    : null
                }
        </>
    )
}

function Hours(props){
    let morning = []
    let noon = []
    let night = []

    for(var i = 0; i < 24; i++){
        let present = props.hours.includes(i)
        let hour = {
            value: i,
            present
        }
        if(i < 8){
            morning.push(hour)
        } else if (i >= 9 && i <= 16){
            noon.push(hour)
        } else {
            night.push(hour)
        }
    }
    // console.log('morn', morning, noon, night)

    function selectHour(hour){
        props.selectHour(hour)
    }

    // props.hours.forEach(hour => {
    //     if(hour < 8){
    //         morning.push(hour)
    //     } else if (hour >= 9 && hour <= 14){
    //         noon.push(hour)
    //     } else {
    //         night.push(hour)
    //     }
    // })

    return (
        <>
        {/* <Text>Hours</Text> */}
        <View style={styles.hour_container}>
            <View style={styles.time_of_day_container}>
                {
                    morning.map((hour, index) => {
                        return (
                            <Pressable key={`morning-${index}`} style={[styles.hour_button, hour.present ? styles.selected_button : null]} onPress={() => selectHour(hour)}>
                                <Text style={[styles.hour_button_text, hour.present ? styles.selected_button_text : null]}>{hour.value}</Text>
                            </Pressable>
                        )
                    })
                }
            </View>
            <View style={styles.time_of_day_container}>
                {
                    noon.map((hour, index) => {
                        return (
                            <Pressable key={`noon-${index}`} style={[styles.hour_button, hour.present ? styles.selected_button : null]} onPress={() => selectHour(hour)}>
                                <Text style={[styles.hour_button_text, hour.present ? styles.selected_button_text : null]}>{hour.value}</Text>
                            </Pressable>
                        )
                    })
                }
            </View>
            <View style={styles.time_of_day_container}>
                {
                    night.map((hour, index) => {
                        return (
                            <Pressable key={`night-${index}`} style={[styles.hour_button, hour.present ? styles.selected_button : null]} onPress={() => selectHour(hour)}>
                                <Text style={[styles.hour_button_text, hour.present ? styles.selected_button_text : null]}>{hour.value}</Text>
                            </Pressable>
                        )
                    })
                }
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        height: 75,
        width: Dimensions.get('screen').width,
    },
    hour_container: {
        // height: 100,
        // width: Dimensions.get('screen').width,
        flexDirection: 'column',
    },
    time_of_day_container: {
        flexDirection: 'row'
    },
    hour_button: {
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 4,
        width: 40,
        height: 20,
        borderWidth: 1,
        // backgroundColor: 'red',
    },
    hour_button_text: {
        color: 'black',
    },
    selected_button: {
        backgroundColor: 'black',
        color: 'white',
    },
    selected_button_text: {
        color: 'white'
    }
})