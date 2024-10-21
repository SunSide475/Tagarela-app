import React, { useState } from 'react';
import { View, Button, Text, Image, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const schema = z.object({
    name: z.string().nonempty('Nome é obrigatório'),
    category: z.string().nonempty('Categoria é obrigatória'),
    subcategory: z.string().nonempty('Subcategoria é obrigatória'),
});

const TestCard = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);

    const uploadData = async (data) => {
        if (!image || !video) {
            alert('Por favor, selecione uma imagem e um vídeo.');
            return;
        }

        const formData = new FormData();
        formData.append('image', {
            uri: image,
            type: 'image/jpeg',
            name: 'photo.jpg',
        });
        formData.append('video', {
            uri: video,
            type: 'video/mp4',
            name: 'video.mp4',
        });
        formData.append('name', data.name);
        formData.append('category', data.category);
        formData.append('subcategory', data.subcategory);

        try {
            const response = await axios.post('https://sua-api-url.com/endpoint', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            alert('Dados enviados com sucesso!');
        } catch (error) {
            console.error(error);
            alert('Erro ao enviar os dados.');
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const pickVideo = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setVideo(result.assets[0].uri);
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Nome"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={{ borderBottomWidth: 1, marginBottom: 10 }}
                    />
                )}
            />
            {errors.name && <Text style={{ color: 'red' }}>{errors.name.message}</Text>}

            <Controller
                control={control}
                name="category"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Categoria"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={{ borderBottomWidth: 1, marginBottom: 10 }}
                    />
                )}
            />
            {errors.category && <Text style={{ color: 'red' }}>{errors.category.message}</Text>}

            <Controller
                control={control}
                name="subcategory"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Subcategoria"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={{ borderBottomWidth: 1, marginBottom: 10 }}
                    />
                )}
            />
            {errors.subcategory && <Text style={{ color: 'red' }}>{errors.subcategory.message}</Text>}

            <Button title="Selecionar Imagem" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
            <Button title="Selecionar Vídeo" onPress={pickVideo} />
            {video && <Text>Vídeo selecionado: {video}</Text>}
            <Button title="Enviar" onPress={handleSubmit(uploadData)} />
        </View>
    );
};

export default TestCard;
