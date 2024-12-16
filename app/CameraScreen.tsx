import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraActive, setCameraActive] = useState(true);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function handleBarCodeScanned({ type, data }: { type: string, data: string }) {
    console.log(`Barcode Scanned - Type: ${type}, Number: ${data}`);
    setCameraActive(false);
  }

  if (!cameraActive) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Barcode Scanned. Camera Closed.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing={facing}
        barcodeScannerSettings={{ 
          barcodeTypes: ["ean13"] 
        }}
        onBarcodeScanned={handleBarCodeScanned}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity> 
        </View>
        
        {/* Overlay für die Ecken */}
        <View style={styles.overlay}>
          <View style={styles.frame}>
            {/* Oben Links */}
            <View style={[styles.cornerLine, styles.topLeftHorizontal]} />
            <View style={[styles.cornerLine, styles.topLeftVertical]} />

            {/* Oben Rechts */}
            <View style={[styles.cornerLine, styles.topRightHorizontal]} />
            <View style={[styles.cornerLine, styles.topRightVertical]} />

            {/* Unten Links */}
            <View style={[styles.cornerLine, styles.bottomLeftHorizontal]} />
            <View style={[styles.cornerLine, styles.bottomLeftVertical]} />

            {/* Unten Rechts */}
            <View style={[styles.cornerLine, styles.bottomRightHorizontal]} />
            <View style={[styles.cornerLine, styles.bottomRightVertical]} />
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const cornerSize = 30; 
const cornerThickness = 7; 
const frameWidth = 300;
const frameHeight = 130;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    fontSize: 18,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    bottom: 50,
    alignSelf: 'center',
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    padding: 10
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  overlay: {
    position: 'absolute',
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frame: {
    width: frameWidth,
    height: frameHeight,
    position: 'relative'
  },
  cornerLine: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: cornerThickness, // Abgerundete Ecken
  },
  // Oben links
  topLeftHorizontal: {
    top: 0,
    left: 0,
    width: cornerSize,
    height: cornerThickness,
  },
  topLeftVertical: {
    top: 0,
    left: 0,
    width: cornerThickness,
    height: cornerSize,
  },
  // Oben rechts
  topRightHorizontal: {
    top: 0,
    right: 0,
    width: cornerSize,
    height: cornerThickness,
  },
  topRightVertical: {
    top: 0,
    right: 0,
    width: cornerThickness,
    height: cornerSize,
  },
  // Unten links
  bottomLeftHorizontal: {
    bottom: 0,
    left: 0,
    width: cornerSize,
    height: cornerThickness,
  },
  bottomLeftVertical: {
    bottom: 0,
    left: 0,
    width: cornerThickness,
    height: cornerSize,
  },
  // Unten rechts
  bottomRightHorizontal: {
    bottom: 0,
    right: 0,
    width: cornerSize,
    height: cornerThickness,
  },
  bottomRightVertical: {
    bottom: 0,
    right: 0,
    width: cornerThickness,
    height: cornerSize,
  },
});
