import React, { PropsWithChildren } from 'react';
interface BaseProps {
    className: string;
    [key: string]: unknown;
}
type ButtonProps = PropsWithChildren<{
    active: boolean;
    reversed: boolean;
}> & BaseProps;
export declare const Button: React.ForwardRefExoticComponent<Omit<ButtonProps, "ref"> & React.RefAttributes<unknown>>;
export declare const Icon: React.ForwardRefExoticComponent<Omit<React.PropsWithChildren<BaseProps>, "ref"> & React.RefAttributes<unknown>>;
export declare const Menu: React.ForwardRefExoticComponent<Omit<React.PropsWithChildren<BaseProps>, "ref"> & React.RefAttributes<unknown>>;
export declare const Portal: ({ children }: any) => React.ReactPortal | null;
export {};
