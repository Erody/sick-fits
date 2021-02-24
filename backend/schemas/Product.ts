import { integer, select, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Product = list({
    // access:
    fields: {
        name: text({ isRequired: true }),
        description: text({
            ui: {
                displayMode: 'textarea',
            },
        }),
        status: select({
            options: [
                { label: 'Draft', value: 'DRAFT' },
                { label: 'available', value: 'AVAILABLE' },
                { label: 'unavailable', value: 'UNAVAILABLE' },
            ],
            defaultValue: 'DRAFT',
            ui: {
                displayMode: 'segmented-control',
            },
        }),
        price: integer(),
        // TODO: photo
    },
});
