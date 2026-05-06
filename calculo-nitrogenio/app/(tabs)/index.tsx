import { useState, useCallback } from "react";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  Pressable,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import * as Haptics from "expo-haptics";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

// ─── Lógica de cálculo ───────────────────────────────────────────────────────

function arredondarParaMultiploDe100Superior(valor: number): number {
  if (valor <= 0) return 100;
  return Math.ceil(valor / 100) * 100;
}

function getMultiplicador(diametro: number): { fator: number; faixa: string } {
  if (diametro <= 100) return { fator: 1.3, faixa: "até 100 mm" };
  if (diametro <= 150) return { fator: 3, faixa: "101–150 mm" };
  if (diametro <= 200) return { fator: 5, faixa: "151–200 mm" };
  if (diametro <= 250) return { fator: 8, faixa: "201–250 mm" };
  return { fator: 12, faixa: "acima de 251 mm" };
}

interface ResultadoCalculo {
  volumeNitrogenio: number;
  extensaoArredondada: number;
  unidades: number;
  fator: number;
  faixa: string;
}

function calcular(diametroStr: string, extensaoStr: string): ResultadoCalculo | null {
  const diametro = parseFloat(diametroStr.replace(",", "."));
  const extensao = parseFloat(extensaoStr.replace(",", "."));
  if (isNaN(diametro) || isNaN(extensao) || diametro <= 0 || extensao <= 0) return null;

  // Passo 1: Arredondar para múltiplo de 100 superior e dividir por 100 para obter unidades
  const extensaoArredondada = arredondarParaMultiploDe100Superior(extensao);
  const unidades = extensaoArredondada / 100;

  // Passo 2: Multiplicar unidades pelo fator do diâmetro
  const { fator, faixa } = getMultiplicador(diametro);
  const volumeNitrogenio = unidades * fator;

  return { volumeNitrogenio, extensaoArredondada, unidades, fator, faixa };
}

// ─── Componente principal ────────────────────────────────────────────────────

