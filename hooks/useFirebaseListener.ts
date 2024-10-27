import { realtimeDB } from '@/firebaseConfig';
import { off, onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

const useDatabaseListener = (path: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataRef = ref(realtimeDB, path);

    // Lắng nghe sự thay đổi thời gian thực với sự kiện `value`
    const handleDataChange = (snapshot: any) => {
      setData(snapshot.val());
      setLoading(false);
    };

    // Đăng ký lắng nghe với `onValue`
    onValue(dataRef, handleDataChange);

    // Hủy đăng ký lắng nghe khi component unmount
    return () => {
      off(dataRef, 'value', handleDataChange);
    };
  }, [path]);

  return { data, loading };
};

export default useDatabaseListener;
