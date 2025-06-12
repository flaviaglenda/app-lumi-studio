import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Icone from "react-native-vector-icons/FontAwesome";
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
      <View style={estilos.barraTopo}>
        <View style={estilos.botaoGaleria}>
          <Text style={estilos.textoBotaoGaleria}>GALERIA</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={estilos.scrollContainer}>
        <View style={estilos.conteudo}>
          {carregando ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            fotos.map((item, index) => (
              <View key={index} style={estilos.cartao}>
                <View style={estilos.linhaTitulo}>
                  <View style={estilos.pontoVermelho} />
                  <Text style={estilos.textoTitulo}>{item.titulo}</Text>
                </View>
                <Image
                  source={{ uri: item.url }}
                  style={estilos.imagemGaleria}
                />
              </View>
            ))
          )}
        </View>

        <View style={estilos.rodape}>
          <View style={{ flexDirection: "column" }}>
            <Image
              source={require("../assets/logo_fundopreto.png")}
              style={estilos.logoImagem}
            />
            <Text style={estilos.textoRodape}>
              Capture o mundo com a gente! Conecte-se com nossa comunidade,
              acesse recursos essenciais e conte com nosso suporte sempre que
              precisar.
            </Text>
            <View style={estilos.iconesSociais}>
              <Icone
                name="instagram"
                size={18}
                color="#fff"
                style={estilos.iconeSocial}
              />
              <Icone
                name="facebook"
                size={18}
                color="#fff"
                style={estilos.iconeSocial}
              />
              <Icone
                name="youtube"
                size={18}
                color="#fff"
                style={estilos.iconeSocial}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  barraTopo: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
    justifyContent: "space-between",
  },
  botaoGaleria: {
    marginLeft: 130,
    backgroundColor: "#2b2b2b",
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 14,
  },
  textoBotaoGaleria: {
    color: "#fff",
    fontWeight: "bold",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingBottom: 20,
    backgroundColor: "#fffaf2",
  },
  conteudo: { paddingHorizontal: 16 },
  cartao: {
    marginBottom: 26,
    backgroundColor: "#fff",
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
  rodape: {
    marginTop: 30,
    backgroundColor: "#000",
    height: 200,
    width: "100%",
    alignSelf: "stretch",
    marginBottom: -90,
    padding: 16,
  },
  logoImagem: {
    width: 140,
    height: 45,
    resizeMode: "contain",
    marginBottom: 14,
  },
  textoRodape: {
    color: "#ccc",
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 14,
  },
  iconesSociais: {
    flexDirection: "row",
    marginTop: 8,
  },
  iconeSocial: {
    marginRight: 16,
  },
});
