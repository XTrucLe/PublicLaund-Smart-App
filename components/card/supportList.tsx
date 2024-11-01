import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import SupportTaskCard, { SupportTask } from './supportCard';

const supportTasks:any[] = [
  { id: '1', title: 'Hướng dẫn sử dụng', description: 'Tìm hiểu cách sử dụng ứng dụng một cách hiệu quả.', icon: 'book', action: 'navigateToGuide' },
  { id: '2', title: 'Tin tức và cập nhật', description: 'Cập nhật các phiên bản và tính năng mới nhất của ứng dụng.', icon: 'newspaper-o', action: 'navigateToNews' },
  { id: '3', title: 'Liên kết mạng xã hội', description: 'Kết nối với chúng tôi trên các nền tảng mạng xã hội.', icon: 'share-alt', action: 'navigateToSocialLinks' },
  { id: '4', title: 'Câu hỏi thường gặp (FAQs)', description: 'Giải đáp các thắc mắc phổ biến từ người dùng.', icon: 'question-circle', action: 'navigateToFAQ' },
  { id: '5', title: 'Hỗ trợ khách hàng', description: 'Liên hệ với đội ngũ hỗ trợ khách hàng.', icon: 'headset', action: 'navigateToCustomerSupport' },
  { id: '6', title: 'Báo cáo sự cố', description: 'Thông báo sự cố gặp phải khi sử dụng ứng dụng.', icon: 'exclamation-circle', action: 'navigateToReportIssue' },
  { id: '7', title: 'Chính sách bảo mật', description: 'Xem các chính sách về quyền riêng tư và bảo mật dữ liệu.', icon: 'shield', action: 'navigateToPrivacyPolicy' },
];

const SupportScreen = ({ navigation }: any) => {
  const handlePress = (action: any) => {
    switch (action) {
      case 'navigateToGuide':
        navigation.navigate('GuideScreen');
        break;
      case 'navigateToNews':
        navigation.navigate('NewsScreen');
        break;
      case 'navigateToSocialLinks':
        navigation.navigate('SocialLinksScreen');
        break;
      case 'navigateToFAQ':
        navigation.navigate('FAQScreen');
        break;
      case 'navigateToCustomerSupport':
        navigation.navigate('CustomerSupportScreen');
        break;
      case 'navigateToReportIssue':
        navigation.navigate('ReportIssueScreen');
        break;
      case 'navigateToPrivacyPolicy':
        navigation.navigate('PrivacyPolicyScreen');
        break;
      default:
        console.log('Action not recognized');
    }
  };

  return (
    <View style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Hỗ trợ</Text>
      <FlatList
        data={supportTasks}
        renderItem={({ item }) => <SupportTaskCard item={item} onPress={handlePress} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
});

export default SupportScreen;