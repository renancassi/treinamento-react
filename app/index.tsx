import { Button, Text, TextInput, View } from "react-native";
import { Form, Formik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

export default function Index() {

  const Schema = z.object({
    email: z.string().email({message: "Você precisa fornecer um e-mail valido"}),
    senha: z.string(),
  });

  return (


    <Formik validationSchema={toFormikValidationSchema(Schema)} initialValues={{ email: '', senha: '' }}
      onSubmit={values => console.log(values)}>

      {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
        console.log(errors)

        const bloqueado = !!errors.email || !!errors.senha;
        

        return (

          <View style={{ padding: 20 }}>
            <Text className="text-2xl my-4">
              Login:
            </Text>

            <TextInput onChangeText={handleChange('email')}
              onBlur={handleBlur('email')} placeholder="E-mail" className="text-3xl my-4 border-2 p-1" />

            <TextInput onChangeText={handleChange('senha')}
              onBlur={handleBlur('senha')} secureTextEntry={true} placeholder="Senha" className="text-3xl my-4 border-2 p-1" />

            <Button
              title="Login" onPress={() => handleSubmit()} disabled={bloqueado} />

          </View>
        )
      }}
    </Formik>
  );
}
