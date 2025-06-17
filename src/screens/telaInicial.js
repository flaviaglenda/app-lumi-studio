import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Pressable,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

const galleryImages = [
  'https://storage.alboom.ninja/sites/7275/albuns/832725/ensaio_gestante_profissional_em_suzano.jpg?t=1621264087',
  'https://lauraalzueta.com.br/wp-content/uploads/2024/06/poses-gestantes-lauraalzuetasimone-dudu-pedro-lucca-015-1719421068.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQFlj54F-WwuaLF7ZwT-QwfWIoVCpf1LTUDQ&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnk1DsCB0OyXGH5kp-s9YU3xVzP9u9Rpd_tw&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7X6cL2RsNLNQdpPIgeZGFWfVm0K_qPtnutg&s',
];

const services = [
  {
    title: 'Sessões de Retratos',
    img: 'https://storage.alboom.ninja/sites/7443/albuns/939585/tifany-0312.jpg?t=1700607237',
  },
  {
    title: 'Sessões de Maternidade',
    img: 'https://s3.amazonaws.com/assets.fetalmed.net/wp-content/uploads/2022/11/Ensaio-Gestante-Capa.jpg',
  },
  {
    title: 'Sessões de Família',
    img: 'https://cdn.alboompro.com/606dc5c0b185090001bfabfe_62a11e7c9f0b810001a35b1a/original_size/foto-de-familia-ensaio-de-bebe-11.JPG?v=1',
  },
];

const App = ({ navigation }) => {
  const flatListRef = useRef();

  const scrollTo = (direction) => {
    flatListRef.current?.scrollToOffset({
      offset: direction === 'left' ? 0 : width,
      animated: true,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* TOPO */}
      <View style={styles.topSection}>
        <Image
          source={{
            uri: 'https://aceitosim.com.br/wp-content/uploads/2021/09/Kuguio-Fotografia-de-Casamento-1.jpg',
          }}
          style={styles.mainImage}
        />
        <View style={styles.gradientOverlay} />
        <View style={styles.overlay}>
          <Animatable.Text animation="fadeInDown" delay={300} style={styles.welcomeText}>
            Bem-vindo
          </Animatable.Text>
          <Animatable.Text animation="fadeInUp" delay={600} style={styles.subtitleText}>
            A cada clique, uma história é contada.
          </Animatable.Text>
        </View>
      </View>

      {/* SOBRE */}
      <Animatable.View animation="fadeInUp" delay={400} style={styles.aboutCard}>
        <Image
          source={{
            uri: 'https://st.depositphotos.com/2101611/3545/i/450/depositphotos_35458045-stock-photo-brown-background.jpg',
          }}
          style={styles.aboutBackground}
        />
        <View style={styles.aboutOverlay} />
        <View style={styles.aboutContent}>
          <Text style={styles.sectionTitle}>NÓS CAPTURAMOS OS MOMENTOS</Text>
          <Text style={styles.paragraph}>
            No Lumi Studio, somos especialistas em eternizar aqueles instantes que, embora breves, carregam significados imensos.
          </Text>
          <Text style={styles.paragraph}>
            Com paixão pela fotografia e um olhar atento aos detalhes, transformamos momentos simples em memórias extraordinárias.
          </Text>
        </View>
      </Animatable.View>

      {/* SERVIÇOS */}
      <View style={styles.servicesSection}>
        <Text style={styles.servicesTitle}>Nossos Serviços</Text>
        <View style={styles.services}>
          {services.map((item, index) => (
            <Animatable.View key={index} animation="zoomIn" delay={index * 200}>
              <Pressable
                onPress={() => {}}
                style={({ pressed }) => [
                  styles.card,
                  pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 },
                ]}
              >
                <Image source={{ uri: item.img }} style={styles.cardImage} />
                <Text style={styles.cardText}>{item.title}</Text>
              </Pressable>
            </Animatable.View>
          ))}
        </View>
      </View>

      {/* GALERIA */}
      <View style={styles.galleryHeader}>
        <Text style={styles.galleryTitle}>Galeria</Text>
        <TouchableOpacity
          style={styles.viewMoreButton}
          onPress={() => navigation.navigate('Galeria')}
        >
          <Text style={styles.viewMoreText}>Ver mais</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.carouselWrapper}>
        <TouchableOpacity onPress={() => scrollTo('left')} style={styles.arrow}>
          <Text style={styles.arrowText}>{'‹'}</Text>
        </TouchableOpacity>

        <FlatList
          ref={flatListRef}
          horizontal
          data={galleryImages}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Animatable.Image
              animation="fadeInRight"
              delay={index * 200}
              source={{ uri: item }}
              style={styles.galleryImage}
            />
          )}
        />

        <TouchableOpacity onPress={() => scrollTo('right')} style={styles.arrow}>
          <Text style={styles.arrowText}>{'›'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212', // Fundo escuro
    flex: 1,
  },
  topSection: {
    position: 'relative',
    height: 260,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)', // Mais escuro
  },
  overlay: {
    position: 'absolute',
    bottom: 25,
    left: 25,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
  },
  subtitleText: {
    color: '#ccc',
    fontSize: 18,
    marginTop: 5,
  },
  aboutCard: {
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#1e1e1e',
    elevation: 5,
  },
  aboutBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  aboutOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgb(30, 30, 30)',
  },
  aboutContent: {
    padding: 20,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 22,
    color: '#f5f5f5',
    marginBottom: 12,
    textAlign: 'center',
  },
  paragraph: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
    marginBottom: 10,
  },
  servicesSection: {
    marginTop: 30,
    paddingHorizontal: 25,
  },
  servicesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f0f0f0',
    textAlign: 'center',
    marginBottom: 20,
  },
  services: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  card: {
    alignItems: 'center',
    width: 110,
    backgroundColor: '#1e1e1e',
    borderRadius: 18,
    paddingVertical: 15,
    marginVertical: 10,
    marginHorizontal: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#ddd',
    fontWeight: '600',
  },
  galleryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 40,
    alignItems: 'center',
  },
  galleryTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#f0f0f0',
  },
  viewMoreButton: {
    backgroundColor: '#a98860',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 25,
    elevation: 3,
  },
  viewMoreText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  carouselWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  galleryImage: {
    width: 160,
    height: 110,
    borderRadius: 14,
    marginHorizontal: 6,
    borderWidth: 2,
    borderColor: 'rgb(30, 30, 30)',
  },
  arrow: {
    backgroundColor: '#1e1e1e',
    borderRadius: 30,
    padding: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgb(0 0 0);',
  },
  arrowText: {
    fontSize: 24,
    color: '#a98860',
    fontWeight: 'bold',
  },
});


export default App;
