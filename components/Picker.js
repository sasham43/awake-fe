import { View, Text, Pressable, StyleSheet } from 'react-native'


export function TypePicker(props){
    return (
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
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
    }
})