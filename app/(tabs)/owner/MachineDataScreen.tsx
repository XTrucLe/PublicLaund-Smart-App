import { RouteProps } from '@/components/navigation';
import React, { useState } from 'react';
import { Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
type DataProps = {
    route: RouteProps<'MachineDataScreen'>;
};
const MachineDataScreen = ({route}:DataProps) => {
  const { machineId } = route.params; // Nhận dữ liệu từ route.params

  // Khởi tạo state dưới dạng object
  const [formData, setFormData] = useState({
    id: machineId,
    name: '',
    model: '',
    capacity: '',
    locationName: '',
    locationAddress: '',
    city: '',
    district: '',
  });

  const handleChange = (key:any, value: any) => {
    setFormData(prevState => ({
      ...prevState,
      [key]: value, // Cập nhật giá trị tương ứng trong object
    }));
  };

  const handleSubmit = () => {
    // Xử lý dữ liệu khi người dùng nhấn nút gửi
    console.log('Dữ liệu đã nhập:', formData);
    // Bạn có thể thêm mã để gửi dữ liệu đến API hoặc xử lý khác tại đây
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Nhập Dữ Liệu</Text>
      <TextInput
        placeholder="ID"
        value={formData.id.toString()}
        // onChangeText={value => handleChange('id', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Tên"
        value={formData.name}
        onChangeText={value => handleChange('name', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Mẫu"
        value={formData.model}
        onChangeText={value => handleChange('model', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Dung lượng"
        value={formData.capacity}
        onChangeText={value => handleChange('capacity', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Tên địa điểm"
        value={formData.locationName}
        onChangeText={value => handleChange('locationName', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Địa chỉ địa điểm"
        value={formData.locationAddress}
        onChangeText={value => handleChange('locationAddress', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Thành phố"
        value={formData.city}
        onChangeText={value => handleChange('city', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Quận"
        value={formData.district}
        onChangeText={value => handleChange('district', value)}
        style={styles.input}
      />
      <Button title="Gửi" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
});

export default MachineDataScreen;
