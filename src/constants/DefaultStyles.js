import { StyleSheet } from 'react-native';
import Colors from './Colors';

export default DefaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.bodyBackgroundColor,
        padding: 10
    },
    mainView: {
        backgroundColor: Colors.mainViewBackgroundColor,
        borderRadius: 5,
        padding: 10,
        marginRight:10,
        marginLeft:10
    },
    textLink: {
        paddingVertical: 15,
        alignItems: "center",
    },
    textLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
    scrollViewHeaderText: {
        fontSize: 18,
        fontWeight: '500',
        color: Colors.defaultTextColor
    }
});