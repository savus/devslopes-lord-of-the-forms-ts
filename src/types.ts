export type UserInformation = {
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    phone: string;
}

export type OnChangeInputType = (input: string) => undefined; 