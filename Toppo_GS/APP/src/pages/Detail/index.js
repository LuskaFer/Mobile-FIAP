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

    const donate = route.params.donate;
    const message = `Olá ${donate.name}, estou entrando em contato pois gostaria de ajudar no caso "${donate.title}" com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(donate.value)}`;


    function navigateBack(){
        navigation.goBack()
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${donate.title}`,
            recipients: [donate.email],
            body: message,

        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${donate.whatsapp}&text=${message}`);
        
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

            <View style={styles.donate}>

                    <Text style={[styles.donateProperty, {marginTop: 0}]}> ONG:  </Text>
                    <Text style={styles.donateValue}> {donate.name} de {donate.city}/{donate.uf} </Text>
                
                    <Text style={styles.donateProperty}> Caso:  </Text>
                    <Text style={styles.donateValue}> {donate.title}  </Text>


                    


                    <Text style={styles.donateProperty}> Descrição:  </Text>
                    <Text style={styles.donateValue}> {donate.description}  </Text>

                    <Text style={styles.donateProperty}> Valor:  </Text>
                    <Text style={styles.donateValue}> {Intl.NumberFormat('pt-BR', { style: 'currency', 
                                currency: 'BRL'}).format(donate.value)}  </Text>             
            </View>

            <View style={styles.contractBox}>
                    <Text style={styles.heroTitle}>Salve o dia!</Text>
                    <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                    <Text style={styles.heroDescription}>Entre em contato.</Text>

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