import { useState } from 'react';

export default function useForm(initial = {}) {
    // create a state object for our inputs
    const [inputs, setInputs] = useState(initial);

    function handleChange(e) {
        let { value, name, type } = e.target;
        // html forms always return strings, so we need to turn any number inputs back into numbers
        if (type === 'number') {
            value = parseInt(value);
        }
        if (type === 'file') {
            [value] = e.target.files;
        }
        setInputs({
            // copy the existing state
            ...inputs,
            [name]: value,
        });
    }

    function resetForm() {
        setInputs(initial);
    }

    function clearForm() {
        const blankState = Object.fromEntries(
            Object.entries(inputs).map(([key, value]) => [key, ''])
        );
        setInputs(blankState);
    }

    return {
        inputs,
        handleChange,
        resetForm,
        clearForm,
    };
}
