const parseInitials = (user) => {
    return user.firstname.slice(0, 1) + user.lastname.slice(0, 1);
};

export default parseInitials;
