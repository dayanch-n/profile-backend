export const validReq = (name, email, password, gender, dob, photo) => {
    if (!name) return false;
    if (!email) return false;
    if (!password) return false;
    if (!gender) return false;
    if (!dob) return false;
    if (!photo) return false;
    return true;
};