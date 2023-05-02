export type SetTimeout = ReturnType<typeof setTimeout>;

export type UnknownObject = { [key: string]: string | number | null | undefined | unknown[] | Date | UnknownObject };

export type WithPrefix<T extends string> = `${T}${string}`;
