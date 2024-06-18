import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
} from "react-native";

import { getClinics } from "../src/api";

const images = [
  { id: "1", url: "https://picsum.photos/200/300" },
  { id: "2", url: "https://picsum.photos/200/300" },
  { id: "3", url: "https://picsum.photos/200/300" },
];

export default function HomeScreen({ navigation }) {
  const [clinics, setClinics] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    fetchClinics();
    const interval = setInterval(() => {
      if (currentIndex < images.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
      flatListRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const fetchClinics = async () => {
    try {
      const data = await getClinics();
      setClinics(data);
    } catch (error) {
      console.error("Error fetching clinics:", error);
    }
  };

  const renderImageItem = ({ item }) => (
    <TouchableOpacity style={styles.imageItem}>
      <Image source={{ uri: item.url }} style={styles.image} />
    </TouchableOpacity>
  );

  const renderClinicItem = ({ item }) => (
    <TouchableOpacity
      style={styles.clinicItem}
      onPress={() => navigation.navigate("ClinicDetails", { clinic: item })}
    >
      <Image
        source={{ uri: `http://10.0.2.2:5000/uploads/${item.image}` }}
        style={styles.imageClinic}
      />
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Horizontal Carousel for Images */}
      <Text style={styles.carouselTitle}>Featured Images</Text>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled // Enable paging to show one image at a time
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderImageItem}
        contentContainerStyle={styles.carouselContainer}
      />

      {/* Clinic Selection */}
      <Text style={styles.title}>Select Clinic</Text>
      <FlatList
        data={clinics}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={renderClinicItem}
        contentContainerStyle={styles.clinicContainer}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  carouselTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  carouselContainer: {
    marginBottom: 20,
    height: 200,
  },
  imageItem: {
    width: 300, // Adjust width to display all images
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "bold",
    color: "#333",
  },
  clinicContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  clinicItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    backgroundColor: "white",
    width: 150,
    height: 200,
  },
  itemText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
    color: "#333",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  imageClinic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  //
});
