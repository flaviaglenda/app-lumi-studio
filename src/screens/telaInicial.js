import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const App = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Topo com imagem e gradiente (banner quadrado) */}
      <View style={styles.topSection}>
        <Image
          source={{ uri: 'https://aceitosim.com.br/wp-content/uploads/2021/09/Kuguio-Fotografia-de-Casamento-1.jpg' }}
          style={styles.mainImage}
        />
        <View style={styles.gradientOverlay} />
        <View style={styles.overlay}>
          <Animatable.Text
            animation="fadeInDown"
            delay={300}
            style={styles.welcomeText}
          >
            Bem-vindo
          </Animatable.Text>
          <Animatable.Text
            animation="fadeInUp"
            delay={600}
            style={styles.subtitleText}
          >
            A cada clique, uma história é contada.
          </Animatable.Text>
        </View>
      </View>

      {/* Texto principal com animação */}
      <Animatable.View animation="fadeInUp" delay={400} style={styles.textSection}>
        <Text style={styles.sectionTitle}>NÓS CAPTURAMOS OS MOMENTOS</Text>
        <Text style={styles.paragraph}>
          No Lumi Studio, somos especialistas em eternizar aqueles instantes que, embora breves, carregam significados imensos.
        </Text>
        <Text style={styles.paragraph}>
          Com paixão pela fotografia e um olhar atento aos detalhes, transformamos momentos simples em memórias extraordinárias.
        </Text>
      </Animatable.View>

      {/* Nossos Serviços com títulos e animações */}
      <View style={styles.servicesSection}>
        <Text style={styles.servicesTitle}>Nossos Serviços</Text>
        <View style={styles.services}>
          {[ 
            {
              title: 'Sessões de retratos',
              img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo1CkdnaR2dvzq3fafaEPLn6ygVbx0oKVCtg&s',
            },
            {
              title: 'Sessões de Maternidade',
              img: 'https://s3.amazonaws.com/assets.fetalmed.net/wp-content/uploads/2022/11/Ensaio-Gestante-Capa.jpg',
            },
            {
              title: 'Sessões de Família',
              img: 'https://fotografiamais.com.br/wp-content/uploads/2018/12/fotografia-de-familia-mercado.jpg',
            },
          ].map((item, index) => (
            <Animatable.View key={index} animation="zoomIn" delay={index * 200} style={styles.card}>
              <Image source={{ uri: item.img }} style={styles.cardImage} />
              <Text style={styles.cardText}>{item.title}</Text>
            </Animatable.View>
          ))}
        </View>
      </View>

      {/* Galeria com botão "Ver mais" */}
      <View style={styles.galleryHeader}>
        <Text style={styles.galleryTitle}>Galeria</Text>
        <TouchableOpacity style={styles.viewMoreButton}>
          <Text style={styles.viewMoreText}>Ver mais</Text>
        </TouchableOpacity>
      </View>

      {/* Atualizando a galeria */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gallery}>
        {[ 
          'https://fotografiamais.com.br/wp-content/uploads/2018/12/fotografia-de-familia-mercado.jpg',
          'https://fotografiamais.com.br/wp-content/uploads/2018/12/fotografia-de-familia-mercado.jpg',
          'https://fotografiamais.com.br/wp-content/uploads/2018/12/fotografia-de-familia-mercado.jpg',
          'https://fotografiamais.com.br/wp-content/uploads/2018/12/fotografia-de-familia-mercado.jpg',
        ].map((img, idx) => (
          <Animatable.Image
            animation="fadeInRight"
            delay={idx * 300}
            key={idx}
            source={{ uri: img }}
            style={styles.galleryImage}
          />
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fdfdfd',
    flex: 1,
  },
  topSection: {
    position: 'relative',
    height: 250,  // Ajustei a altura para tornar o banner mais quadrado
  },
  mainImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  gradientOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
  },
  overlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitleText: {
    color: '#eee',
    fontSize: 18,
    marginTop: 5,
  },
  textSection: {
    padding: 25,
    alignItems: 'center',
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 22,
    marginBottom: 12,
    color: '#333',
    textAlign: 'center',
  },
  paragraph: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 15,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    paddingVertical: 15,
    marginVertical: 10,
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3,
  },
  viewMoreText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  gallery: {
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  galleryImage: {
    width: 150,  // Tamanho das imagens ajustado para maior atratividade
    height: 100, // Tamanho das imagens ajustado para maior atratividade
    borderRadius: 14,
    marginRight: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default App;
