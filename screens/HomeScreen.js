import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import { Header } from 'react-native-elements';
import dictionary from '../database';
export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed: false,
      isLoading: false,
      word: 'Loading...',
      lexicalCategory: '',
      definition: '',
    };
  }

  getWord = (text) => {
    var text = text.toLowerCase();
    try {
      var word = dictionary[text]['word'];
      var lexicalCategory = dictionary[text]['lexicalCategory'];
      var definition = dictionary[text]['definition'];
      this.setState({
        word: word,
        lexicalCategory: lexicalCategory,
        definition: definition,
      });
    } catch (err) {
      alert('Oh no!😓This word is not available in our dictionary ');
      this.setState({
        text: '',
        isSearchPressed: false,
      });
    }
  };

  render() {
    return (
      <View>
        <Header
          backgroundColor={'red'}
          centerComponent={{
            text: 'Pocket Dictionary App',
            style: { color: 'white', 
            fontSize: 15, 
            fontFamily: 'Broadway', 
            fontWeight: 'bold' },
          }}
        />
        <Image
         style={styles.icon}
         source = {{uri: 'https://media.giphy.com/media/3o6Mb5EPQiC8zByLXq/giphy.gif',}}/>
        <View>
          <TextInput
            style={styles.inputBox}
            onChangeText={(text) => {
              this.setState({
                text: text,
                isSearchPressed: false,
                word: '🄻🄾🄰🄳🄸🄽🄶....',
                lexicalCategory: '',
                examples: [],
                defination: '',
              });
            }}
            value={this.state.text}
          />

          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              this.setState({ isSearchPressed: true });
              this.getWord(this.state.text);
            }}>
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.outputContainer}>
          <Text style={{ fontSize: 20 }}>
            {this.state.isSearchPressed && this.state.word === 'Loading...'
              ? this.state.word
              : ''}
          </Text>
          {this.state.word !== 'Loading...' ? (
            <View style={{ justifyContent: 'center', marginLeft: 10 }}>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Word: </Text>
                <Text style={{ fontSize: 18 }}>{this.state.word}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Type: </Text>
                <Text style={{ fontSize: 18 }}>
                  {this.state.lexicalCategory}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <Text style={styles.detailsTitle}>Definition: </Text>
                <Text style={{ fontSize: 19 }}>{this.state.definition}</Text>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    marginTop: 30,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    borderColor: 'lightgreen',
    outline: 'none',
    backgroundColor: 'white',
    fontFamily: 'Comic Sans MS',
    fontSize: 35
  },
  searchButton: {
    width: '40%',
    height: 50,
    alignSelf: 'center',
    padding: 3,
    margin: 10,
    borderWidth: 4,
    borderRadius: 20,
    borderColor: 'white',
    backgroundColor: 'lightgreen'
  },
  searchText: {
    textAlign: 'center',
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: 'bold',
    color:'white'
  },
  outputContainer: {
    flex: 0.7,
    alignItems: 'center',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsTitle: {
    fontFamily: 'bold',
    color: '#9dabdd',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
   width: 190,
    height:140,
    marginLeft: 70,
    borderWidth: 2
  }
});