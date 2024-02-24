import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { themeActions } from '@/store/reducres/ThemeSlice';

const actions = {
    ...themeActions,
};

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch);
};
