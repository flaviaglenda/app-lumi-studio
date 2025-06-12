import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

const galleryImages = [
  'https://storage.alboom.ninja/sites/7275/albuns/832725/ensaio_gestante_profissional_em_suzano.jpg?t=1621264087',
  'https://lauraalzueta.com.br/wp-content/uploads/2024/06/poses-gestantes-lauraalzuetasimone-dudu-pedro-lucca-015-1719421068.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQFlj54F-WwuaLF7ZwT-QwfWIoVCpf1LTUDQ&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnk1DsCB0OyXGH5kp-s9YU3xVzP9u9Rpd_tw&s',
   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7X6cL2RsNLNQdpPIgeZGFWfVm0K_qPtnutg&s',  // NOVA IMAGEM
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
          {[{
            title: 'Sessões de Retratos',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo1CkdnaR2dvzq3fafaEPLn6ygVbx0oKVCtg&s',
          },
          {
            title: 'Sessões de Maternidade',
            img: 'https://s3.amazonaws.com/assets.fetalmed.net/wp-content/uploads/2022/11/Ensaio-Gestante-Capa.jpg',
          },
          {
            title: 'Sessões de Família.',
            img: 'https://cdn.alboompro.com/606dc5c0b185090001bfabfe_62a11e7c9f0b810001a35b1a/original_size/foto-de-familia-ensaio-de-bebe-11.JPG?v=1',
          }].map((item, index) => (
            <Animatable.View key={index} animation="zoomIn" delay={index * 200} style={styles.card}>
              <Image source={{ uri: item.img }} style={styles.cardImage} />
              <Text style={styles.cardText}>{item.title}</Text>
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
    backgroundColor: '#fdfaf6',
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
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    color: '#eee',
    fontSize: 18,
    marginTop: 5,
  },
  aboutCard: {
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 4,
  },
  aboutBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  aboutOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  aboutContent: {
    padding: 20,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 22,
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  paragraph: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
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
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  services: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  card: {
    alignItems: 'center',
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 15,
    marginVertical: 10,
    elevation: 3,
  },
  cardImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#444',
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
    color: '#333',
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
  },
  arrow: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 6,
    elevation: 4,
  },
  arrowText: {
    fontSize: 20,
    color: '#a98860',
    fontWeight: 'bold',
  },
});

export default App;
