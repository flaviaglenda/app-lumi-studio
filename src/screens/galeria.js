import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import s3 from "../../awsConfig";

export default function TelaGaleria() {
  const [fotos, setFotos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarFotos() {
      try {
        const resposta = await s3
          .listObjectsV2({
            Bucket: "lumi-studio",
            Prefix: "fotos/",
          })
          .promise();

        const imagens = resposta.Contents.filter(
          (obj) => obj.Key !== "fotos/"
        ).map((obj) => ({
          titulo: obj.Key.replace("fotos/", ""),
          url: `https://lumi-studio.s3.amazonaws.com/${encodeURIComponent(
            obj.Key
          )}`,
        }));

        setFotos(imagens);
      } catch (error) {
        console.error("Erro ao buscar imagens do S3:", error);
      } finally {
        setCarregando(false);
      }
    }

    buscarFotos();
  }, []);

  return (
    <View style={estilos.container}>
      {/* TOPO */}
      <View style={estilos.barraTopo}>
        <View style={estilos.areaTopoImagem}>
          <View style={estilos.overlayTexto}>
            <Text style={estilos.textoSobreImagem}>
              EXPLORE NOSSA GALERIA
            </Text>
          </View>
        </View>
      </View>

      {/* CONTEÚDO */}
      <ScrollView contentContainerStyle={estilos.scrollContainer}>
        <View style={estilos.conteudo}>
          {carregando ? (
            <ActivityIndicator size="large" color="#000" />
          ) : fotos.length === 0 ? (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Nenhuma imagem encontrada.
            </Text>
          ) : (
            fotos.map((item, index) => (
              <View key={index} style={estilos.cartao}>
                <View style={estilos.linhaTitulo}>
                  <View style={estilos.pontoVermelho} />
                  <Text style={estilos.textoTitulo}>{item.titulo}</Text>
                </View>

                <View style={estilos.sombraImagem}>
                  <Image
                    source={{ uri: item.url }}
                    style={estilos.imagemGaleria}
                  />
                </View>
              </View>
            ))
          )}
        </View>

       
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4ecde" },

  // TOPO
  barraTopo: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
    justifyContent: "space-between",
  },
  areaTopoImagem: {
    position: "relative",
    width: "100%",
    height: 40,
    marginBottom: 16,
  },
  overlayTexto: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  textoSobreImagem: {
    color: "#000", // Corrigido, antes estava "000"
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.28)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },

  // CONTEÚDO
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingBottom: 20,
    backgroundColor: "#f4ecde",
  },
  conteudo: { paddingHorizontal: 16 },
  cartao: {
    marginBottom: 26,
    backgroundColor: "#f4ecde",
  },
  linhaTitulo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  pontoVermelho: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "red",
    marginRight: 6,
  },
  textoTitulo: {
    fontWeight: "bold",
    fontSize: 13,
  },
  imagemGaleria: {
    width: "100%",
    height: 160,
    borderRadius: 10,
  },
  sombraImagem: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 9,
    borderRadius: 10,
    backgroundColor: "transparent",
    marginBottom: 10,
  },
});
