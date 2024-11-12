import React from 'react';
import Menu from '../Menu/Menu';
import { separateSyllables } from '../../utils/separateSyllables';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomModal = ({ isVisible, onClose, cardInfo }) => {
  if (!isVisible) return null;

  const syllables = separateSyllables(cardInfo?.description || '');

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{cardInfo?.title}</Text>
          <View style={styles.videoContainer}></View>
          
          <View style={styles.syllablesContainer}>
            {syllables.map((syllable, index) => (
              <View key={index} style={styles.syllableBox}>
                <Text style={styles.syllableText}>{syllable}</Text>
              </View>
            ))}
          </View>
          
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Menu />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    width: '100%',
    height: '75%',
    position: 'absolute',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    bottom: 0
  },
  modalTitle: {
    color: "#4F4F4F",
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  syllablesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'center',
    marginVertical: 20,
  },
  syllableBox: {
    width: 50,
    height: 50,
    backgroundColor: '#FF9900', 
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
  },
  syllableText: {
    fontSize: 15,
    fontWeight: 'medium',
    color: '#FFFFFF',  
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'black',
    fontSize: 16,
  },
  videoContainer: {
    width: "70%",
    height: "30%",
    backgroundColor: "gray",
  }
});

export default CustomModal;
