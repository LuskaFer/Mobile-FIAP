import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons' ;
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer'



import logoImg from '../../assets/logo.png';
import styles from './styles';


export default function Detail(){
    const navigation = useNavigation();
    const route = useRoute();

    const device = route.params.device;
    const message = `Olá ${device.name}, estou entrando em contato pois gostaria de ajudar no caso "${device.title}" com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(device.value)}`;


    function navigateBack(){
        navigation.goBack()
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${device.title}`,
            recipients: [device.email],
            body: message,

        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${device.whatsapp}&text=${message}`);
        
    }

    return(

    <View style={styles.container}>  
                <View style={styles.header}>
                    <Image source={logoImg}/>
                    <TouchableOpacity onPress={navigateBack}>     
                        <Feather name="arrow-left" size={28}  color="#E02041"></Feather>      
                    </TouchableOpacity>            
                </View>
        <ScrollView showsVerticalScrollIndicator={false}>

            <View style={styles.device}>

                    <Text style={[styles.deviceProperty, {marginTop: 0}]}> User:  </Text>
                    <Text style={styles.deviceValue}> {device.name} de {device.city}/{device.uf} </Text>
                
                    <Text style={styles.deviceProperty}> Smart Device:  </Text>
                    <Text style={styles.deviceValue}> {device.title}  </Text>


                    


                    <Text style={styles.deviceProperty}> Descrição:  </Text>
                    <Text style={styles.deviceValue}> {device.description}  </Text>

                    <Text style={styles.deviceProperty}> IP:  </Text>
                    <Text style={styles.deviceValue}> {device.value}  </Text>             
            </View>

            <View style={styles.contractBox}>
                    <Text style={styles.heroTitle}>Seja Smart</Text>
                    <Text style={styles.heroTitle}>Mais configurações.</Text>

                    <Text style={styles.heroDescription}>Entre em contato com o suporte.</Text>

                    <View style={styles.actions}> 
                        <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                            <Text style={styles.actionText}> Whatsapp</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.action} onPress={sendMail}>
                            <Text style={styles.actionText}> E-mail</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </ScrollView>
    
    </View>
    );
}