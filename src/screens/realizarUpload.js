import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function App({ navigation }) {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handlePublish = () => {
    // Aqui você poderia enviar as imagens e o título para um backend ou navegar
    navigation.navigate('Galeria');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>
          Aqui você pode fazer o upload das suas fotos e publicá-las. Apenas arraste a foto ou aperte no botão "SELECIONAR ARQUIVOS".
        </Text>

        <View style={styles.uploadContainer}>
          <View style={styles.imageRow}>
            {images.map((img, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image source={{ uri: img }} style={styles.image} />
                <TouchableOpacity style={styles.closeButton} onPress={() => removeImage(index)}>
                  <Ionicons name="close" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity style={styles.addButton} onPress={pickImage}>
              <Ionicons name="add" size={32} color="#888" />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Título..."
            placeholderTextColor="#888"
            value={title}
            onChangeText={setTitle}
          />

          <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
            <Text style={styles.publishText}>PUBLICAR</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.infoText}>
          Ao enviar uma imagem, você concorda com nossos [Termos de Uso] e [Política de Privacidade].{'\n\n'}
          Garantimos que seus arquivos são armazenados com segurança e utilizados exclusivamente para fins na plataforma. Não compartilhamos seus arquivos com terceiros sem o seu consentimento.
        </Text>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Lumi Studios{'\n'}
            Capture o mundo com a gente!{'\n'}
            Conecte-se pelos nossos canais e acesse recursos essenciais.
          </Text>
          <View style={styles.social}>
            <Ionicons name="logo-instagram" size={20} color="#fff" />
            <Ionicons name="logo-facebook" size={20} color="#fff" />
            <Ionicons name="logo-x" size={20} color="#fff" />
          </View>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf2e9',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
    color: '#000',
  },
  uploadContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  imageRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 15,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  closeButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 2,
    zIndex: 2,
  },
  addButton: {
    width: 120,
    height: 120,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    color: '#000',
    marginBottom: 10,
  },
  publishButton: {
    backgroundColor: '#bfa574',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  publishText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 10,
    color: '#000',
    marginBottom: 20,
  },
  footer: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 10,
  },
  social: {
    flexDirection: 'row',
    gap: 10,
  },
});

