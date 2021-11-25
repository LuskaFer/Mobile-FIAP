import {StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop:  Constants.statusBarHeight + 20,

},

header: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
  
},

donate: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 16,   
    marginTop: 48,
},

donateProperty: {
    fontSize: 14,
    color: '#41414d',
    marginTop: 24,
    fontWeight: 'bold',        
},
donateValue:{
    marginTop: 8,
    fontSize: 15,
    color: '#737380',
  
},

contractBox: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 16,

},

heroTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#13131a',
    lineHeight: 30,
},

heroDescription: {
    fontSize: 15,
    color: "#737380",
    marginTop: 16,
},

actions: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
},

action: {
    backgroundColor: '#13131a',
    borderRadius: 8,
    height: 50,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
},

actionText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFF',
}


});