import { ActivityIndicator, Text, TextInput, View } from 'react-native';

import { useQuery } from '@tanstack/react-query';
import { useGetPost } from '@/queries/useGetPost';

export default function Posts() {
  const { data } = useGetPost();
  console.log(data);
  return <View className="p-10 flex justify-center w-full h-full"></View>;
}
