import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import s3 from '../../awsConfig'; // Seu awsConfig
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function RealizarUpload({ navigation }) {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        Alert.alert('Acesso negado', 'Você precisa estar logado para acessar essa página.');
        navigation.replace('Login');
      } else {
        setUserEmail(user.email);
      }
    });

    return unsubscribe;
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      // No web, result.assets[0].uri pode ser blob URL ou file URI
      setImages([...images, result.assets[0].uri]);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const uploadToS3 = async (fileUri) => {
    try {
      const fileName = fileUri.split('/').pop();
      const fileType = fileName.split('.').pop();

      let buffer;

      if (Platform.OS === 'web') {
        // No web, faz fetch no arquivo pra pegar blob e converter
        const response = await fetch(fileUri);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        buffer = Buffer.from(arrayBuffer);
      } else {
        // No mobile, usa o expo-file-system normalmente
        const base64 = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        buffer = Buffer.from(base64, 'base64');
      }

      const params = {
        Bucket: 'lumi-studio',
        Key: `fotos/${title.trim()}.${fileType}`,
        Body: buffer,
        ContentType: `image/${fileType}`,
        ACL: 'public-read',
      };

      return s3.upload(params).promise();
    } catch (error) {
      console.error('Erro no uploadToS3:', error);
      throw error;
    }
  };

  const handlePublish = async () => {
    if (images.length === 0 || title.trim() === '') {
      Alert.alert('Atenção', 'Adicione pelo menos uma imagem e um título.');
      return;
    }

    setLoading(true);

    try {
      const uploadPromises = images.map((img) => uploadToS3(img));
      await Promise.all(uploadPromises);

      Alert.alert('Sucesso', 'Suas fotos foram publicadas na galeria!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Galeria', { atualizar: true }),
        },
      ]);

      setImages([]);
      setTitle('');
    } catch (error) {
      console.error('Erro ao enviar:', error);
      Alert.alert('Erro', 'Houve um problema ao enviar suas fotos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>
          Faça o upload das suas fotos e publique na galeria. Aperte em "SELECIONAR ARQUIVOS".
        </Text>

        <View style={styles.uploadContainer}>
          <View style={styles.imageRow}>
            {images.map((img, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image source={{ uri: img }} style={styles.image} />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => removeImage(index)}
                >
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

          <TouchableOpacity
            style={styles.publishButton}
            onPress={handlePublish}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.publishText}>PUBLICAR</Text>
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.infoText}>
          Ao enviar, você concorda com nossos Termos e Política de Privacidade.
        </Text>
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
});
