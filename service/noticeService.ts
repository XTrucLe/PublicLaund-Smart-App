export type Notification = {
    id: number;
    title: string; // Added title field
    message: string;
    timestamp: Date;
    type: 'usage' | 'warning';
    viewed: 0 | 1; // 0 for not viewed, 1 for viewed
}

export const notificationsData: Notification[] = [
    {
        id: 1,
        title: 'Machine Available', // Added title field
        message: 'Your laundry machine is now available for use.',
        timestamp: new Date(),
        type: 'usage',
        viewed: 0
    },
    {
        id: 2,
        title: 'Pickup Reminder', // Added title field
        message: 'Reminder: Please pick up your clothes within the next 30 minutes.',
        timestamp: new Date(),
        type: 'warning',
        viewed: 0
    },
    {
        id: 3,
        title: 'Cycle Complete', // Added title field
        message: 'Your laundry cycle is complete. Please collect your clothes.',
        timestamp: new Date(),
        type: 'usage',
        viewed: 0
    },
    {
        id: 4,
        title: 'Clothes Left', // Added title field
        message: 'Warning: Your clothes have been in the machine for over an hour.',
        timestamp: new Date(),
        type: 'warning',
        viewed: 0
    },
    {
        id: 5,
        title: 'Maintenance Alert',
        message: 'Scheduled maintenance will occur tomorrow from 2 AM to 4 AM.',
        timestamp: new Date(),
        type: 'warning',
        viewed: 0
    },
    {
        id: 6,
        title: 'New Feature',
        message: 'Check out the new feature in our app: Real-time machine availability.',
        timestamp: new Date(),
        type: 'usage',
        viewed: 0
    }
];

const getNotifications = async (): Promise<Notification[]> => {
    return notificationsData;
}

export default getNotifications;