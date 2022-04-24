import { ScrollView, View, Text, Pressable, StyleSheet, Dimensions } from 'react-native'

export function TypePicker(props){
    if(props.hourPicker){
        return (
            <>
                <ScrollView horizontal style={styles.hour_container}>
                    {
                        props.choices.map((choice, index) => {
                            return (
                                <Pressable style={[styles.choice_button, styles.hour_button, props.selected.title === choice.title ? styles.selected_choice : null]} onPress={() => props.selectChoice(choice)} key={`choice-${index}`}>
                                    <Text style={props.selected?.title === choice.title ? styles.selected_choice : null}>{choice.title}</Text>
                                </Pressable>
                            )
                        })
                    }
                </ScrollView>
            </>
        )
    }
    return (
        <>
            <View style={[styles.container, props.container_style]}>
                {
                    props.choices.map((choice, index) => {
                        return (
                            <Pressable style={[styles.choice_button, props.selected.title === choice.title ? styles.selected_choice : null]} onPress={() => props.selectChoice(choice)} key={`choice-${index}`}>
                                <Text style={props.selected?.title === choice.title ? styles.selected_choice : null}>{choice.title}</Text>
                            </Pressable>
                        )
                    })
                }
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
        flexGrow: 0,
        height: 100,
    },
    time_of_day_container: {
        flexDirection: 'row'
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
    },
    choice_button: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderColor: '#aaa'
    },
    selected_choice: {
        borderColor: '#333'
    },
    hour_button: {
        width: 50,
    }
})