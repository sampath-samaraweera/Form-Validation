import React from "react";
import { StyleSheet, Button, TextInput, View, Text } from "react-native";
import { globalStyles } from "../styles/global.js";
import { Formik } from 'formik';
import * as yup from 'yup';

const reviewSchema = yup.object({
    title: yup.string()
        .required()
        .min(4),
    body: yup.string()
        .required()
        .min(8),
    rating: yup.string()
        .required()
        .test('is-num-1-5', 'Rating must be a number 1 - 5', (val) => {
            return parseInt(val) < 6 && parseInt(val) > 0;
        })
})

export default function ReviewForm(){

    return(
        <View style={globalStyles.container}>
            <Formik
                initialValues={{ title:'', body: '', rating: ''}}
                validationSchema={reviewSchema}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    console.log(values);
                }} 
            >
                {(props) => (
                    <View>
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Review Title"
                            onChangeText={props.handleChange('title')}
                            value={props.values.title}
                            onBlur={props.handleBlur('title')}
                        />
                        <Text style={globalStyles.errorText}>{ props.touched.title && props.errors.title}</Text>

                        <TextInput
                            multiline
                            style={globalStyles.input}
                            placeholder="Review Body"
                            onChangeText={props.handleChange('body')}
                            value={props.values.body}
                            onBlur={props.handleBlur('body')}
                        />
                        <Text style={globalStyles.errorText}>{ props.touched.body && props.errors.body}</Text>

                        <TextInput
                            style={globalStyles.input}
                            placeholder="Review rating"
                            onChangeText={props.handleChange('rating')}
                            value={props.values.rating}
                            keyboardType="numeric"
                            onBlur={props.handleBlur('rating')}
                        />
                        <Text style={globalStyles.errorText}>{ props.touched.rating && props.errors.rating}</Text>

                        <Button title="submit" color='maroon' onPress={props.handleSubmit}/>
                    </View>
                )}

            </Formik>
        </View>
    )
}
