import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';

export function isSignedIn({ session }: ListAccessArgs) {
    return !!session;
}

const generatedPermissions = Object.fromEntries(
    permissionsList.map((permission) => [
        permission,
        function ({ session }: ListAccessArgs) {
            return !!session?.data.role?.[permission];
        },
    ])
);

export const permissions = {
    ...generatedPermissions,
};

export const rules = {
    canManageProducts({ session }: ListAccessArgs) {
        if (!isSignedIn({ session })) {
            return false;
        }
        // do they have the permission of canManageProducts
        if (permissions.canManageProducts({ session })) {
            return true;
        }
        // do they own the product
        return { user: { id: session.itemId } };
    },
    canOrder({ session }: ListAccessArgs) {
        if (!isSignedIn({ session })) {
            return false;
        }
        // do they have the permission of canManageProducts
        if (permissions.canManageCart({ session })) {
            return true;
        }
        // do they own the product
        return { user: { id: session.itemId } };
    },
    canManageOrderItems({ session }: ListAccessArgs) {
        if (!isSignedIn({ session })) {
            return false;
        }
        // do they have the permission of canManageProducts
        if (permissions.canManageCart({ session })) {
            return true;
        }
        // do they own the product
        return { order: { user: { id: session.itemId } } };
    },
    canReadProducts({ session }: ListAccessArgs) {
        if (!isSignedIn({ session })) {
            return false;
        }
        if (permissions.canManageProducts({ session })) {
            return true;
        }
        // they should only see products with the status available
        return { status: 'AVAILABLE' };
    },
    canManageUsers({ session }: ListAccessArgs) {
        if (!isSignedIn({ session })) {
            return false;
        }
        // do they have the permission of canManageProducts
        if (permissions.canManageUsers({ session })) {
            return true;
        }
        // do they own the product
        return { id: session.itemId };
    },
};
