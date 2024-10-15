import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface NotificationItemProps {
    id: number;
    title: string;
    message: string;
    timestamp: Date;
    type: 'usage' | 'warning';
    viewed: 0 | 1;
}

const NotificationItem: React.FC<NotificationItemProps> = ({id, title, message, timestamp, type, viewed }) => {
    return (
        <View style={[styles.container, viewed ? styles.viewed : styles.notViewed]} key={id}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
            <Text style={styles.date}>{timestamp.toLocaleString()}</Text>
            <Text style={styles.type}>{type}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    viewed: {
        opacity: 0.5,
    },
    notViewed: {
        opacity: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    message: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    date: {
        fontSize: 12,
        color: '#999',
    },
    type: {
        fontSize: 12,
        color: '#999',
    },
});

export default NotificationItem;