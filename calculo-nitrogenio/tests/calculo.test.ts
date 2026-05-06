import { describe, it, expect } from "vitest";

// ─── Funções replicadas para teste (mesma lógica do index.tsx) ───────────────

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

function calcular(diametroStr: string, extensaoStr: string) {
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

// ─── Testes de arredondamento ────────────────────────────────────────────────

describe("arredondarParaMultiploDe100Superior", () => {
  it("100 permanece 100 (múltiplo exato)", () => {
    expect(arredondarParaMultiploDe100Superior(100)).toBe(100);
  });
  it("101 vira 200", () => {
    expect(arredondarParaMultiploDe100Superior(101)).toBe(200);
  });
  it("200 permanece 200", () => {
    expect(arredondarParaMultiploDe100Superior(200)).toBe(200);
  });
  it("1 vira 100", () => {
    expect(arredondarParaMultiploDe100Superior(1)).toBe(100);
  });
  it("350 vira 400", () => {
    expect(arredondarParaMultiploDe100Superior(350)).toBe(400);
  });
  it("0 retorna 100 (proteção)", () => {
    expect(arredondarParaMultiploDe100Superior(0)).toBe(100);
  });
  it("999 vira 1000", () => {
    expect(arredondarParaMultiploDe100Superior(999)).toBe(1000);
  });
});

// ─── Testes de multiplicador (NOVOS INTERVALOS) ──────────────────────────────

describe("getMultiplicador - Novos Intervalos", () => {
  it("diâmetro 50 → fator 1.3 (até 100 mm)", () => {
    expect(getMultiplicador(50).fator).toBe(1.3);
  });
  it("diâmetro 100 → fator 1.3 (limite superior até 100)", () => {
    expect(getMultiplicador(100).fator).toBe(1.3);
  });
  it("diâmetro 101 → fator 3 (101-150 mm)", () => {
    expect(getMultiplicador(101).fator).toBe(3);
  });
  it("diâmetro 125 → fator 3 (101-150 mm)", () => {
    expect(getMultiplicador(125).fator).toBe(3);
  });
  it("diâmetro 150 → fator 3 (limite superior 101-150)", () => {
    expect(getMultiplicador(150).fator).toBe(3);
  });
  it("diâmetro 151 → fator 5 (151-200 mm)", () => {
    expect(getMultiplicador(151).fator).toBe(5);
  });
  it("diâmetro 175 → fator 5 (151-200 mm)", () => {
    expect(getMultiplicador(175).fator).toBe(5);
  });
  it("diâmetro 200 → fator 5 (limite superior 151-200)", () => {
    expect(getMultiplicador(200).fator).toBe(5);
  });
  it("diâmetro 201 → fator 8 (201-250 mm)", () => {
    expect(getMultiplicador(201).fator).toBe(8);
  });
  it("diâmetro 225 → fator 8 (201-250 mm)", () => {
    expect(getMultiplicador(225).fator).toBe(8);
  });
  it("diâmetro 250 → fator 8 (limite superior 201-250)", () => {
    expect(getMultiplicador(250).fator).toBe(8);
  });
  it("diâmetro 251 → fator 12 (acima de 251 mm)", () => {
    expect(getMultiplicador(251).fator).toBe(12);
  });
  it("diâmetro 500 → fator 12 (acima de 251 mm)", () => {
    expect(getMultiplicador(500).fator).toBe(12);
  });
});

// ─── Testes de cálculo completo (NOVOS INTERVALOS) ──────────────────────────

describe("calcular - Novos Intervalos de Diâmetro", () => {
  it("diâmetro 50mm (até 100), extensão 100m → 1 unidade × 1.3 = 1.3 m³", () => {
    const res = calcular("50", "100");
    expect(res).not.toBeNull();
    expect(res!.extensaoArredondada).toBe(100);
    expect(res!.unidades).toBe(1);
    expect(res!.fator).toBe(1.3);
    expect(res!.volumeNitrogenio).toBe(1.3);
  });

  it("diâmetro 100mm (até 100), extensão 105m → 2 unidades × 1.3 = 2.6 m³", () => {
    const res = calcular("100", "105");
    expect(res).not.toBeNull();
    expect(res!.extensaoArredondada).toBe(200);
    expect(res!.unidades).toBe(2);
    expect(res!.fator).toBe(1.3);
    expect(res!.volumeNitrogenio).toBe(2.6);
  });

  it("diâmetro 125mm (101-150), extensão 250m → 3 unidades × 3 = 9 m³", () => {
    const res = calcular("125", "250");
    expect(res).not.toBeNull();
    expect(res!.extensaoArredondada).toBe(300);
    expect(res!.unidades).toBe(3);
    expect(res!.fator).toBe(3);
    expect(res!.volumeNitrogenio).toBe(9);
  });

  it("diâmetro 150mm (101-150), extensão 150m → 2 unidades × 3 = 6 m³", () => {
    const res = calcular("150", "150");
    expect(res).not.toBeNull();
    expect(res!.extensaoArredondada).toBe(200);
    expect(res!.unidades).toBe(2);
    expect(res!.fator).toBe(3);
    expect(res!.volumeNitrogenio).toBe(6);
  });

  it("diâmetro 175mm (151-200), extensão 200m → 2 unidades × 5 = 10 m³", () => {
    const res = calcular("175", "200");
    expect(res).not.toBeNull();
    expect(res!.extensaoArredondada).toBe(200);
    expect(res!.unidades).toBe(2);
    expect(res!.fator).toBe(5);
    expect(res!.volumeNitrogenio).toBe(10);
  });

  it("diâmetro 200mm (151-200), extensão 500m → 5 unidades × 5 = 25 m³", () => {
    const res = calcular("200", "500");
    expect(res).not.toBeNull();
    expect(res!.extensaoArredondada).toBe(500);
    expect(res!.unidades).toBe(5);
    expect(res!.fator).toBe(5);
    expect(res!.volumeNitrogenio).toBe(25);
  });

  it("diâmetro 225mm (201-250), extensão 300m → 3 unidades × 8 = 24 m³", () => {
    const res = calcular("225", "300");
    expect(res).not.toBeNull();
    expect(res!.extensaoArredondada).toBe(300);
    expect(res!.unidades).toBe(3);
    expect(res!.fator).toBe(8);
    expect(res!.volumeNitrogenio).toBe(24);
  });

  it("diâmetro 250mm (201-250), extensão 100m → 1 unidade × 8 = 8 m³", () => {
    const res = calcular("250", "100");
    expect(res).not.toBeNull();
    expect(res!.extensaoArredondada).toBe(100);
    expect(res!.unidades).toBe(1);
    expect(res!.fator).toBe(8);
    expect(res!.volumeNitrogenio).toBe(8);
  });

  it("diâmetro 300mm (acima de 251), extensão 200m → 2 unidades × 12 = 24 m³", () => {
    const res = calcular("300", "200");
    expect(res).not.toBeNull();
    expect(res!.extensaoArredondada).toBe(200);
    expect(res!.unidades).toBe(2);
    expect(res!.fator).toBe(12);
    expect(res!.volumeNitrogenio).toBe(24);
  });

  it("diâmetro 400mm (acima de 251), extensão 1m → 1 unidade × 12 = 12 m³", () => {
    const res = calcular("400", "1");
    expect(res).not.toBeNull();
    expect(res!.extensaoArredondada).toBe(100);
    expect(res!.unidades).toBe(1);
    expect(res!.fator).toBe(12);
    expect(res!.volumeNitrogenio).toBe(12);
  });

  it("entrada vazia retorna null", () => {
    expect(calcular("", "100")).toBeNull();
    expect(calcular("100", "")).toBeNull();
  });

  it("valor zero retorna null", () => {
    expect(calcular("0", "100")).toBeNull();
    expect(calcular("100", "0")).toBeNull();
  });

  it("texto inválido retorna null", () => {
    expect(calcular("abc", "100")).toBeNull();
    expect(calcular("100", "xyz")).toBeNull();
  });

  it("aceita vírgula como separador decimal", () => {
    const res = calcular("125", "150,5");
    expect(res).not.toBeNull();
    expect(res!.extensaoArredondada).toBe(200);
    expect(res!.unidades).toBe(2);
  });
});
