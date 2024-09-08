import useAuth from 'hooks/useAuth';

const useIsAdmin = () => {
    const { role_name } = useAuth();
    console.log('Role Name:', role_name); // Debug: Check the value of role_name
    return role_name === 'admin';
};

export default useIsAdmin;
