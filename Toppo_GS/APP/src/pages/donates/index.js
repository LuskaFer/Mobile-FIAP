import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Donates(){
    const [donates, setDonates] = useState([]);
    const navigation = useNavigation();

    const [total, setTotal] = useState(0);

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    function navigateToDetail(donate){
        navigation.navigate('Detail', { donate });

    }
    
    async function loadDonates(){

        if (loading){
            return;

        }

        if(total > 0 && donates.length === total){

            return;
        }

        setLoading(true);

        const response = await api.get('donates', { params:  { page } });

        

        setDonates([...donates, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage( page + 1);
        setLoading(false);

    }

    useEffect(() => {
        loadDonates();

    }, []);



    return(

    <View style={styles.container}> 
        <View style={styles.header}>
            <Image source={logoImg}/>
            <Text style={styles.headerText}>
                Total de <Text style={styles.headerTextBold}>{total} requisiçoes.</Text>
            </Text>
            
        </View>
        <Text style={styles.title}>Bem-Vindo ! </Text>
        <Text style={styles.description}> Escolha um dos casos abaixo e ajude com uma doação.</Text>
        
        <FlatList style={styles.donateList}
        showsVerticalScrollIndicator={false}
        onEndReached={loadDonates}
        onEndReachedThreshold={0.1}
         data={donates}
         keyExtractor={donate => String(donate.id)}         
        renderItem={({ item: donate }) => (
                    <View style={styles.donate}> 
                        <Text style={styles.donateProperty}> ONG:  </Text>
                        <Text style={styles.donateValue}> {donate.name}  </Text>

                        <Text style={styles.donateProperty}> Caso:  </Text>
                        <Text style={styles.donateValue}> {donate.title} </Text>

                        <Text style={styles.donateProperty}> Valor:  </Text>
                        <Text style={styles.donateValue}> 
                        {Intl.NumberFormat('pt-BR', { style: 'currency', 
                        currency: 'BRL'}).format(donate.value)}  </Text>

                        <TouchableOpacity 
                        style={styles.detailsButton} 
                        onPress={() => navigateToDetail(donate)}>
                            <Text style={styles.detailsButtonText}> Ver mais detalhes  </Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
            
        )} />
       
            
    </View>


    );
}