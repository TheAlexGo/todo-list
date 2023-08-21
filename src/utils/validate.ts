export const validateEmail = (email: string): boolean => {
    const regexp =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(String(email).toLowerCase());
};

export const validatePassword = (password: string): boolean => password.length >= 8;

export const validateName = (name: string): boolean => {
    const regexp = /^[\p{L}'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/u;
    return regexp.test(String(name).toLowerCase());
};
