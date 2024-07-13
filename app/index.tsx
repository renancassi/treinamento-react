import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Formik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useMutation } from '@tanstack/react-query';
import { apiAutenticacao } from '@/services/apiAutenticacao';
import { router } from 'expo-router';

const Schema = z.object({
  email: z
    .string()
    .email({ message: 'Você precisa fornecer um e-mail valido' }),
  senha: z.string(),
});

export default function Index() {
  const login = ({ email, senha }: z.infer<typeof Schema>) => {
    return apiAutenticacao
      .post('/accounts:signInWithPassword', {
        email,
        password: senha,
        returnSecureToken: true,
      })
      .then(({ data }) => data);
  };

  const { mutate, data, isPending, isError, isSuccess, isIdle } = useMutation({
    mutationFn: login,
    mutationKey: ['login'],
    onSuccess: () => {
      router.push('/posts');
    },
  });

  console.log(data);

  return (
    <Formik
      validationSchema={toFormikValidationSchema(Schema)}
      initialValues={{ email: '', senha: '' }}
      onSubmit={mutate}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
        console.log(errors);

        const bloqueado = !!errors.email || !!errors.senha;

        return (
          <View className="p-10 flex justify-center w-full h-full">
            <View className="p-9 rounded-lg">
              <Text className="text-4xl text-center">Login</Text>

              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder="E-mail"
                className="mt-3 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              />

              <TextInput
                onChangeText={handleChange('senha')}
                onBlur={handleBlur('senha')}
                placeholder="Senha"
                secureTextEntry={true}
                className="mt-3 mb-3 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              />

              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => handleSubmit()}
                disabled={bloqueado}
              >
                <View className="bg-blue-600 p-2 rounded-lg">
                  {isPending ? (
                    <ActivityIndicator />
                  ) : (
                    <Text className="text-white text-center">Entrar</Text>
                  )}
                </View>
              </TouchableOpacity>
              {isIdle && (
                <Text className="text-center mt-2">Insira login e senha</Text>
              )}
              {isError && (
                <Text className="text-center mt-2 text-red-700">
                  Erro ao fazer login.
                </Text>
              )}
              {isSuccess && (
                <Text className="text-center mt-2 text-green-700">
                  Sucesso!
                </Text>
              )}
            </View>
          </View>
        );
      }}
    </Formik>
  );
}
