import {
    integer,
    relationship,
    select,
    text,
    virtual,
} from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Order = list({
    fields: {
        total: integer(),
        items: relationship({ ref: 'OrderItem.order', many: true }),
        user: relationship({ ref: 'User.orders' }),
        charge: text(),
    },
});
