import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* TOPO COM IMAGEM E TEXTO */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://cdn0.casamentos.com.br/vendor/5116/3_2/640/jpg/casamentos-19_13_165116-162888179643353.jpeg' }}
          style={styles.headerImage}
        />
        <View style={styles.overlay}>
          <Text style={styles.title}>Bem-vindo ao Lumi Studio</Text>
          <Text style={styles.subtitle}>Transformamos momentos em eternidade</Text>
        </View>
      </View>

      {/* SESSÃO INFORMATIVA */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Nós capturamos os momentos mais importantes</Text>
        <Text style={styles.paragraph}>
          No Lumi Studio, cada clique é feito com paixão e cuidado, eternizando emoções autênticas em fotos inesquecíveis.
        </Text>
        <Text style={styles.paragraph}>
          Com olhar artístico e sensibilidade, registramos a beleza dos detalhes e a essência de cada pessoa.
        </Text>
        <Text style={styles.paragraph}>
          Seja um retrato, uma gestação ou um momento em família, nós criamos lembranças visuais que falam ao coração.
        </Text>
      </View>

      {/* SERVIÇOS */}
      <View style={styles.servicesSection}>
        <Text style={styles.servicesTitle}>Nossos Serviços</Text>
        <View style={styles.serviceItem}>
          <Icon name="camera-alt" size={30} color="#a68766" />
          <Text style={styles.serviceText}>Sessões de Retratos</Text>
        </View>
        <View style={styles.serviceItem}>
          <Icon name="favorite" size={30} color="#a68766" />
          <Text style={styles.serviceText}>Sessões de Maternidade</Text>
        </View>
        <View style={styles.serviceItem}>
          <Icon name="event" size={30} color="#a68766" />
          <Text style={styles.serviceText}>Sessões de Família</Text>
        </View>
      </View>

      {/* GALERIA */}
      <View style={styles.gallerySection}>
        <Text style={styles.galleryTitle}>Galeria</Text>
        <View style={styles.galleryImages}>
          <Image source={{uri: 'https://fotografiamais.com.br/wp-content/uploads/2018/12/fotografia-de-familia-mercado.jpg'}} style={styles.galleryImage} />
          <Image source={{uri: 'https://acd157832557f8c960da-d094371d43d33265178d3ba876698c19.ssl.cf1.rackcdn.com/FotoInicial/fotografo-de-gestante-brasilia-brasilia-df-frederico-gomes_o1d2tuq4qfhe1smr11361tdb1ioj9_2.png'}} style={styles.galleryImage} />
          <Image source={{uri: 'https://storage.alboom.ninja/sites/7413/albuns/1026245/fotografo-fotografia-profissional-sp-sao-paulo-casamento-61.jpg?t=1656109521'}} style={styles.galleryImage} />
        </View>
        <TouchableOpacity style={styles.galleryButton}>
          <Text style={styles.galleryButtonText}>Ver mais</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fdfdfd',
  },
  header: {
    position: 'relative',
    height: 300,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  overlay: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#eee',
    marginVertical: 10,
  },
  infoSection: {
    backgroundColor: '#fff',
    padding: 24,
    margin: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 15,
    color: '#444',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  paragraph: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    lineHeight: 24,
    textAlign: 'center',
  },
  servicesSection: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  servicesTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  serviceText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  gallerySection: {
    marginHorizontal: 20,
    marginBottom: 40,
  },
  galleryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  galleryImages: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  galleryImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    transition: 'transform 0.3s ease',
  },
  galleryImageHovered: {
    transform: [{ scale: 1.1 }],
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  galleryButton: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#a68766',
  },
  galleryButtonText: {
    color: '#a68766',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
