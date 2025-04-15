import { View, Text, TouchableOpacity, StyleSheet } from "react-native";


export default function Detalhes( {data} ){
    return(
        <View style={styles.container}>
            <View style={styles.modalContainer}> 
                <TouchableOpacity style={styles.btnVoltar} onPress={data.voltar}>
                    <Text style={styles.btntext}>
                        voltar
                    </Text>
                </TouchableOpacity>
                <Text style={styles.titulo}>{data.nome}</Text>
                <Text style={styles.tituloSinopse}>Sinopse</Text>
                <Text style={styles.textoSinopse}>{data.sinopse}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    modalContainer:{
        width: '80%',
        height: '80%',
        backgroundColor: '#6b6565',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    btnVoltar:{
        backgroundColor: '#e52246',
        padding: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    btntext:{
        color: '#fff',
        fontSize: 14
    },
    titulo:{
        textAlign: 'center',
        color: '#fff',
        padding: 10,
        fontSize: 26,
        fontWeight: 'bold',
        letterSpacing: 2
    },
    tituloSinopse:{
        fontWeight: 'bold',
        fontSize: 18
    },
    textoSinopse:{
        fontSize: 14,
    }
})