export const EXCLUDE_PATH = [
    '/api/login',
    '/api/auth/refresh-token',
];
export const ADDRESS_FLAG = {
    TO: 1
};

export const CONDITION_VALUE = {
    MATCH: 'match',
    INCLUDE: 'include',
};

export const ACTIVITY_SUB_STATUS = {
    DONE: [9000, 9100],
};

export const ACTIVITY_MODE = {
    INBOUND: 100,
    OUTBOUND: 200,
};

export const TYPE_SYSTEM = {
    OLD: 'old',
    NEW: 'new',
};

export const COMMENT = {
    ACCOUNT_TYPE: "Account type: SSO hoặc Local",
    ROLE: "Role: User hoặc Admin hoặc User. All nếu tài khoản có cả 2 quyền",
    PASSWORD: "Password bắt buộc với loại tài khoản Local, không nhập với loại tài khoản SSO.\nĐịnh dạng password: chứa ít nhất 8 ký tự gồm chữ, số và ký tự đặc biệt."
};