export default function HomeScreen() {
  const colors = useColors();
  const [diametro, setDiametro] = useState("");
  const [extensao, setExtensao] = useState("");
  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const handleCalcular = useCallback(() => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setErro(null);
    if (!diametro.trim() || !extensao.trim()) {
      setErro("Preencha os dois campos para calcular.");
      setResultado(null);
      return;
    }
    const res = calcular(diametro, extensao);
    if (!res) {
      setErro("Insira valores numéricos válidos e maiores que zero.");
      setResultado(null);
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
      return;
    }
    setResultado(res);
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [diametro, extensao]);

  const handleLimpar = useCallback(() => {
    setDiametro("");
    setExtensao("");
    setResultado(null);
    setErro(null);
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, []);

  const styles = createStyles(colors);

  return (
    <ScreenContainer containerClassName="bg-background">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Cabeçalho ── */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Cálculo de{"\n"}Nitrogênio</Text>
            <Text style={styles.headerSubtitle}>Volume em tubulações</Text>
          </View>

          {/* ── Card de Entrada ── */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Dados da Tubulação</Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Diâmetro da tubulação</Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  value={diametro}
                  onChangeText={setDiametro}
                  placeholder="Ex: 150"
                  placeholderTextColor={colors.muted}
                  keyboardType="decimal-pad"
                  returnKeyType="next"
                  maxLength={10}
                />
                <View style={styles.unitBadge}>
                  <Text style={styles.unitText}>mm</Text>
                </View>
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Extensão da tubulação</Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  value={extensao}
                  onChangeText={setExtensao}
                  placeholder="Ex: 250"
                  placeholderTextColor={colors.muted}
                  keyboardType="decimal-pad"
                  returnKeyType="done"
                  onSubmitEditing={handleCalcular}
                  maxLength={10}
                />
                <View style={styles.unitBadge}>
                  <Text style={styles.unitText}>m</Text>
                </View>
              </View>
            </View>

            {erro ? (
              <View style={styles.erroBox}>
                <Text style={styles.erroText}>{erro}</Text>
              </View>
            ) : null}

            <View style={styles.botoesRow}>
              <Pressable
                onPress={handleLimpar}
                style={({ pressed }) => [
                  styles.btnSecundario,
                  pressed && { opacity: 0.7, transform: [{ scale: 0.97 }] },
                ]}
              >
                <Text style={styles.btnSecundarioText}>Limpar</Text>
              </Pressable>

              <Pressable
                onPress={handleCalcular}
                style={({ pressed }) => [
                  styles.btnPrimario,
                  pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] },
                ]}
              >
                <Text style={styles.btnPrimarioText}>Calcular</Text>
              </Pressable>
            </View>
          </View>

          {/* ── Card de Resultado ── */}
          {resultado ? (
            <View style={styles.cardResultado}>
              <Text style={styles.cardTitle}>Resultado</Text>

              <View style={styles.volumeDestaque}>
                <Text style={styles.volumeValor}>
                  {resultado.volumeNitrogenio % 1 === 0
                    ? resultado.volumeNitrogenio.toLocaleString("pt-BR")
                    : resultado.volumeNitrogenio.toLocaleString("pt-BR", {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 2,
                      })}
                </Text>
                <Text style={styles.volumeUnidade}>m³ de N₂</Text>
              </View>

              <View style={styles.detalhesSeparador} />

              <View style={styles.detalhesGrid}>
                <View style={styles.detalheItem}>
                  <Text style={styles.detalheLabel}>Extensão informada</Text>
                  <Text style={styles.detalheValor}>{extensao} m</Text>
                </View>
                <View style={styles.detalheItem}>
                  <Text style={styles.detalheLabel}>Extensão arredondada</Text>
                  <Text style={styles.detalheValor}>{resultado.extensaoArredondada} m</Text>
                </View>
                <View style={styles.detalheItem}>
                  <Text style={styles.detalheLabel}>Unidades de tubulação</Text>
                  <Text style={styles.detalheValor}>{resultado.unidades}</Text>
                </View>
                <View style={styles.detalheItem}>
                  <Text style={styles.detalheLabel}>Faixa de diâmetro</Text>
                  <Text style={styles.detalheValor}>{resultado.faixa}</Text>
                </View>
                <View style={styles.detalheItem}>
                  <Text style={styles.detalheLabel}>Fator aplicado</Text>
                  <Text style={styles.detalheValor}>× {resultado.fator}</Text>
                </View>
              </View>
            </View>
          ) : null}

          {/* ── Nota informativa ── */}
          <View style={styles.cardInfo}>
            <Text style={styles.infoIcone}>ℹ</Text>
            <Text style={styles.infoTexto}>
              A cada 20 bar na garrafa corresponde a 1 m³ de volume
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

// ─── Estilos ─────────────────────────────────────────────────────────────────

function createStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 32,
      gap: 16,
    },
    header: {
      paddingVertical: 16,
      paddingHorizontal: 4,
    },
    headerTitle: {
      fontSize: 30,
      fontWeight: "800",
      color: colors.primary,
      lineHeight: 38,
      letterSpacing: -0.5,
    },
    headerSubtitle: {
      fontSize: 14,
      color: colors.muted,
      marginTop: 4,
      letterSpacing: 0.3,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 16,
    },
    cardResultado: {
      backgroundColor: colors.primary,
      borderRadius: 16,
      padding: 20,
      gap: 12,
    },
    cardTitle: {
      fontSize: 13,
      fontWeight: "700",
      color: colors.muted,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    fieldGroup: {
      gap: 6,
    },
    label: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.foreground,
    },
    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    input: {
      flex: 1,
      height: 50,
      backgroundColor: colors.background,
      borderRadius: 10,
      borderWidth: 1.5,
      borderColor: colors.border,
      paddingHorizontal: 14,
      fontSize: 18,
      fontWeight: "600",
      color: colors.foreground,
    },
    unitBadge: {
      width: 48,
      height: 50,
      backgroundColor: colors.primary,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    unitText: {
      fontSize: 14,
      fontWeight: "700",
      color: "#FFFFFF",
    },
    erroBox: {
      backgroundColor: "#FEE2E2",
      borderRadius: 8,
      padding: 10,
      borderLeftWidth: 3,
      borderLeftColor: colors.error,
    },
    erroText: {
      fontSize: 13,
      color: colors.error,
      fontWeight: "500",
    },
    botoesRow: {
      flexDirection: "row",
      gap: 12,
      marginTop: 4,
    },
    btnPrimario: {
      flex: 2,
      height: 52,
      backgroundColor: colors.primary,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    btnPrimarioText: {
      fontSize: 16,
      fontWeight: "700",
      color: "#FFFFFF",
      letterSpacing: 0.3,
    },
    btnSecundario: {
      flex: 1,
      height: 52,
      backgroundColor: "transparent",
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
    },
    btnSecundarioText: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.muted,
    },
    volumeDestaque: {
      alignItems: "center",
      paddingVertical: 12,
    },
    volumeValor: {
      fontSize: 52,
      fontWeight: "800",
      color: "#FFFFFF",
      lineHeight: 60,
      letterSpacing: -1,
    },
    volumeUnidade: {
      fontSize: 18,
      fontWeight: "600",
      color: "rgba(255,255,255,0.8)",
      marginTop: 2,
    },
    detalhesSeparador: {
      height: 1,
      backgroundColor: "rgba(255,255,255,0.2)",
    },
    detalhesGrid: {
      gap: 10,
    },
    detalheItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    detalheLabel: {
      fontSize: 13,
      color: "rgba(255,255,255,0.7)",
      flex: 1,
    },
    detalheValor: {
      fontSize: 14,
      fontWeight: "700",
      color: "#FFFFFF",
      textAlign: "right",
    },
    cardInfo: {
      flexDirection: "row",
      alignItems: "flex-start",
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 14,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 10,
    },
    infoIcone: {
      fontSize: 16,
      color: colors.primary,
      fontWeight: "700",
      marginTop: 1,
    },
    infoTexto: {
      flex: 1,
      fontSize: 14,
      color: colors.foreground,
      lineHeight: 21,
      fontWeight: "500",
    },
  });
}
