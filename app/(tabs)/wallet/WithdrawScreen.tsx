import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const WithdrawScreen: React.FC = () => {
    const [amount, setAmount] = useState<string>('');

    const handleWithdraw = () => {
        if (parseFloat(amount) > 0) {
            Alert.alert('Success', `You have withdrawn $${amount}`);
            setAmount('');
        } else {
            Alert.alert('Error', 'Please enter a valid amount');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Withdraw Funds</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />
            <Button title="Withdraw" onPress={handleWithdraw} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
});

export default WithdrawScreen;