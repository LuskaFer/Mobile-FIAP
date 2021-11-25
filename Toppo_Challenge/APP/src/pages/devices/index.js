import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Devices(){
    const [devices, setDevices] = useState([]);
    const navigation = useNavigation();

    const [total, setTotal] = useState(0);

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    function navigateToDetail(device){
        navigation.navigate('Detail', { device });

    }
    
    async function loadDevices(){

        if (loading){
            return;

        }

        if(total > 0 && devices.length === total){

            return;
        }

        setLoading(true);

        const response = await api.get('devices', { params:  { page } });

        

        setDevices([...devices, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage( page + 1);
        setLoading(false);

    }

    useEffect(() => {
        loadDevices();

    }, []);



    return(

    <View style={styles.container}> 
        <View style={styles.header}>
            <Image source={logoImg}/>
            <Text style={styles.headerText}>
                Total de <Text style={styles.headerTextBold}>{total} devices.</Text>
            </Text>
            
        </View>
        <Text style={styles.title}>Bem-Vindo Smart User ! ;) </Text>
        <Text style={styles.description}> Veja seus devices smart e configure ou programe seu uso.</Text>
        
        <FlatList style={styles.deviceList}
        showsVerticalScrollIndicator={false}
        onEndReached={loadDevices}
        onEndReachedThreshold={0.1}
         data={devices}
         keyExtractor={device => String(device.id)}         
        renderItem={({ item: device }) => (
                    <View style={styles.device}> 
                        <Text style={styles.deviceProperty}> user:  </Text>
                        <Text style={styles.deviceValue}> {device.name}  </Text>

                        <Text style={styles.deviceProperty}> Smart Device:  </Text>
                        <Text style={styles.deviceValue}> {device.title} </Text>

                        <Text style={styles.deviceProperty}> Ip:  </Text>
                        <Text style={styles.deviceValue}> {device.value}  </Text>

                        <TouchableOpacity 
                        style={styles.detailsButton} 
                        onPress={() => navigateToDetail(device)}>
                            <Text style={styles.detailsButtonText}> Ver mais detalhes e configurar  </Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
            
        )} />
       
            
    </View>


    );
}