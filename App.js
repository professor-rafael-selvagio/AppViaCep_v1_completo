import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const App = () => {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState({});
  const [erro, setErro] = useState('');

  const consultarCep = () => {
    // Limpa mensagens de erro anteriores
    setErro('');

    // Validação básica do CEP
    if (!cep || cep.length !== 8) {
      setErro('CEP inválido. Insira os 8 dígitos do CEP.');
      return;
    }

    // Constrói a URL da API ViaCep
    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

    // Realiza a consulta à API ViaCep
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Verifica se há erro na resposta
        if (data.erro) {
          setErro('CEP não encontrado. Verifique e tente novamente.');
        } else {
          setEndereco(data);
        }
      })
      .catch(error => {
        setErro('Ocorreu um erro na consulta. Tente novamente mais tarde.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Digite o CEP:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 12345678"
        keyboardType="numeric"
        maxLength={8}
        value={cep}
        onChangeText={setCep}
      />
      <Button title="Consultar" onPress={consultarCep} />

      {endereco.logradouro && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Resultado:</Text>
          <Text>{`Logradouro: ${endereco.logradouro}`}</Text>
          <Text>{`Bairro: ${endereco.bairro}`}</Text>
          <Text>{`Cidade: ${endereco.localidade}`}</Text>
          <Text>{`Estado: ${endereco.uf}`}</Text>
        </View>
      )}

      {erro !== '' && <Text style={styles.error}>{erro}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default App;
